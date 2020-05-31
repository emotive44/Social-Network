import React from 'react';
import './FormWrapper.scss';


const FormWrapper = ({ submitHandler, title, children }) => {
  return (
    <div className="form">
      <label className="form-title">{title}</label>
      <form onSubmit={submitHandler}>
        {children}
      </form>
    </div>
  );
}

export default FormWrapper;
