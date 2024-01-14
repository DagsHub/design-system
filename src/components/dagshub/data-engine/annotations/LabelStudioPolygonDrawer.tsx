import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Circle, Layer, Line, Stage, Text, Image, Ellipse } from 'react-konva';
import { useContainerDimensions } from './utils';
import {
  getLabel,
  getPolygonLabelBbox,
  isKeyPointLabel,
  isPolygonLabel,
  isRectangleLabel,
  isEllipseLabel,
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

type dimension = { width: number; height: number };

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

  const labelComponents: React.ReactNode[] = [];
  const textComponents: React.ReactNode[] = [];

  Object.entries(annotationsMap)?.forEach(([column, annotations]) => {
    if (!displayColumns.includes(column)) {
      return null;
    }
    return annotations?.forEach((annotation) =>
      annotation.result?.forEach((result) =>
        getSingleAnnotationResultLayers(
          column,
          result,
          dimension,
          colorProvider,
          displayLabels,
          labelComponents.push.bind(labelComponents),
          textComponents.push.bind(textComponents)
        ))
    );
  });

  // Apply all the text components after the drawings so that the text is on top of the drawings
  const drawingLayers = labelComponents.concat(textComponents);

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
          {drawingLayers}
        </Layer>
      </Stage>
    </div>
  );
};

function getSingleAnnotationResultLayers(
  column: string,
  result: Result,
  dimension: dimension,
  colorProvider: (label: string, column?: string) => RGB,
  displayLabels = ['all'],
  labelLayersPush: (elem: React.ReactNode) => void,
  textLayersPush: (elem: React.ReactNode) => void
) {
  let flatPoints: number[] = [];
  let flatBboxPoints: number[] = [];
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
    labelLayersPush(
      <Line points={flatPoints} closed stroke={strokeColor} strokeWidth={2} fill={fillColor} />
    );
  } else if (isRectangleLabel(result)) {
    flatBboxPoints = rectangleLabelToBbox(result, dimension);
  } else if (isKeyPointLabel(result)) {
    const { x: xPercent, y: yPercent } = result.value;
    const [x, y] = pointPercentToPixel([xPercent, yPercent], dimension);
    labelLayersPush(<Circle x={x} y={y} radius={3} fill={strokeColor} />);
  } else if (isEllipseLabel(result)) {
    const { x: cxPercent, y: cyPercent, radiusX: rxPercent, radiusY: ryPercent } = result.value;
    const [cx, cy] = pointPercentToPixel([cxPercent, cyPercent], dimension);
    const [rx, ry] = pointPercentToPixel([rxPercent, ryPercent], dimension);
    labelLayersPush(
      <Ellipse
        x={cx}
        y={cy}
        radiusX={rx}
        radiusY={ry}
        stroke={strokeColor}
        strokeWidth={2}
        fill={fillColor}
      />
    );
  }
  if (flatBboxPoints.length > 0) {
    labelLayersPush(
      <Line points={flatBboxPoints} closed stroke={strokeColor} strokeWidth={2} />
    );
    const textPosition = { x: flatBboxPoints[0], y: flatBboxPoints[1] - fontSize };
    textLayersPush(
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
}
