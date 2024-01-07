import React from 'react';
import './index.scss';
import { Icon } from '../../icons';
import classNames from "classnames";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface MessageProps {
    text: string;
    kind: 'error' | 'warning' | 'info' | 'success';
    support?: boolean;
}

export function Message({ text, kind, support }: MessageProps) {
    return (
        <div className={classNames('message-component', kind)}>
            <div className={'message-component__icon'}>
                {kind === 'info' ? (
                    <Icon icon={'outline-information-circle'} width={20} height={20} fill={'#2563EB'}/>
                ) : kind === 'warning' ? (
                    <Icon icon={'outline-exclamation-circle'} width={20} height={20} fill={'#F97316'}/>
                ) : kind === 'error' ? (
                    <Icon icon={'outline-exclamation-circle'} width={20} height={20} fill={'#DC2626'}/>
                ) : kind == 'success' ? (
                    <CheckCircleOutlineIcon sx={{color: '#059669'}} />
                ) : null
                }
            </div>
            <div className={'message-component__text'}>
                <div className={'message-component__title'}>{text}</div>
                {support && (
                    <div className={'message-component__support'}>
                        Contact us via our{' '}
                        <a
                            className={'message-component__support-link'}
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
