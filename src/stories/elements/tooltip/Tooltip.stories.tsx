import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '../../../components/elements/button';
import { Tooltip, TooltipProps } from '../../../components/elements/tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Elements/Tooltip',
  component: Tooltip
};

export default meta;

export const Primary = () => {
  return (
    <Tooltip content="I am a tooltip">
      <Button label="Hello" />
    </Tooltip>
  );
};
