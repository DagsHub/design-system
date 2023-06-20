import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dropdown, DropdownProps } from '../../../components/elements/dropdown';
import {CodeBlock, CodeBlockProps, TextAreaProps} from "../../../components";

const meta: Meta<CodeBlockProps> = {
  title: 'Elements/Textarea',
  component: CodeBlock
};

export default meta;

const Template: StoryFn<CodeBlockProps> = (args) => <CodeBlock {...args} />;

export const OpenedBasic = Template.bind({});
OpenedBasic.args = {
  value:"import { render, screen } from '@testing-library/react';\n" +
      " import App from './App';\n" +
      "\n" +
      "  test('renders learn react link', () => {\n" +
      "    render(<App />);\n" +
      "    const linkElement = screen.getByText(/learn react/i)kjndkfjnkjnkjnfvkjnkvjnkdfjnknfvkfjdnvkjdnkjnfkdvnfn;\n" +
      "    expect(linkElement).toBeInTheDocument(); import App from './App';\n" +
      "\n" +
      "  test('renders learn react link', () => {\n" +
      "    render(<App />);\n" +
      "    const linkElement = screen.getByText(/learn react/i);\n" +
      "    expect(linkElement).toBeInTheDocument(); import App from './App';\n" +
      "\n" +
      "  test('renders learn react link', () => {\n" +
      "    render(<App />);\n" +
      "    const linkElement = screen.getByText(/learn react/i);\n" +
      "    expect(linkElement).toBeInTheDocument(); import App from './App';\n" +
      "\n" +
      "  test('renders learn react link', () => {\n" +
      "    render(<App />);\n" +
      "    const linkElement = screen.getByText(/learn react/i);\n" +
      "    expect(linkElement).toBeInTheDocument();\n" +
      "  });  "
};

