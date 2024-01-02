import React, {useEffect, useRef, useState} from "react";
import {Layer, Line, Stage, Text} from "react-konva";

type Point = [number, number];

type PolygonLabel = {
  points: Point[];
  polygonlabels: string[];
} & Record<string, any>;

type RectangleLabel = {
  x: number;
  y: number;
  width: number;
  height: number;
  rectanglelabels: string[];
} & Record<string, any>;

type Result = PolygonResult | RectangleResult;

type ResultCommon = {
  id: string;
  type: string;
} & Record<string, any>;

type PolygonResult = ResultCommon & {
  value: PolygonLabel;
}

type RectangleResult = ResultCommon & {
  value: RectangleLabel;
}

type Annotation = {
  result: Result[];
} & Record<string, any>;

type AnnotationsMap = {
  [fieldName: string]: Annotation[];
}

type TaskData = {
  image: string;
}

export type Task = {
  annotations: Annotation[];
  data: TaskData;
} & Record<string, any>;

type RGB = [number, number, number];

export interface LabelStudioPolygonDrawerProps {
  annotationsMap: AnnotationsMap;
  width: number;
  height: number;
  colorProvider: (label: string, column?: string) => RGB;
}

function isPolygonLabel(result: Result): result is PolygonResult {
  return (result as PolygonResult).type === 'polygonlabels';
}

function isRectangleLabel(result: Result): result is RectangleResult {
  return (result as RectangleResult).type === 'rectanglelabels';
}

export const LabelStudioPolygonDrawer: React.FC<LabelStudioPolygonDrawerProps> = ({
  annotationsMap,
  width,
  height,
  colorProvider,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({width: 0, height: 0});
  // const [width, height] = useContainerDimensions(containerRef);

  const transformPoints = (points: Point[], imageWidth: number, imageHeight: number): Point[] => {
    return points.map(pointTransformer(imageWidth, imageHeight));
  };

  const pointTransformer = (imageWidth: number, imageHeight: number) => (point: Point): Point => {
    return [
      point[0] * imageWidth / 100,
      point[1] * imageHeight / 100
    ];
  }

  const stageWidth = width || containerSize.width;
  const stageHeight = height || containerSize.height;

  const getPolygonCenter = (points: Point[]) => {
    const x = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    const y = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    return {x, y};
  };

  const getPolygonBbox = (points: Point[]): Point[] => {
    const minX = points.reduce((min, p) => Math.min(min, p[0]), points[0][0]);
    const minY = points.reduce((min, p) => Math.min(min, p[1]), points[0][1]);
    const maxX = points.reduce((max, p) => Math.max(max, p[0]), points[0][0]);
    const maxY = points.reduce((max, p) => Math.max(max, p[1]), points[0][1]);
    return [
      [minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
    ]
  }

  return (
    <div ref={containerRef} style={{width: '100%', height: '100%'}}>
      <Stage width={stageWidth} height={stageHeight} style={{position: 'absolute', top: 0, left: 0}}>
        <Layer>
          {Object.entries(annotationsMap).map(([column, annotations]) =>
            annotations.map((annotation, aIndex) =>
              annotation.result.map((result, rIndex) => {
                let flatPoints: number[] | null = null;
                let flatBboxPoints: number[] = [];
                let label: string = "";
                if (isPolygonLabel(result)) {
                  const points = transformPoints(
                    result.value.points,
                    width || 0,
                    height || 0,
                  );
                  flatPoints = points.flatMap((p) => [p[0], p[1]]);
                  const bboxPoints = getPolygonBbox(points);
                  flatBboxPoints = bboxPoints.flatMap((p) => [p[0], p[1]]);
                  label = result.value.polygonlabels[0];
                } else if (isRectangleLabel(result)) {
                  const bboxPoints = transformPoints(
                    [
                      [result.value.x, result.value.y],
                      [result.value.x + result.value.width, result.value.y],
                      [result.value.x + result.value.width, result.value.y + result.value.height],
                      [result.value.x, result.value.y + result.value.height],
                    ],
                    width || 0,
                    height || 0,
                  );
                  flatBboxPoints = bboxPoints.flatMap((p) => [p[0], p[1]]);
                  label = result.value.rectanglelabels[0];
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
            ))}
        </Layer>
      </Stage>
    </div>
  );
};

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId = 0;
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export function useContainerDimensions(myRef: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0
    })

    const handleResize = () => {
      debounce(() => {
        setDimensions(getDimensions())
      }, 200)();
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return [dimensions.width, dimensions.height];
}
