// import React from 'react';
// import type { Meta, StoryFn } from '@storybook/react';
// import {BasicTable, BasicTableProps} from "../../../../components/dagshub/data-engine/react-table";
//
// const meta: Meta<BasicTableProps> = {
//   title: 'DagsHub/Data-Engine/Tables/BasicTable',
//   component: BasicTable
// };
//
// export default meta;
//
// const Template: StoryFn<BasicTableProps> = (args) => <BasicTable {...args} />;
// const COLUMNS = [
//   {
//     Header: 'Id',
//     accessor: 'id'
//   },
//   {
//     Header: 'First Name',
//     accessor: 'first_name'
//   },
//   {
//     Header: 'Last Name',
//     accessor: 'last_name'
//   },
//   {
//     Header: 'Date Of Birth',
//     accessor: 'date_of_birth'
//   },
//   {
//     Header: 'Country',
//     accessor: 'country'
//   },
//   {
//     Header: 'Phone',
//     accessor: 'phone'
//   }
// ]
// const MOCK_DATA=[{"id":1,"first_name":"Tabbatha","last_name":"Tapsfield","email":"ttapsfield0@discuz.net","date_of_birth":"4/10/1978","age":15,"country":"United States","phone":"7027426744"},
//   {"id":2,"first_name":"Celle","last_name":"Mangeney","email":"cmangeney1@army.mil","date_of_birth":"5/26/1996","age":20,"country":"East Timor","phone":"5842196796"},
//   {"id":3,"first_name":"Ernestine","last_name":"Ashbrook","email":"eashbrook2@wunderground.com","date_of_birth":"3/17/2021","age":25,"country":"Indonesia","phone":"1156055612"},
//   {"id":4,"first_name":"Nonah","last_name":"Champniss","email":"nchampniss3@economist.com","date_of_birth":"8/3/2022","age":32,"country":"Japan","phone":"7853735987"}]
//
//
// export const Primary = Template.bind({});
// Primary.args = {
//   tcolumns:COLUMNS,
//   tdata:MOCK_DATA
// };
