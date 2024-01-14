import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export interface MessageProps {
    text: string;
    kind: 'error' | 'warning' | 'info' | 'success';
    support?: boolean;
}

export function Message({ text, kind, support }: MessageProps) {
    return (
        <Alert severity={kind} sx={
            kind === 'info' ? ({
                background: '#eff6ff',
                border: '1px solid #93c5fd',
            }) : kind === 'warning' ? ({
                background: '#fefbea',
                border: '1px solid #fde68a',
            }) : kind === 'error' ? ({
                background: '#fef2f2',
                border: '1px solid #fecaca',
            }) : kind == 'success' ? ({
                background: '#f0fdf4',
                border: '1px solid #86efac',
            }) : null
        }>
            {support ? (
                <>
                    <AlertTitle>{text}</AlertTitle>
                    Contact us via our{' '}
                    <a
                        className={'message-component__support-link'}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={'https://discord.com/invite/9gU36Y6'}
                    >
                        support channel
                    </a>
                </>
            ) : text}
        </Alert>
    );
}
