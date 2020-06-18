import { useState } from 'react';

const useModal = () => {
  const [toggleModal, setToggleModal] = useState(false);

  const showModal = () => setToggleModal(true);

  const closeModal = () => setToggleModal(false);


  return { toggleModal, showModal, closeModal }
}

export default useModal;
