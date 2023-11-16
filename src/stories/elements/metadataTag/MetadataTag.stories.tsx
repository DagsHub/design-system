import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { MetadataTagsRenderer } from '../../../components';

const meta: Meta<{ itemMetadataTagsToDisplayDict: Record<string, { value: any }> }> = {
  title: 'Elements/Metadata Tag',
  component: MetadataTagsRenderer
};

export default meta;

const Template: StoryFn<typeof MetadataTagsRenderer> = (args) => (
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
        <MetadataTagsRenderer {...args} />
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

export const oneTag: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
oneTag.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' }
  }
};

export const twoTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
twoTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' }
  }
};

export const threeTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
threeTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' },
    'This is a long tag label3': { value: 'this is a long value' }
  }
};

export const fourTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
fourTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' },
    'This is a long tag label3': { value: 'this is a long value' },
    'This is a long tag label4': { value: 'this is a long value' }
  }
};

export const fiveTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
fiveTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' },
    'This is a long tag label3': { value: 'this is a long value' },
    'This is a long tag label4': { value: 'this is a long value' },
    'This is a long tag label5': { value: 'this is a long value' }
  }
};

export const sixTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
sixTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' },
    'This is a long tag label3': { value: 'this is a long value' },
    'This is a long tag label4': { value: 'this is a long value' },
    'This is a long tag label5': { value: 'this is a long value' },
    'This is a long tag label6': { value: 'this is a long value' }
  }
};

export const sevenTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
sevenTags.args = {
  itemMetadataTagsToDisplayDict: {
    'This is a long tag labelll1': { value: 'this is a long value' },
    'This is a long tag label2': { value: 'this is a long value' },
    'This is a long tag label3': { value: 'this is a long value' },
    'This is a long tag label4': { value: 'this is a long value' },
    'This is a long tag label5': { value: 'this is a long value' },
    'This is a long tag label6': { value: 'this is a long value' },
    'This is a long tag label7': { value: 'this is a long value' }
  }
};

const getManyTags = (n: number) => {
    const tags: Record<string, { value: any }> = {};
    for (let i = 0; i < n; i++) {
        tags[`very long label${i}`] = { value: `value${i}` };
    }
    return tags;
}

export const manyTags: StoryFn<typeof MetadataTagsRenderer> = Template.bind({});
manyTags.args = {
  itemMetadataTagsToDisplayDict: getManyTags(1000),
};
