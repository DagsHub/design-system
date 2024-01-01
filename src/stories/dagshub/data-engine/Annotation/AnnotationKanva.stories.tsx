import React from 'react';
import {Meta, StoryFn} from "@storybook/react";
import {LabelStudioPolygonDrawer, LabelStudioPolygonDrawerProps, Task} from "./LabelStudioPolygonDrawer";
import {Image} from "react-konva";

const taskData: Task = {
  "annotations": [
    {
      "result": [
        {
          "id": "XSMXwwsaTa",
          "from_name": "tag",
          "to_name": "img",
          "source": "$image",
          "type": "polygonlabels",
          "value": {
            "points": [
              [
                27.2,
                41.24629080118694
              ],
              [
                25.73333333333333,
                70.62314540059347
              ],
              [
                48.13333333333333,
                62.61127596439169
              ],
              [
                48.13333333333333,
                32.93768545994065
              ]
            ],
            "polygonlabels": [
              "Hello"
            ]
          }
        }
      ]
    }
  ],
  "data": {
    "image": "https://user.fm/files/v2-901310d5cb3fa90e0616ca10590bacb3/spacexmoon-800x501.jpg"
  },
  "id": 0,
  "task_path": "../examples/image_polygons/tasks.json"
}

const meta: Meta<typeof LabelStudioPolygonDrawer> = {
  title: 'DagsHub/Data-Engine/Annotation',
  component: LabelStudioPolygonDrawer
};

export default meta;

const ImagePolygon: React.FC<{image: string} & LabelStudioPolygonDrawerProps> = (args) => {
  return (
    <div style={{position: 'relative'}}>
      <img alt={"image from dataset"} src={args.image}/>
      <LabelStudioPolygonDrawer {...args} />
    </div>
  );
}

const Template: StoryFn<typeof ImagePolygon> = (args) => (
    <ImagePolygon {...args} />
);

export const annotationBbox: StoryFn<typeof ImagePolygon> = Template.bind({});
annotationBbox.args = {
  image: taskData.data.image,
  annotations: {"annotations": taskData.annotations},
  width: 800,
  height: 500,
  colorProvider: (label: string, column?: string) => {
    return [122, 255, 0];
  }
};
