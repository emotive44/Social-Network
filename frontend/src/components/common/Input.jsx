import React, { useState } from 'react';
import './Input.scss';

const Input = React.forwardRef((props, ref) =>  {
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
            className={props.err ? 'error' : null}
            type={props.type} 
            name={props.name}
            onClick={hover}
            onBlur={blur}
            ref={ref}
        />
      </div>
      {props.err && <span>{props.err}</span>}
    </div>
  );
})

export default Input;
