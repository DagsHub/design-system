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
  const classes = classNames([`radio-button-item`, className]);

  return (
      <div className={classes} style={{width:width}}>
        <div>
          <label className="radio-button-item__container">{label}
            <input type="radio" name="radio"/>
            <span className="radio-button-item__checkmark"></span>
            {icon?icon:<></>}
          </label>
        </div>
        <div className="radio-button-item__description">{description}</div>
      </div>
  );
};
