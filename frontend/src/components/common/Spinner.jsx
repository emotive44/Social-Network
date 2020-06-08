import React from 'react';
import './Spinner.scss';


const Spinner = ({ style }) => {
  return (
    <div className='spinner'>
      <img src="/spinner.gif" alt="" style={style}/>
    </div>
  );
}

export default Spinner;
