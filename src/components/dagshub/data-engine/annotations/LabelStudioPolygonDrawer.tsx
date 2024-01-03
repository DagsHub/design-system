import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {Layer, Line, Stage, Text} from "react-konva";
import {useContainerDimensions} from "./utils";
import {
  getLabel,
  getPolygonLabelBbox,
  isPolygonLabel, isRectangleLabel,
  pointPercentToPixel,
  rectangleLabelToPolygon
} from "./labelstudioUtils";
import {
  AnnotationsMap,
  RGB,
} from "./annotationTypes";

export interface LabelStudioPolygonDrawerProps {
  src: string;
  annotationsMap: AnnotationsMap;
  colorProvider: (label: string, column?: string) => RGB;
  displayColumns: string[];
  displayLabels: string[];
  style?: React.CSSProperties;
}

export const LabelStudioPolygonDrawer: React.FC<LabelStudioPolygonDrawerProps> = ({
    src,
    annotationsMap,
    colorProvider,
    displayColumns = [],
    displayLabels = [],
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
      maxWidth: "100%",
      maxHeight: "100%",
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
                  let flatPoints: number[] = [];
                  let flatBboxPoints: number[] = [];
                  const label = getLabel(result);
                  if (!displayLabels.includes(label)) {
                    return null;
                  }
                  if (isPolygonLabel(result)) {
                    flatPoints = result.value.points.flatMap((p) => pointPercentToPixel(p, dimension));
                    flatBboxPoints = getPolygonLabelBbox(result, dimension);
                  } else if (isRectangleLabel(result)) {
                    flatBboxPoints = rectangleLabelToPolygon(result, dimension);
                  }
                  const fontSize = 14;
                  const [R, G, B] = colorProvider(label, column);
                  const strokeColor = `rgb(${R},${G},${B})`;
                  const fillColor = `rgba(${R},${G},${B},0.5)`;
                  const textPosition = [flatBboxPoints[0], flatBboxPoints[1] - fontSize];
                  return (
                    <React.Fragment key={`${aIndex}-${rIndex}`}>
                      {/* Draw polygon */}
                      {flatPoints &&
                        <Line
                          key={`${column}-${aIndex}-${rIndex}`}
                          points={flatPoints}
                          closed
                          stroke={strokeColor}
                          strokeWidth={2}
                          fill={fillColor}
                        />}
                      {/* Draw Bbox */}
                      <Line
                        key={`${column}-${aIndex}-${rIndex}-bbox`}
                        points={flatBboxPoints}
                        closed
                        stroke={strokeColor}
                        strokeWidth={2}
                      />
                      <Text
                        x={textPosition[0]}
                        y={textPosition[1]}
                        text={label}
                        fontSize={14}
                        fill='white'
                        fontStyle='bold'
                        align='center'
                      />
                    </React.Fragment>
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
