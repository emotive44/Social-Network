import React from 'react';
import './Button.scss';


const Button = ({
  type,
  info,
  style,
  light,
  danger,
  primary,
  children,
  animation,
  clickHandler
}) => {
  return (
    <button 
      type={type}
      className={`btn 
        ${primary && `btn-primary ${animation && 'btn-primary-animation'}`} 
        ${danger && `btn-danger ${animation && 'btn-danger-animation'}`}
        ${info && `btn-info ${animation && 'btn-info-animation'}`}
        ${light && `btn-light ${animation && 'btn-light-animation'}`}
      `}
      style={style}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
