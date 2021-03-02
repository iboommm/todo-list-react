import React, { useState, useContext, createContext } from 'react';

const modalContext = createContext();

export const useProvideModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (name) => {
    console.log(name);
    setName(name);
    setShow(true);
  };

  return {
    show,
    name,
    handleClose,
    handleShow,
  };
};

export const ProvideModal = ({ children }) => {
  const modal = useProvideModal();
  return (
    <modalContext.Provider value={modal}>{children}</modalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(modalContext);
};
