import React from 'react';
import { Meta } from '@storybook/react';

import '../styles/page.scss';

const Introduction = () => (
  <div>
    <p>Welcome to dagshub design system library.</p>
    <section>
      <h2>Install</h2>
      <pre>
        <code>npm install --save @dagshub/ui</code>
      </pre>
    </section>
    <section>
      <h2>Getting started</h2>
    </section>
  </div>
);

export default {
  title: 'Introduction',
  component: Introduction
} as Meta<typeof Introduction>;

export const Intro = Introduction;
