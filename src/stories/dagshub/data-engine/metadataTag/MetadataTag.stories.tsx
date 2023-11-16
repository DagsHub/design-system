import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { GalleryTagsGroup } from '../../../../components';

const meta: Meta<{ itemMetadataTagsToDisplayDict: Record<string, { value: any }> }> = {
  title: 'DagsHub/Data-Engine/MetadataTags/Gallery tags group',
  component: GalleryTagsGroup
};

export default meta;

const Template: StoryFn<typeof GalleryTagsGroup> = (args) => (
  <Box
    sx={{
      borderRadius: '8px',
      height: '220px',
      width: '270px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}
    display={'flex'}
    flexDirection={'column'}
    border={''}
  >
    <Box
      style={{
        height: '190px',
        width: '270px',
        backgroundColor: '#F8FAFC',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <img
        style={{
          objectFit: 'contain',
          maxHeight: '190px',
          maxWidth: '254px',
          borderRadius: '0px',
          cursor: 'pointer',
          display: 'block'
        }}
        src={'https://dagshub.com/Dean/COCO_1K/raw/main/data/images/train/000000000009.jpg'}
        alt=""
      />

      <Box
        flex={1}
        bgcolor={'transparent'}
        position={'absolute'}
        zIndex={20}
        maxHeight={'80px'}
        overflow={'hidden'}
        width={'100%'}
        padding={'4px'}
        bottom={0}
      >
        <GalleryTagsGroup {...args} />
      </Box>
    </Box>
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'end',
        justifyContent: 'flex-start',
        height: '30px',
        fontFamily: 'Inter',
        fontSize: '14px'
      }}
    >
      <a
        style={{
          color: '#5467DE',
          cursor: 'pointer',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        target="_blank"
      >
        fileName.json
      </a>
    </Box>
  </Box>
);

const getNTags = (n: number) => {
  const tags: Record<string, { value: any }> = {};
  for (let i = 1; i <= n; i++) {
    tags[`This is a very long label ${i}`] = { value: `A very long value ${i}` };
  }
  return tags;
};

export const oneTag: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
oneTag.args = {
  itemMetadataTagsToDisplayDict: getNTags(1)
};

export const twoTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
twoTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(2)
};

export const threeTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
threeTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(3)
};

export const fourTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
fourTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(4)
};

export const fiveTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
fiveTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(5)
};

export const sixTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
sixTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(6)
};

export const sevenTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
sevenTags.args = {
  itemMetadataTagsToDisplayDict: getNTags(7)
};

export const manyTags1: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
manyTags1.args = {
  itemMetadataTagsToDisplayDict: getNTags(100)
};

export const manyTags2: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
manyTags2.args = {
  itemMetadataTagsToDisplayDict: getNTags(1000)
};

export const mixedTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
mixedTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' }, //long key and long value
    bool: { value: 'true' }, // short key and short value
    'Another long tag labelll2': { value: 'value' }, //long key and short value
    float: { value: '12.3456789023457658768' }, //short key and long value
    'another key': { value: 'another value' },
    size: { value: '1234543' },
    bla: { value: 'bla' }
  }
};

export const noTags: StoryFn<typeof GalleryTagsGroup> = Template.bind({});
noTags.args = {
  itemMetadataTagsToDisplayDict: {}
};
