import { KeyPointResult, Point, PolygonResult, RectangleResult, Result } from './annotationTypes';

type Dimension = { width: number; height: number };

export const pointPercentToPixel = (point: Point, dimension: Dimension): Point => [
  (point[0] * dimension.width) / 100,
  (point[1] * dimension.height) / 100
];

export function rectangleLabelToBbox(label: RectangleResult, dimension: Dimension): number[] {
  const { x, y, width, height } = label.value;
  const points: Point[] = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height]
  ];
  return points.flatMap((p) => pointPercentToPixel(p, dimension));
}

export function getPolygonLabelBbox(label: PolygonResult, dimension: Dimension): number[] {
  const points = label.value.points;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const bbox: Point[] = [
    [minX, minY],
    [minX, maxY],
    [maxX, maxY],
    [maxX, minY]
  ];
  return bbox.flatMap((p) => pointPercentToPixel(p, dimension));
}

export function isPolygonLabel(result: Result): result is PolygonResult {
  return (result as PolygonResult).type === 'polygonlabels';
}

export function isRectangleLabel(result: Result): result is RectangleResult {
  return (result as RectangleResult).type === 'rectanglelabels';
}

export function isKeyPointLabel(result: Result): result is KeyPointResult {
  return (result as KeyPointResult).type === 'keypointlabels';
}

export function isEllipseLabel(result: Result): result is KeyPointResult {
  return (result as KeyPointResult).type === 'ellipselabels';
}

export function getLabel(label: Result): string {
  if (isPolygonLabel(label)) {
    return label.value.polygonlabels[0];
  } else if (isRectangleLabel(label)) {
    return label.value.rectanglelabels[0];
  } else if (isKeyPointLabel(label)) {
    return label.value.keypointlabels[0];
  } else if (isEllipseLabel(label)) {
    return label.value.ellipselabels[0];
  }
  return '';
}
