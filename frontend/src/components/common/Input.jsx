import React, { useState } from 'react';
import './Input.scss';

const Input = (props, ref) =>  {
  const [isHover, setIsHover] = useState(false);

  const hover = (e) => {
    if(!e.target.value) {
      setIsHover(true);
    }
   }

  const blur = (e) => {
    if(!e.target.value) {
      setIsHover(false);
    }
  }
   
  return (
    <div className="input">   
      <div className="input-wrapper">
        <label 
          className={isHover || props.value ? 'top' : null}>
          {props.label}
        </label>
        <input 
            type={props.type} 
            name={props.name}
            onClick={hover}
            onBlur={blur}
        />
      </div>
    </div>
  );
}

export default Input;
