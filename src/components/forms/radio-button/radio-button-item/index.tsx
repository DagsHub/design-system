import React, {MouseEventHandler} from 'react';
import classNames from 'classnames';
import './radio-button-item.scss';

export interface RadioButtonItemProps {
  label?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  description: string;
  icon?: JSX.Element;
  width?:number;
}

export const RadioButtonItem = ({
  label = '',
  className = '',
  onClick,
  description='',
  icon,
  width,
  ...props
}: RadioButtonItemProps) => {
  const classes = classNames([`radio-button__item`, className]);

  return (
      <div className={classes} style={{width:width}}>
        <div>
          <label className="container">{label}
            <input type="radio" name="radio"/>
            <span className="checkmark"></span>
            {icon?icon:<></>}
          </label>
        </div>
        <div className="description">{description}</div>
      </div>
  );
};
