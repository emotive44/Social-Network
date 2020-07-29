import React from 'react';
import './Spinner.scss';

const Spinner = ({ style, styleBtn }) => {
  return (
    <div className="spinner">
      <img
        className={styleBtn && 'button-spinner'}
        src="/spinner.gif"
        style={style}
        alt=""
      />
    </div>
  );
};

export default Spinner;
