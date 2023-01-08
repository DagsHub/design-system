import React, { useState } from 'react';
import startCase from 'lodash/startCase';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { enum2arr } from '../../../utils';
import { Tag, TagCategory, TagSize } from '../../../components/elements/tag';

export default {
  title: 'Elements/Tag',
  component: Tag
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Presentation = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div>
      {enum2arr(TagCategory).map((category) => (
        <div key={category}>
          {enum2arr(TagSize).map((size) => (
            <Tag
              key={`${category}-${size}`}
              category={category}
              size={size}
              label={`${category} / ${size}`}
            />
          ))}
          <br /> <br />
        </div>
      ))}
      <Tag
        label={`${startCase(selected ? 'selected' : 'not selected')}. Click Me!`}
        selected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
};

export const Interactive = Template.bind({});
Interactive.args = {
  category: TagCategory.General,
  size: TagSize.Medium,
  label: 'Change me!'
};
