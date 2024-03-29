import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import {
  MetadataKeyValueList,
  MetadataKeyValueListProps,
} from '../../../../components/dagshub/data-engine/metadataKeyValue/MetadataKeyValueList';

const meta: Meta<MetadataKeyValueListProps> = {
  title: 'DagsHub/Data-Engine/MetadataKeyValueList/MetadataKeyValueList',
  component: MetadataKeyValueList,
};

export default meta;

const Template: StoryFn<typeof MetadataKeyValueList> = (args) => <MetadataKeyValueList {...args} />;

export const metadataKeyValueList: StoryFn<typeof MetadataKeyValueList> = Template.bind({});
metadataKeyValueList.args = {
  metadataList: [
    { key: 'key1', value: 'mockValue1', valueType: 'STRING', multiple: false },
    { key: 'key2', value: 0, valueType: 'INTEGER', isAutoGenerated: true, multiple: false },
    { key: 'key3', value: false, valueType: 'BOOLEAN', multiple: false },
    { key: 'key4', value: true, valueType: 'BOOLEAN', multiple: false },
  ],
  onDeleteHandler: (keyName: string) => {
    console.log(`Metadata field with key name ${keyName} was deleted`);
  },
};
