import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {Circle, Layer, Line, Stage, Text} from "react-konva";
import {useContainerDimensions} from "./utils";
import {
  getLabel,
  getPolygonLabelBbox, isKeyPointLabel,
  isPolygonLabel, isRectangleLabel,
  pointPercentToPixel,
  rectangleLabelToBbox
} from "./labelstudioUtils";
import {
  AnnotationsMap, Result,
  RGB,
} from "./annotationTypes";

export interface LabelStudioPolygonDrawerProps {
  src: string;
  annotationsMap: AnnotationsMap;
  colorProvider: (label: string, column?: string) => RGB;
  displayColumns: string[];
  displayLabels?: string[];
  style?: React.CSSProperties;
}

export const LabelStudioPolygonDrawer: React.FC<LabelStudioPolygonDrawerProps> = ({
    src,
    annotationsMap,
    colorProvider,
    displayColumns = [],
    displayLabels = ["all"],
  }) => {
    const ref = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, height] = useContainerDimensions(ref);
    const [containerWidth, containerHeight] = useContainerDimensions(containerRef);
    const dimension = {width, height};

    const containerStyle: CSSProperties = {
      position: "relative",
      width: "100%",
      height: "100%",
    };
    const imgStyle: CSSProperties = {
      margin: "auto",
      objectFit: "contain",
      width: "100%",
      height: "100%",
      display: "block"
    }
    const left = containerWidth ? (containerWidth - width) / 2 : 0;
    const top = containerHeight ? (containerHeight - height) / 2 : 0;
    const style: CSSProperties = {
      position: "absolute",
      left,
      top,
      width,
      height,
    };

    return (
      <div ref={containerRef} style={containerStyle}>
        <img ref={ref} style={imgStyle} alt={"image from dataset"} src={src}/>
        <Stage width={width} height={height} style={style}>
          <Layer>
            {Object.entries(annotationsMap).map(([column, annotations]) => {
              if (!displayColumns.includes(column)) {
                return null;
              }
              return annotations.map((annotation, aIndex) =>
                annotation.result.map((result, rIndex) => {
                  return (
                    <SingleLabelAnnotation
                      key={`${column}-${aIndex}-${rIndex}`}
                      column={column}
                      result={result}
                      aIndex={aIndex}
                      rIndex={rIndex}
                      dimension={dimension}
                      colorProvider={colorProvider}
                      displayLabels={displayLabels}
                    />
                  );
                })
              );
            })
            }
          </Layer>
        </Stage>
      </div>
    );
  }
;

function SingleLabelAnnotation({
  column,
  result,
  aIndex,
  rIndex,
  dimension,
  colorProvider,
  displayLabels = ["all"],
}: {
  column: string;
  result: Result;
  aIndex: number;
  rIndex: number;
  dimension: { width: number; height: number };
  colorProvider: (label: string, column?: string) => RGB;
  displayLabels: string[];
}) {
  let flatPoints: number[] = [];
  let flatBboxPoints: number[] = [];
  const labelComponents: React.ReactNode[] = [];
  const label = getLabel(result);
  if (!displayLabels.includes("all") && !displayLabels.includes(label)) {
    return null;
  }
  const fontSize = 14;
  const [R, G, B] = colorProvider(label, column);
  const strokeColor = `rgb(${R},${G},${B})`;
  const fillColor = `rgba(${R},${G},${B},0.5)`;

  if (isPolygonLabel(result)) {
    flatPoints = result.value.points.flatMap((p) => pointPercentToPixel(p, dimension));
    flatBboxPoints = getPolygonLabelBbox(result, dimension);
    labelComponents.push(
      <Line
        key={`${column}-${aIndex}-${rIndex}`}
        points={flatPoints}
        closed
        stroke={strokeColor}
        strokeWidth={2}
        fill={fillColor}
      />
    );
  } else if (isRectangleLabel(result)) {
    flatBboxPoints = rectangleLabelToBbox(result, dimension);
  } else if (isKeyPointLabel(result)) {
    const { x: xPercent, y: yPercent } = result.value;
    const [x, y] = pointPercentToPixel([xPercent, yPercent], dimension);
    labelComponents.push(
      <Circle x={x} y={y} radius={3} fill={strokeColor} />
    );
  }
  if (flatBboxPoints.length > 0) {
    const textPosition = {x: flatBboxPoints[0], y: flatBboxPoints[1] - fontSize};
    labelComponents.push(
      <Line
        key={`${column}-${aIndex}-${rIndex}-bbox`}
        points={flatBboxPoints}
        closed
        stroke={strokeColor}
        strokeWidth={2}
      />,
      <Text
        x={textPosition.x}
        y={textPosition.y}
        text={label}
        fontSize={14}
        fill='white'
        fontStyle='bold'
        align='center'
      />
    );
  }
  return (
    <React.Fragment key={`${aIndex}-${rIndex}`}>
      {labelComponents}
    </React.Fragment>
  );
}
