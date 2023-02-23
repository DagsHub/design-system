import React from 'react';
import '../../../../styles/root.scss';
import './card-empty-state.scss';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';
import { Icon } from '../../../../icons';

export interface CardEmptyStateProps {
  text?: string;
  width: number;
  height?: number;
  buttonText?: string;
  buttonAction?:()=>void;
  buttonLink?:string;
}

export function CardEmptyState({ text, width, height, buttonText, buttonLink, buttonAction }: CardEmptyStateProps) {
  return (
    <div className="card-empty-state" style={{ maxWidth: width, height }}>
      {text && <div className="card-empty-state__text">{text}</div>}
      {buttonText && (
        <a href={buttonLink??undefined}>
          <Button
          label={buttonText}
          stretch={ButtonStretch.Slim}
          variant={ButtonVariant.Primary}
          iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus" />}
          onClick={()=>buttonAction}
          />
        </a>
      )}
    </div>
  );
}
