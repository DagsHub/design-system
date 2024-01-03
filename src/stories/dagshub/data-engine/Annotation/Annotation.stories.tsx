import React, {CSSProperties} from 'react';
import {Meta, StoryFn} from "@storybook/react";
import {GalleryBox} from "../../../../components";
import {
  LabelStudioPolygonDrawer,
  LabelStudioPolygonDrawerProps,
} from "../../../../components";
import {polygonTask} from './PolygonTasks';
import {bboxTask} from './BboxTasks';

const meta: Meta<typeof LabelStudioPolygonDrawer> = {
  title: 'DagsHub/Data-Engine/Annotation',
  component: LabelStudioPolygonDrawer
};

export default meta;

const ImagePolygon: React.FC<{ image: string } & LabelStudioPolygonDrawerProps> = (args) => {
  return (
    // <GalleryBox style={{fontFamily: 'Inter', fontSize: '14px'}}
    //             cell={{width: 500, height: 320}}
    //             fileName={"Luna.jpg"}>
      <LabelStudioPolygonDrawer {...args} src={args.image}/>
    // </GalleryBox>
  );
}

const Template: StoryFn<typeof ImagePolygon> = (args) => (
  <ImagePolygon {...args} />
);

export const annotationPolygon: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationPolygon.args = {
  image: polygonTask.data.image,
  annotationsMap: {
    polygons: polygonTask.annotations,
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
    bboxes: bboxTask.annotations,
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
    bboxes: bboxTask.annotations,
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
    bboxes: bboxTask.annotations,
  },
  displayColumns: ['polygons', 'bboxes'],
  displayLabels: ['squirrel', 'car', 'Hello'],
  colorProvider: (label: string, column?: string) => {
    if (column === 'bboxes') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  },
};
