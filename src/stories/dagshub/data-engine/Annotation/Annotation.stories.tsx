import React, { CSSProperties } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { LabelStudioPolygonDrawer, LabelStudioPolygonDrawerProps } from '../../../../components';
import { polygonTask, giraffesTask } from './PolygonTasks';
import { bboxTask } from './BboxTasks';
import { keypointsTask } from './KeypointsTasks';
import { ellipseTask } from './EllipseTasks';

const meta: Meta<typeof LabelStudioPolygonDrawer> = {
  title: 'DagsHub/Data-Engine/Annotation',
  component: LabelStudioPolygonDrawer
};

export default meta;

const ImagePolygon: React.FC<{ image: string } & LabelStudioPolygonDrawerProps> = (args) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh'
      }}
    >
      <LabelStudioPolygonDrawer {...args} src={args.image} />
    </div>
  );
};

const Template: StoryFn<typeof ImagePolygon> = (args) => <ImagePolygon {...args} />;

export const annotationPolygon: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationPolygon.args = {
  image: polygonTask.data.image,
  annotationsMap: {
    polygons: polygonTask.annotations
  },
  displayColumns: ['polygons'],
  displayLabels: ['Hello', 'car'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'squirrel') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};

export const annotationBbox: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationBbox.args = {
  image: polygonTask.data.image,
  annotationsMap: {
    bboxes: bboxTask.annotations
  },
  displayColumns: ['polygons', 'bboxes'],
  displayLabels: ['Hello', 'squirrel'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'squirrel') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};

export const annotationCombinedColorByLabel: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationCombinedColorByLabel.args = {
  image: polygonTask.data.image,
  annotationsMap: {
    polygons: polygonTask.annotations,
    bboxes: bboxTask.annotations
  },
  displayColumns: ['polygons', 'bboxes'],
  displayLabels: ['squirrel', 'car', 'Hello'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'squirrel') {
      return [255, 0, 0];
    } else if (label === 'car') {
      return [0, 120, 124];
    } else {
      return [122, 255, 0];
    }
  }
};

export const annotationCombinedColorByColumn: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationCombinedColorByColumn.args = {
  image: polygonTask.data.image,
  annotationsMap: {
    polygons: polygonTask.annotations,
    bboxes: bboxTask.annotations
  },
  displayColumns: ['polygons', 'bboxes'],
  displayLabels: ['squirrel', 'car', 'Hello'],
  colorProvider: (label: string, column?: string) => {
    if (column === 'bboxes') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};

export const annotationKeypoints: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationKeypoints.args = {
  image: keypointsTask.data.image,
  annotationsMap: {
    keypoints: keypointsTask.annotations
  },
  displayColumns: ['keypoints'],
  displayLabels: ['eye_a', 'eye_b', 'nose', 'mouth'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'eye_a') {
      return [255, 0, 0];
    } else if (label === 'eye_b') {
      return [0, 120, 124];
    } else if (label === 'nose') {
      return [0, 0, 255];
    }
    return [122, 255, 0];
  }
};

export const annotationGiraffe: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationGiraffe.args = {
  image: giraffesTask.data.image,
  annotationsMap: {
    polygons: giraffesTask.annotations
  },
  displayColumns: ['polygons'],
  displayLabels: ['giraffe'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'giraffe') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};

export const annotationEllipses: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationEllipses.args = {
  image: ellipseTask.data.image,
  annotationsMap: {
    ellipses: ellipseTask.annotations
  },
  displayColumns: ['ellipses'],
  displayLabels: ['Healthy'],
  colorProvider: (label: string, column?: string) => {
    if (label === 'Healthy') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};
