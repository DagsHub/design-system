import React, {useEffect, useRef, useState} from "react";
import useImage from "use-image";
import {Image, Layer, Line, Stage, Text} from "react-konva";

interface Point {
  0: number;
  1: number;
}

interface PolygonLabel {
  points: Point[];
  polygonlabels: string[];
}

interface Result {
  id: string;
  from_name: string;
  to_name: string;
  source: string;
  type: string;
  value: PolygonLabel;
}

interface Annotation {
  result: Result[];
}

interface Annotations {
  [fieldName: string]: Annotation[];
}

interface TaskData {
  image: string;
}

export interface Task {
  annotations: Annotation[];
  data: TaskData;
  id: number;
  task_path: string;
}

type RGB = [number, number, number];

export interface LabelStudioPolygonDrawerProps {
  annotations: Annotations;
  width?: number;
  height?: number;
  colorProvider: (label: string, column?: string) => RGB;
}


export const LabelStudioPolygonDrawer: React.FC<LabelStudioPolygonDrawerProps> = ({
  annotations,
  width,
  height,
  colorProvider,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

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
      <Stage width={stageWidth} height={stageHeight} style={{position: 'absolute', top: 0, left: 0 }}>
        <Layer>
          {Object.entries(annotations).map(([column, annotation], aIndex) =>
            annotation.result.map((result, rIndex) => {
              const points = transformPoints(
                result.value.points,
                width || 0,
                height || 0,
              );
              const flatPoints = points.flatMap((p) => [p[0], p[1]]);
              const bboxPoints = getPolygonBbox(points);
              const flatBboxPoints = bboxPoints.flatMap((p) => [p[0], p[1]]);

              const label = result.value.polygonlabels[0];
              const center = getPolygonCenter(result.value.points.map(pointTransformer(image?.width || 0, image?.height || 0)));
              const fontSize = 14;
              const [R,G,B] = colorProvider(label);
              const strokeColor = `rgb(${R},${G},${B})`;
              const fillColor = `rgba(${R},${G},${B},0.5)`;

              return (
                <React.Fragment key={`${aIndex}-${rIndex}`}>
                  {/* Draw polygon */}
                  <Line
                    key={`${aIndex}-${rIndex}`}
                    points={flatPoints}
                    closed
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={fillColor}
                  />
                  {/* Draw Bbox */}
                  <Line
                    key={`${aIndex}-${rIndex}-bbox`}
                    points={flatBboxPoints}
                    closed
                    stroke={strokeColor}
                    strokeWidth={2}
                  />
                  <Text
                    x={bboxPoints[0][0]}
                    y={bboxPoints[0][1] - fontSize}
                    text={label}
                    fontSize={14}
                    fill='white'
                    fontStyle='bold'
                    align='center'
                  />
                </React.Fragment>
              );
            })
          )}
        </Layer>
      </Stage>
    </div>
  );
};
