import React from 'react';
import { ComponentMeta } from '@storybook/react';

import '../styles/page.css';

const Introduction = () => (
  <div>
    <h1>Introduction</h1>
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
  title: 'Intro',
  component: Introduction
} as ComponentMeta<typeof Introduction>;

export const Intro = Introduction;
