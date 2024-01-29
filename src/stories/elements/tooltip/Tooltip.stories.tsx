import React from 'react';
import { Meta } from '@storybook/react';

import { Tag } from '../../../components/elements/tag';
import { Input } from '../../../components/forms/input';
import { Button } from '../../../components/elements/button';
import { TextArea } from '../../../components/forms/textarea';
import { Tooltip, TooltipProps } from '../../../components/elements/tooltip';
import { Icon } from '../../../components';

const meta: Meta<TooltipProps> = {
  title: 'Elements/Tooltip',
  component: Tooltip,
};

export default meta;

export const ButtonTooltip = () => {
  return (
    <Tooltip content="I am a tooltip">
      <Button label="Hover over me!" />
    </Tooltip>
  );
};

export const TagTooltip = () => {
  return (
    <Tooltip content="I am a tooltip" placement="right">
      <Tag label="Hover over me!" />
    </Tooltip>
  );
};

export const InputTooltip = () => {
  return (
    <Tooltip content="I am a tooltip" placement="bottom-start">
      <Input rootMaxWidth={300} label="I am the input label" value="I also got value" />
    </Tooltip>
  );
};

export const TextAreaTooltip = () => {
  return (
    <>
      <Tooltip content="I am a tooltip" placement="right-end">
        <TextArea maxWidth={300} label="I am the input label" value="I also got value" />
      </Tooltip>
      <Tooltip
        content="Admin access:\nAdmins have full access to all repositories and have admin rights to the organization"
        placement="bottom-start"
      >
        <span>
          <Icon width={13} height={13} fill="#172D32" icon="outline-information-circle" />
        </span>
      </Tooltip>
    </>
  );
};
