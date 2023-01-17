import React from 'react';
import startCase from 'lodash/startCase';
import { styled } from '@storybook/theming';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { enum2arr } from '../../../utils';
import { Button, ButtonVariant, ButtonStretch } from '../../../components/elements/button';

export default {
  title: 'Elements/Button',
  component: Button
} as ComponentMeta<typeof Button>;

const ButtonStory = styled(Button)`
  margin-right: 10px;
`;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

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
        <Button fullWidth label="Full Width" />
      </div>
    </div>
  );
};

export const Interactive = Template.bind({});
Interactive.args = {
  variant: ButtonVariant.Primary,
  stretch: ButtonStretch.Normal,
  label: 'Change me!'
};
