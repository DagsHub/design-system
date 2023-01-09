import React, {FunctionComponent} from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import GeneralTable , {TableProps} from '../../../components/dagshub/organization/general-table';
import UserInfo from '../../../components/dagshub/organization/user-info';

const meta: Meta<typeof GeneralTable> = {
  title: 'DagsHub/Org/GeneralTable',
  component: GeneralTable
};

export default meta;

const Template: StoryFn<TableProps> = args => <GeneralTable {...args} />;


export interface TableProps{
  headers: Row;
  rows: Row[];
}

export interface Row{
  columns: Column[];
  columnsProps: any[];
}

export interface Column{
  columnElements: (FunctionComponent<any>|string)[];
  elementsProps: any[];
  elementsChildren: any[];
}

export const Primary = Template.bind({});
Primary.args = {
  headers:{
    columns: [
      { columnElements:["div"],
        elementsProps:[{className:"header-style left"}],
        elementsChildren:["username"]
      },
      { columnElements:["div"],
        elementsProps:[{className:"header-style center"}],
        elementsChildren:["teams they belong to"]
      },
      { columnElements:["div"],
        elementsProps:[{className:"header-style right"}],
        elementsChildren:["membership visibility"]
      }
    ],
    columnsProps:[{},{},{}]
  },
  rows:[
    { columns: [
        { columnElements:[UserInfo],
          elementsProps:[{
            imageSource:"../../assets/nir.png",
            fullName:"Kirill Bolashev",
            userName:"@KBolashev"
            }],
          elementsChildren:[{}]
        },
        { columnElements:["span"],
          elementsProps:[{}],
          elementsChildren:["DevOps team (read access), DS team (write access), +6"]
        },
        { columnElements:["span", "img"],
          elementsProps:[{className: "public-private"}, {src:"./assets/cheveron-down-icon.svg"}],
          elementsChildren:["Public"]
        }
      ],
      columnsProps:[{},{className: "teams-list"},{className: "membership-column"}]
    }
  ]
};
