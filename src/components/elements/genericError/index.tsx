import React from 'react';
import './index.scss';
import { Icon } from '../../icons';

export interface GenericErrorProps {
  text: string;
  support?: boolean;
}

export function GenericError({ text, support }: GenericErrorProps) {
  return (
    <div className={'error-component'}>
      <div className={'error-component__icon'}>
        <Icon icon={'outline-exclamation-circle'} width={20} height={20} fill={'#DC2626'} />
      </div>
      <div className={'error-component__text'}>
        <div className={'error-component__title'}>{text}</div>
        {support && (
          <div className={'error-component__support'}>
            Contact us via our{' '}
            <a
              className={'error-component__support-link'}
              target="_blank"
              rel="noopener noreferrer"
              href={'https://discord.com/invite/9gU36Y6'}
            >
              support channel
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
