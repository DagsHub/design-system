import React from 'react';
import { Icon } from '../../../../icons';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import './card-empty-state.scss';

export interface CardEmptyStateProps {
  text?: string;
  width: number;
  height?: number;
  buttonText?: string;
  buttonAction?: () => void;
  buttonLink?: string;
}

export function CardEmptyState({
  text,
  width,
  height,
  buttonText,
  buttonLink,
  buttonAction
}: CardEmptyStateProps) {
  return (
    <div className="card-empty-state" style={{ maxWidth: width, height }}>
      {text && <div className="card-empty-state__text">{text}</div>}
      {buttonText && (
        <a href={buttonLink ?? undefined}>
          <Button
            label={buttonText}
            onClick={buttonAction}
            stretch={ButtonStretch.Slim}
            variant={ButtonVariant.Primary}
            iconLeft={<Icon width={11} height={11} fill="#FFFFFF" icon="solid-plus" />}
          />
        </a>
      )}
    </div>
  );
}
