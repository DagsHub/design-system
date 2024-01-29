import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import { styled, css } from '@storybook/theming';

import { Icon, icons } from '../../../components/icons';

const Meta = styled.div`
  color: #666;
  font-size: 16px;
`;

const Copied = styled.div`
  position: absolute;
  top: -3px;
  background-color: azure;
  padding: 3px 6px;
  border-radius: 4px;
`;

const Item = styled.li<{ minimal?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 16%;
  min-width: 120px;
  margin: 16px;
  cursor: pointer;
  position: relative;
  svg {
    margin-right: 6px;
    width: 20px;
    height: 20px;
  }
  ${(props) =>
    props.minimal &&
    css`
      flex: none;
      min-width: auto;
      padding: 0;
      background: #fff;
      margin: 16px;
      svg {
        display: block;
        margin-right: 0;
        width: 14px;
        height: 14px;
      }
    `};
`;

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Header = styled.h2`
  font-size: 20px;
  margin: 16px;
`;

export default {
  title: 'Icons',
  component: Icon,
};

export const IconsList = () => {
  const [copied, setCopied] = useState<keyof typeof icons | null>(null);

  const copyIcon = (icon) => () => {
    copy(`<Icon icon="${icon}" />`);
    setCopied(icon);
    setTimeout(() => {
      setCopied(null);
    }, 1800);
  };

  return (
    <>
      <Header>{Object.keys(icons).length} icons</Header>
      <List>
        {Object.keys(icons).map((key) => (
          <Item key={key} onClick={copyIcon(key)}>
            {copied === key && <Copied>Copied!</Copied>}
            <Icon icon={key as keyof typeof icons} fill="#000" aria-hidden />
            <Meta>{key}</Meta>
          </Item>
        ))}
      </List>
    </>
  );
};

export const SingleIcon = (args) => <Icon {...args} />;
SingleIcon.args = {
  icon: 'checkmark',
  fill: '#000',
};
