import {Meta, StoryFn} from '@storybook/react';
import React from 'react';
import SingleFileViewModal, {
    singleFileViewModalProps
} from "../../../../components/dagshub/data-engine/singleFileViewModal/SingleFileViewModal";

const meta: Meta<singleFileViewModalProps> = {
    title: 'DagsHub/Data-Engine/Modals/Single file view modal',
    component: SingleFileViewModal
};

export default meta;

const Template: StoryFn<typeof SingleFileViewModal> = (args) => (
    <SingleFileViewModal {...args} />
);

export const singlefileViewModalImage: StoryFn<typeof SingleFileViewModal> =
    Template.bind({});

singlefileViewModalImage.args = {
    closeModal: () => {
        console.log("close modal")
    },
    setActiveSingleItem: () => {
        console.log("set active single item")
    },
    activeSingleItemIndex: 0,
    setActiveSingleItemIndex: () => {
        console.log("set active single item index")
    },
    hasMoreItemsToFetch: false,
    loadMoreItems: () => {
        console.log("load more items")
    },
    itemData:
        {
            itemType: "image",
            repoFilePath: "https://dagshub.com/Simon/baby-yoda-segmentation-dataset/src/master/images/007.png",
            galleryFilePath: "https://dagshub.com/Simon/baby-yoda-segmentation-dataset/raw/master/images/007.png",
            fileName: "007.png"
        },
    items: [

        {
            node: {
                id: 219,
                path: "009.png",
                metadata: [
                    {
                        key: "size",
                        value: 1170152,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "219"
        },
        {
            node: {
                id: 220,
                path: "010.png",
                metadata: [
                    {
                        key: "size",
                        value: 1243757,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "220"
        },
        {
            node: {
                id: 221,
                path: "011.png",
                metadata: [
                    {
                        key: "size",
                        value: 1412604,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "221"
        }
    ]
};

export const singlefileViewModalAudio: StoryFn<typeof SingleFileViewModal> =
    Template.bind({});

singlefileViewModalAudio.args = {
    closeModal: () => {
        console.log("close modal")
    },
    setActiveSingleItem: () => {
        console.log("set active single item")
    },
    activeSingleItemIndex: 0,
    setActiveSingleItemIndex: () => {
        console.log("set active single item index")
    },
    hasMoreItemsToFetch: false,
    loadMoreItems: () => {
        console.log("load more items")
    },
    itemData:
        {
            itemType: "audio",
            repoFilePath: "https://dagshub.com/DAGsHub-Official/annotations-showcase/src/main/data/audio/abc.wav",
            galleryFilePath: "https://dagshub.com/DAGsHub-Official/annotations-showcase/raw/main/data/audio/abc.wav",
            fileName: "abc.wav"
        },
    items: [

        {
            node: {
                id: 219,
                path: "009.png",
                metadata: [
                    {
                        key: "size",
                        value: 1170152,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "219"
        },
        {
            node: {
                id: 220,
                path: "010.png",
                metadata: [
                    {
                        key: "size",
                        value: 1243757,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "220"
        },
        {
            node: {
                id: 221,
                path: "011.png",
                metadata: [
                    {
                        key: "size",
                        value: 1412604,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "221"
        }
    ]
};

export const singlefileViewModalVideo: StoryFn<typeof SingleFileViewModal> =
    Template.bind({});

singlefileViewModalVideo.args = {
    closeModal: () => {
        console.log("close modal")
    },
    setActiveSingleItem: () => {
        console.log("set active single item")
    },
    activeSingleItemIndex: 0,
    setActiveSingleItemIndex: () => {
        console.log("set active single item index")
    },
    hasMoreItemsToFetch: false,
    loadMoreItems: () => {
        console.log("load more items")
    },
    itemData:
        {
            itemType: "video",
            repoFilePath: "https://dagshub.com/DAGsHub-Official/annotations-showcase/src/main/data/videos/earth-space-small.mp4",
            galleryFilePath: "https://dagshub.com/DAGsHub-Official/annotations-showcase/raw/main/data/videos/earth-space-small.mp4",
            fileName: "/earth-space-small.mp4"
        },
    items: [

        {
            node: {
                id: 219,
                path: "009.png",
                metadata: [
                    {
                        key: "size",
                        value: 1170152,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "219"
        },
        {
            node: {
                id: 220,
                path: "010.png",
                metadata: [
                    {
                        key: "size",
                        value: 1243757,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "220"
        },
        {
            node: {
                id: 221,
                path: "011.png",
                metadata: [
                    {
                        key: "size",
                        value: 1412604,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "221"
        }
    ]
};

export const singlefileViewModalNotSupportedType: StoryFn<typeof SingleFileViewModal> =
    Template.bind({});

singlefileViewModalNotSupportedType.args = {
    closeModal: () => {
        console.log("close modal")
    },
    setActiveSingleItem: () => {
        console.log("set active single item")
    },
    activeSingleItemIndex: 0,
    setActiveSingleItemIndex: () => {
        console.log("set active single item index")
    },
    hasMoreItemsToFetch: false,
    loadMoreItems: () => {
        console.log("load more items")
    },
    itemData:
        {
            itemType: "na",
            repoFilePath: "/testerdag/baby-yoda-segmentation-dataset/src/master/s3:/allencell/.quilt/named_packages/aics/actk/1606370800",
            galleryFilePath: "/testerdag/baby-yoda-segmentation-dataset/raw/master/s3:/allencell/.quilt/named_packages/aics/actk/1606370800",
            fileName: "1606370800"
        },
    items: [

        {
            node: {
                id: 219,
                path: "009.png",
                metadata: [
                    {
                        key: "size",
                        value: 1170152,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "219"
        },
        {
            node: {
                id: 220,
                path: "010.png",
                metadata: [
                    {
                        key: "size",
                        value: 1243757,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "220"
        },
        {
            node: {
                id: 221,
                path: "011.png",
                metadata: [
                    {
                        key: "size",
                        value: 1412604,
                        valueType: "INTEGER"
                    }
                ]
            },
            cursor: "221"
        }
    ]
};
