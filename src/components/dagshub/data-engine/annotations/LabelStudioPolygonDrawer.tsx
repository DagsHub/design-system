import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Circle, Layer, Line, Stage, Text, Image } from 'react-konva';
import { useContainerDimensions } from './utils';
import {
  getLabel,
  getPolygonLabelBbox,
  isKeyPointLabel,
  isPolygonLabel,
  isRectangleLabel,
  pointPercentToPixel,
  rectangleLabelToBbox
} from './labelstudioUtils';
import { AnnotationsMap, Result, RGB } from './annotationTypes';
import useImage from 'use-image';

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
  displayLabels = ['all']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, containerHeight] = useContainerDimensions(containerRef);
  const [dimension, setDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0
  });
  const [image] = useImage(src);

  useEffect(() => {
    if (containerRef.current && image) {
      // const containerWidth = containerRef.current.clientWidth;
      // const containerHeight = containerRef.current.clientHeight;
      const ratio = image.width / image.height;
      const containerRatio = containerWidth / containerHeight;
      const dominantRatio = ratio > containerRatio ? 'width' : 'height';
      if (dominantRatio === 'width') {
        setDimension({
          width: containerWidth,
          height: containerWidth / ratio
        });
      } else {
        setDimension({
          width: containerHeight * ratio,
          height: containerHeight
        });
      }
    }
  }, [image, containerWidth, containerHeight]);
  const containerStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    height: '100%'
  };
  const imgStyle: CSSProperties = {
    margin: 'auto',
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    display: 'block'
  };

  return (
    <div id="ls-container" ref={containerRef} style={containerStyle}>
      <Stage
        width={dimension.width}
        height={dimension.height}
        style={{
          position: 'relative',
          width: dimension.width,
          height: dimension.height,
          margin: 'auto'
        }}
      >
        <Layer>
          <Image image={image} width={dimension.width} height={dimension.height} />
          {Object.entries(annotationsMap)?.map(([column, annotations]) => {
            debugger;
            if (!displayColumns.includes(column)) {
              return null;
            }
            return annotations?.map((annotation, aIndex) =>
              annotation.result?.map((result, rIndex) => {
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
          })}
        </Layer>
      </Stage>
    </div>
  );
};

function SingleLabelAnnotation({
  column,
  result,
  aIndex,
  rIndex,
  dimension,
  colorProvider,
  displayLabels = ['all']
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
  if (!displayLabels.includes('all') && !displayLabels.includes(label)) {
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
    labelComponents.push(<Circle x={x} y={y} radius={3} fill={strokeColor} />);
  }
  if (flatBboxPoints.length > 0) {
    const textPosition = { x: flatBboxPoints[0], y: flatBboxPoints[1] - fontSize };
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
        fill="white"
        fontStyle="bold"
        align="center"
      />
    );
  }
  return <React.Fragment key={`${aIndex}-${rIndex}`}>{labelComponents}</React.Fragment>;
}
