import { Meta, StoryFn } from '@storybook/react';
import { BaseSyntheticEvent, useState } from 'react';
import SingleFileViewModal, {
  ItemData,
  singleFileViewModalProps
} from '../../../../components/dagshub/data-engine/singleFileViewModal/SingleFileViewModal';
import { NewMetadataField } from '../../../../components';
import { Button } from '@mui/material';
import React from 'react';
import { SingleFileViewFileRenderer } from '../../../../components/dagshub/data-engine/singleFileViewModal/SingleFileViewFileRenderer';

const meta: Meta<singleFileViewModalProps> = {
  title: 'DagsHub/Data-Engine/Modals/Single file view modal',
  component: SingleFileViewModal
};

export default meta;

const itemDataMockList: ItemData[] = [
  {
    itemIndex: 0,
    itemType: 'image',
    repoFilePath:
      'https://dagshub.com/yonomitt/BetterSquirrelDetector/src/main/data/images/test/squirrels_000021.jpg',
    galleryFilePath:
      'https://dagshub.com/yonomitt/BetterSquirrelDetector/raw/main/data/images/test/squirrels_000021.jpg',
    fileName: 'squirrels_000021.jpg',
    metadataList: [{ key: 'size', value: '123456', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: false,
    hasNext: true,
    isSelected: true
  },
  {
    itemIndex: 1,
    itemType: 'audio',
    repoFilePath:
      'https://dagshub.com/DAGsHub-Official/annotations-showcase/src/main/data/audio/abc.wav',
    galleryFilePath:
      'https://dagshub.com/DAGsHub-Official/annotations-showcase/raw/main/data/audio/abc.wav',
    fileName: 'abc.wav',
    metadataList: [
      { key: 'size', value: '34567899', valueType: 'INTEGER', isAutoGenerated: true },
      { key: 'is_cat', value: 'false', valueType: 'BOOLEAN' },
      { key: 'is_earth_space', value: 'true', valueType: 'BOOLEAN' },
      { key: 'is_video', value: 'true', valueType: 'BOOLEAN' },
      { key: 'length', value: '16 seconds', valueType: 'STRING' },
      { key: 'description', value: 'this is a video about earth space', valueType: 'STRING' },
      { key: 'categories', value: 'earth, space, live, human', valueType: 'INTEGER' }
    ],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    itemIndex: 2,
    itemType: 'video',
    repoFilePath:
      'https://dagshub.com/DAGsHub-Official/annotations-showcase/src/main/data/videos/earth-space-small.mp4',
    galleryFilePath:
      'https://dagshub.com/DAGsHub-Official/annotations-showcase/raw/main/data/videos/earth-space-small.mp4',
    fileName: 'earth-space-small.mp4',
    metadataList: [
      { key: 'size', value: '3456789', valueType: 'INTEGER', isAutoGenerated: true },
      { key: 'is_cat', value: 'false', valueType: 'BOOLEAN' },
      { key: 'is_earth_space', value: 'true', valueType: 'BOOLEAN' },
      { key: 'is_video', value: 'true', valueType: 'BOOLEAN' },
      { key: 'length', value: '16 seconds', valueType: 'STRING' },
      { key: 'description', value: 'this is a video about earth space', valueType: 'STRING' },
      { key: 'categories', value: 'earth, space, live, human', valueType: 'INTEGER' }
    ],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    itemIndex: 3,
    itemType: 'image',
    repoFilePath: 'https://dagshub.com/Dean/COCO_1K/src/main/data/images/train/000000001681.jpg',
    galleryFilePath: 'https://dagshub.com/Dean/COCO_1K/raw/main/data/images/train/000000001681.jpg',
    fileName: '000000001681.jpg',
    metadataList: [{ key: 'size', value: '34567878', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    // Using local file cause otherwise im getting CORS error
    itemIndex: 4,
    itemType: 'text',
    repoFilePath: '/assets/textFile.txt',
    galleryFilePath: '/assets/textFile.txt',
    fileName: 'textFile.txt',
    metadataList: [{ key: 'size', value: '34567890', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    // Using local file cause otherwise im getting CORS error
    itemIndex: 5,
    itemType: 'pdf',
    repoFilePath: '/assets/sample.pdf',
    galleryFilePath: '/assets/sample.pdf',
    fileName: 'sample.pdf',
    metadataList: [{ key: 'size', value: '34567890', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    // Using local file cause otherwise im getting CORS error
    itemIndex: 6,
    itemType: 'csv',
    repoFilePath: '/assets/csvFile.csv',
    galleryFilePath: '/assets/csvFile.csv',
    fileName: 'csvFile.csv',
    metadataList: [{ key: 'size', value: '34567820', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    itemIndex: 7, // expect to get n error fallback
    itemType: 'image',
    repoFilePath:
      'https://dagshub.com/yonomitt/BetterSquirrelDetectorr/src/main/data/images/test/squirrels_000021.jpg',
    galleryFilePath:
      'https://dagshub.com/yonomitt/BetterSquirrelDetectorr/src/main/data/images/test/squirrels_000021.jpg',
    fileName: 'squirrels_000021.jpg- wrong url',
    metadataList: [{ key: 'size', value: '123456', valueType: 'INTEGER', isAutoGenerated: true }],
    hasPrevious: true,
    hasNext: true,
    isSelected: false
  },
  {
    itemIndex: 8,
    itemType: 'na',
    repoFilePath: 'https://dagshub.com/DAGsHub-Official/dagshub-docs/src/main/create_single_doc.py',
    galleryFilePath:
      'https://dagshub.com/DAGsHub-Official/dagshub-docs/raw/main/create_single_doc.py',
    fileName: 'create_single_doc.py',
    metadataList: [
      { key: 'size', value: '345678', valueType: 'INTEGER', isAutoGenerated: true },
      { key: 'is_cat', value: 'false', valueType: 'BOOLEAN' },
      { key: 'is_earth_space', value: 'true', valueType: 'BOOLEAN' },
      { key: 'is_video', value: 'true', valueType: 'BOOLEAN' },
      { key: 'length', value: '16 seconds', valueType: 'STRING' },
      { key: 'description', value: 'this is a video about earth space', valueType: 'STRING' },
      { key: 'categories', value: 'earth, space, live, human', valueType: 'INTEGER' }
    ],
    hasPrevious: true,
    hasNext: false,
    isSelected: false
  }
];

const Template: StoryFn<typeof SingleFileViewModal> = (args) => {
  const [currentItemData, setCurrentItemData] = useState<ItemData>(itemDataMockList[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const onSelectItemToggle = (e: BaseSyntheticEvent) => {
    const isSelected = currentItemData.isSelected;
    itemDataMockList[currentItemData.itemIndex].isSelected = !isSelected;
    setCurrentItemData({
      ...currentItemData,
      isSelected: !isSelected
    });
  };

  return (
    <>
      {isModalOpen ? (
        <div id="single-file-view">
          <SingleFileViewModal
            {...args}
            closeModal={() => {
              setIsModalOpen(false);
            }}
            itemData={currentItemData}
            onGetNextItemClickHandler={() => {
              setCurrentItemData(itemDataMockList[currentItemData.itemIndex + 1]);
            }}
            onGetPreviousItemClickHandler={() => {
              setCurrentItemData(itemDataMockList[currentItemData.itemIndex - 1]);
            }}
            onSelectItemToggle={onSelectItemToggle}
            enableDatapointAnnotating={true}
            enableFileDownloading={true}
            onAnnotatedClick={() => {
              console.log('annotated');
            }}
            visualizerRenderer={({ itemData }) => (
              <SingleFileViewFileRenderer itemData={itemData} />
            )}
          />
        </div>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      )}
    </>
  );
};

export const singlefileViewModalWithEditingEnabled: StoryFn<typeof SingleFileViewModal> =
  Template.bind({});

singlefileViewModalWithEditingEnabled.args = {
  enableMetadataEditing: true,
  enableMetadataDeletion: true,
  metadataOnChangeHandler: (metadataList: NewMetadataField[]) => {
    // console.log(metadataList)
  }
};

export const singlefileViewModalWithSelectAllEnabled: StoryFn<typeof SingleFileViewModal> =
  Template.bind({});

singlefileViewModalWithSelectAllEnabled.args = {
  areAllSelected: true
};

export const singlefileViewModal: StoryFn<typeof SingleFileViewModal> = Template.bind({});

singlefileViewModal.args = {};
