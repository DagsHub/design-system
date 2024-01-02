import React from 'react';
import {Meta, StoryFn} from "@storybook/react";
import {
  LabelStudioPolygonDrawer,
  LabelStudioPolygonDrawerProps,
  Task,
  useContainerDimensions
} from "../../../../components";
import { polygonTask } from './PolygonTasks';
import { bboxTask } from './BboxTasks';

const meta: Meta<typeof LabelStudioPolygonDrawer> = {
  title: 'DagsHub/Data-Engine/Annotation',
  component: LabelStudioPolygonDrawer
};

export default meta;

const ImagePolygon: React.FC<{ image: string } & LabelStudioPolygonDrawerProps> = (args) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, height] = useContainerDimensions(ref);
  return (
    <div style={{width: "100%", position: 'relative'}}>
      <img ref={ref} style={{width: "100%"}} alt={"image from dataset"} src={args.image}/>
      <LabelStudioPolygonDrawer {...args} width={width} height={height}/>
    </div>
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
  colorProvider: (label: string, column?: string) => {
    if (column === 'bboxes') {
      return [255, 0, 0];
    }
    return [122, 255, 0];
  }
};
