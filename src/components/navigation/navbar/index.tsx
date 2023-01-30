import React from 'react';

import '../../styles/dagshub.scss';

export interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  return (
    <nav className="dagshub navbar">
      <a href="/issues">Issues</a>
      <a href="/pulls">Pull Requests</a>
      <a href="/resources">
        <ul>
          <li>
            <p>This is a list inside a Link</p>
          </li>
          <li>
            <p>Just an example</p>
          </li>
        </ul>
      </a>
      <a href="/explore/repos">Explore</a>
      <a href="/pricing">Pricing</a>
    </nav>
  );
}
