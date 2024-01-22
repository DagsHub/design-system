import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@mui/material';
import React from 'react';
import { NewDatasetNameModal } from '../../../../components/dagshub/data-engine/queryBuilder/NewDatasetNameModal';

const meta: Meta<typeof NewDatasetNameModal> = {
  title: 'DagsHub/Data-Engine/QueryBuilder/Modals/NewDatasetNameModal',
  component: NewDatasetNameModal
};

export default meta;

const Template: StoryFn<typeof NewDatasetNameModal> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <>
      {isModalOpen ? (
        <NewDatasetNameModal
          {...args}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSave={() => {}}
          onDatasetNameChange={(value: string) => {
            console.log(value);
          }}
        />
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      )}
    </>
  );
};

export const newDatasetNameModal: StoryFn<typeof NewDatasetNameModal> = Template.bind({});
newDatasetNameModal.args = {};
