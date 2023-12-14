import React from 'react';
import startCase from 'lodash/startCase';
import { styled } from '@storybook/theming';
import { Meta, StoryFn } from '@storybook/react';
import { enum2arr } from '../../../utils';
import {
  Button,
  ButtonVariant,
  ButtonStretch,
  ButtonProps
} from '../../../components/elements/button';
import { Icon } from '../../../components';

const meta: Meta<ButtonProps> = {
  title: 'Elements/Button',
  component: Button
};

export default meta;

const ButtonStory = styled(Button)`
  margin-right: 10px;
`;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Presentation = () => {
  return (
    <div>
      {enum2arr(ButtonVariant).map((variant) => (
        <div key={variant}>
          {enum2arr(ButtonStretch).map((stretch) => (
            <ButtonStory
              key={`${variant}-${stretch}`}
              variant={variant}
              stretch={stretch}
              label={`${startCase(variant)} / ${startCase(stretch)}`}
            />
          ))}
          <br /> <br />
        </div>
      ))}
      <div>
        <Button disabled label="Disabled" /> <br /> <br />
        <Button fullWidth label="Full Width" onClick={() => alert('Full Width Button')} />
      </div>
    </div>
  );
};

export const WithIcon = () => {
  return (
    <>
      {enum2arr(ButtonVariant).map((variant) => (
        <div key={variant}>
          {enum2arr(ButtonStretch).map((stretch) => (
            <ButtonStory
              key={`${variant}-${stretch}`}
              variant={variant}
              disabled={variant === ButtonVariant.Disabled}
              stretch={stretch}
              label={`${startCase(variant)} / ${startCase(stretch)}`}
              iconLeft={<Icon fill={'#475569'} icon="outline-annotations" height={14} width={14} />}
            />
          ))}
          <br /> <br />
        </div>
      ))}
    </>
  );
};

export const Interactive = Template.bind({});
Interactive.args = {
  variant: ButtonVariant.Primary,
  stretch: ButtonStretch.Normal,
  label: 'Change me!'
};
