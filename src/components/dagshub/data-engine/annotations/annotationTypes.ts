import React from 'react';

export type Point = [number, number];

export type PolygonLabel = {
  points: Point[];
  polygonlabels: string[];
} & Record<string, any>;

export type RectangleLabel = {
  x: number;
  y: number;
  width: number;
  height: number;
  rectanglelabels: string[];
} & Record<string, any>;

export type KeyPointLabel = {
  x: number;
  y: number;
  width: number;
  keypointlabels: string[];
} & Record<string, any>;

export type EllipseLabel = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  ellipselabels: string[];
}

export type Result = PolygonResult | RectangleResult | KeyPointResult | EllipseResult;

export type ResultCommon = {
  id: string;
  type: string;
} & Record<string, any>;

export type PolygonResult = ResultCommon & {
  value: PolygonLabel;
};

export type RectangleResult = ResultCommon & {
  value: RectangleLabel;
};

export type KeyPointResult = ResultCommon & {
  value: KeyPointLabel;
};

export type EllipseResult = ResultCommon & {
  value: EllipseLabel;
}

export type Annotation = {
  result: Result[];
} & Record<string, any>;

export type AnnotationsMap = {
  [fieldName: string]: Annotation[];
};

export type TaskData = {
  image: string;
  size?: number;
};

export type Task = {
  annotations: Annotation[];
  data: TaskData;
} & Record<string, any>;

export type RGB = [number, number, number];
