import React from 'react';
import './Modal.scss';

import Button from './Button';


const Modal = ({ children, closeModal, title }) => {

  return (
    <section className='modal'>
      <p className='modal-close'>
        <Button type='button' danger clickHandler={closeModal}>X</Button>
      </p>
      <p class='modal-title'>{title}</p>
      {children}
    </section>
  );
}

export default Modal;
