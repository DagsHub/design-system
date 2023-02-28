import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Tooltip } from '../../../components/elements/tooltip';
import { Toast, ToastProps } from '../../../components/notifications/toast';

import '../../../components/styles/root.scss';

const meta: Meta<ToastProps> = {
  title: 'Notifications/Toast',
  component: Toast
};

export default meta;
export const Success = () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Toast visible={visible} width={400} onClose={() => setVisible(false)}>
      I am a{' '}
      <a
        target="_blank"
        href="https://www.google.com/search?q=toast&sxsrf=AJOqlzWqn40MHtHewEZ4KInrQctrPxtzag:1677519065562&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijxobAnbb9AhVO3qQKHdbCAGYQ_AUoAXoECAEQAw&biw=1920&bih=976&dpr=1"
      >
        <strong>Great</strong>
      </a>{' '}
      toast!
    </Toast>
  );
};

export const Error = () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Toast visible={visible} width={400} onClose={() => setVisible(false)} type="error">
      I am a{' '}
      <a
        target="_blank"
        href="https://www.google.com/search?q=toast&sxsrf=AJOqlzWqn40MHtHewEZ4KInrQctrPxtzag:1677519065562&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijxobAnbb9AhVO3qQKHdbCAGYQ_AUoAXoECAEQAw&biw=1920&bih=976&dpr=1"
      >
        <strong>Great</strong>
      </a>{' '}
      toast!
    </Toast>
  );
};

export const AutoClose = () => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Toast visible={visible} width={400} onClose={() => setVisible(false)} autoCloseSeconds={5}>
      I am a{' '}
      <a
        target="_blank"
        href="https://www.google.com/search?q=toast&sxsrf=AJOqlzWqn40MHtHewEZ4KInrQctrPxtzag:1677519065562&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijxobAnbb9AhVO3qQKHdbCAGYQ_AUoAXoECAEQAw&biw=1920&bih=976&dpr=1"
      >
        <strong>Great</strong>
      </a>{' '}
      toast!
    </Toast>
  );
};

export const TooltipToast = () => {
  return (
    <Tooltip
      content={
        <Toast visible>
          I am a{' '}
          <a
            target="_blank"
            href="https://www.google.com/search?q=toast&sxsrf=AJOqlzWqn40MHtHewEZ4KInrQctrPxtzag:1677519065562&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijxobAnbb9AhVO3qQKHdbCAGYQ_AUoAXoECAEQAw&biw=1920&bih=976&dpr=1"
          >
            <strong>Great</strong>
          </a>{' '}
          toast!
        </Toast>
      }
    >
      <span>See what I've got</span>
    </Tooltip>
  );
};
