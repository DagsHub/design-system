import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  BasicTable,
  BasicTableProps
} from '../../../../components/dagshub/data-engine/react-table';

const meta: Meta<BasicTableProps> = {
  title: 'DagsHub/Data-Engine/Tables/BasicTable',
  component: BasicTable
};

export default meta;

const Template: StoryFn<BasicTableProps> = (args) => <BasicTable {...args} />;
const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'First Name',
    accessor: 'first_name'
  },
  {
    Header: 'Last Name',
    accessor: 'last_name'
  },
  {
    Header: 'Date Of Birth',
    accessor: 'date_of_birth'
  },
  {
    Header: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Phone',
    accessor: 'phone'
  }
];

const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Additional Info',
    columns: [
      {
        Header: 'Date Of Birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      }
    ]
  }
];

const MOCK_DATA = [
  {
    id: 1,
    first_name: 'Tabbatha',
    last_name: 'Tapsfield',
    email: 'ttapsfield0@discuz.net',
    date_of_birth: '4/10/1978',
    age: 15,
    country: 'United States',
    phone: '7027426744'
  },
  {
    id: 2,
    first_name: 'Celle',
    last_name: 'Mangeney',
    email: 'cmangeney1@army.mil',
    date_of_birth: '5/26/1996',
    age: 20,
    country: 'East Timor',
    phone: '5842196796'
  },
  {
    id: 3,
    first_name: 'Ernestine',
    last_name: 'Ashbrook',
    email: 'eashbrook2@wunderground.com',
    date_of_birth: '3/17/2021',
    age: 25,
    country: 'Indonesia',
    phone: '1156055612'
  },
  {
    id: 4,
    first_name: 'Nonah',
    last_name: 'Champniss',
    email: 'nchampniss3@economist.com',
    date_of_birth: '8/3/2022',
    age: 32,
    country: 'Japan',
    phone: '7853735987'
  },
  {
    id: 5,
    first_name: 'Windy',
    last_name: 'Bateup',
    email: 'wbateup4@free.fr',
    date_of_birth: '10/17/1995',
    age: 7,
    country: 'Jamaica',
    phone: '2297550779'
  },
  {
    id: 6,
    first_name: 'Portia',
    last_name: 'Schoolcroft',
    email: 'pschoolcroft5@nyu.edu',
    date_of_birth: '10/15/1973',
    age: 6,
    country: 'Indonesia',
    phone: '6162887202'
  },
  {
    id: 7,
    first_name: 'Kailey',
    last_name: 'MacAvaddy',
    email: 'kmacavaddy6@imgur.com',
    date_of_birth: '1/27/2019',
    age: 84,
    country: 'Russia',
    phone: '8397993668'
  },
  {
    id: 8,
    first_name: 'Ezra',
    last_name: 'Calderhead',
    email: 'ecalderhead7@ebay.co.uk',
    date_of_birth: '3/10/2005',
    age: 69,
    country: 'Zimbabwe',
    phone: '3786286124'
  },
  {
    id: 9,
    first_name: 'Leonidas',
    last_name: 'Willgrass',
    email: 'lwillgrass8@dell.com',
    date_of_birth: '2/15/2008',
    age: 28,
    country: 'Indonesia',
    phone: '9948550346'
  },
  {
    id: 10,
    first_name: 'Marys',
    last_name: 'Meconi',
    email: 'mmeconi9@bloglines.com',
    date_of_birth: '3/31/1999',
    age: 80,
    country: 'Sudan',
    phone: '4284400754'
  },
  {
    id: 11,
    first_name: 'Ardelle',
    last_name: 'Kiln',
    email: 'akilna@columbia.edu',
    date_of_birth: '11/26/2006',
    age: 10,
    country: 'Colombia',
    phone: '5949290993'
  },
  {
    id: 12,
    first_name: 'Barbie',
    last_name: 'Townes',
    email: 'btownesb@fc2.com',
    date_of_birth: '8/21/1970',
    age: 49,
    country: 'China',
    phone: '9536509341'
  },
  {
    id: 13,
    first_name: 'Riley',
    last_name: 'Scraggs',
    email: 'rscraggsc@cdbaby.com',
    date_of_birth: '5/9/2014',
    age: 85,
    country: 'Poland',
    phone: '9574843146'
  },
  {
    id: 14,
    first_name: 'Rikki',
    last_name: 'Burnsyde',
    email: 'rburnsyded@aboutads.info',
    date_of_birth: '8/8/2016',
    age: 54,
    country: 'Russia',
    phone: '1629697080'
  },
  {
    id: 15,
    first_name: 'Aguistin',
    last_name: 'Kunzler',
    email: 'akunzlere@devhub.com',
    date_of_birth: '10/18/1999',
    age: 20,
    country: 'Indonesia',
    phone: '9921976800'
  },
  {
    id: 16,
    first_name: 'Joletta',
    last_name: 'Caulcutt',
    email: 'jcaulcuttf@usatoday.com',
    date_of_birth: '3/20/1973',
    age: 45,
    country: 'Indonesia',
    phone: '2439411544'
  },
  {
    id: 17,
    first_name: 'Uta',
    last_name: 'Gooderick',
    email: 'ugooderickg@over-blog.com',
    date_of_birth: '1/16/2022',
    age: 64,
    country: 'Portugal',
    phone: '4146730546'
  },
  {
    id: 18,
    first_name: 'Lock',
    last_name: 'Fice',
    email: 'lficeh@bloglovin.com',
    date_of_birth: '7/10/1974',
    age: 34,
    country: 'Sweden',
    phone: '1944080898'
  },
  {
    id: 19,
    first_name: 'Randy',
    last_name: 'Kisar',
    email: 'rkisari@squarespace.com',
    date_of_birth: '3/19/1975',
    age: 47,
    country: 'China',
    phone: '8563809998'
  },
  {
    id: 20,
    first_name: 'Debra',
    last_name: 'Geering',
    email: 'dgeeringj@cbslocal.com',
    date_of_birth: '10/26/2017',
    age: 44,
    country: 'China',
    phone: '5774709041'
  }
];

export const Primary = Template.bind({});
Primary.args = {
  tcolumns:GROUPED_COLUMNS,
  data:MOCK_DATA,
  cellWidth:200,
  rowHeight:42,
  enableColumnHiding:true,
  enableColumnOrdering:true,
  enableVirtualization:true,
  virtualizationTableHeight:250,
  enableRowSelection:true
};
