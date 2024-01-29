import React, { useMemo, useRef } from 'react';
import { Button, ButtonVariant } from '../button';
import { Icon } from '../../icons';
import './index.scss';

export type CodeBlockProps = {
  value: string;
  onCopyButtonClick: (args?: any) => void;
  onInfoButtonClick: (args?: any) => void;
  colabOnClick?: (args?: any) => void;
};

export const CodeBlock = ({
  value,
  onInfoButtonClick,
  onCopyButtonClick,
  colabOnClick,
}: CodeBlockProps) => {
  const lineCount = useMemo(() => value.split('\n').length, [value]);
  const linesArr = Array.from({ length: Math.max(lineCount, 14) }, (_, i) => i + 1);

  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className={'text-area-wrapper'}>
      <div className={'style-header'}>
        <div className={'section'}>
          <Icon icon={'solid-code-terminal'} width={16} height={14} fill={'#94A3B8'} />
          <span className={'header-title'}>Command line</span>
        </div>
        <div className={'section'}>
          <Button
            onClick={onInfoButtonClick}
            label={''}
            iconRight={
              <Icon icon={'solid-exclamation'} width={12.13} height={11.14} fill={'#64748B'} />
            }
            variant={ButtonVariant.Secondary}
          />
          <Button
            onClick={onCopyButtonClick}
            label={''}
            iconRight={
              <Icon icon={'solid-copy-duplicate'} width={11.2} height={11.2} fill={'#64748B'} />
            }
            variant={ButtonVariant.Secondary}
          />
        </div>
      </div>
      <div className={'style-colab'} onClick={colabOnClick}>
        <img src={'https://colab.research.google.com/assets/colab-badge.svg'} />
      </div>
      <div className={'styled-numbers shared-style'} ref={lineCounterRef}>
        {linesArr.map((count) => (
          <div key={count}>{count}</div>
        ))}
      </div>
      <textarea
        className={'text-area shared-style'}
        onChange={() => {}}
        onScroll={handleTextareaScroll}
        ref={textareaRef}
        value={value}
      />
    </div>
  );
};
