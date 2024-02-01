import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';

const StyledTooltip = styled(
  ({ className, isEmpty, ...props }: { isEmpty?: boolean } & TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme, isEmpty }) =>
  !isEmpty
    ? {
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: 'rgba(254, 226, 226, 1)',
          color: 'rgba(23, 45, 50, 1)',
          fontSize: theme.typography.pxToRem(12),
          fontWeight: 400,
          border: '1px solid rgba(254, 202, 202, 1)',
        },
      }
    : {
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: 'transparent',
          border: '0px',
        },
      }
);

export const enum TooltipVariant {
  Default = 'default',
  Error = 'error',
}

export const ErroredTooltip = ({
  title,
  tooltipVariant = TooltipVariant.Default,
  children,
  placement = 'top',
  disableInteractive = true,
  ...restProps
}: { tooltipVariant?: TooltipVariant; children: ReactElement<any, any> } & TooltipProps) => {
  return (
    <>
      <StyledTooltip
        {...restProps}
        title={title}
        placement={placement}
        disableInteractive={disableInteractive}
        isEmpty={title === ''}
      >
        {children}
      </StyledTooltip>
    </>
  );
};
