import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = { onClose: () => void } & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Modal: FC<TModalProps> = ({ children, onClose } ) => {

  useEffect(() => {
    const handleCloseModalWithEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();}
    
    document.addEventListener("keydown", handleCloseModalWithEsc);
    
    return () => {
      document.removeEventListener("keydown", handleCloseModalWithEsc);
    }

  }, [onClose]);

  const modalRoot = document.getElementById("react-modals") || document.createElement("div");

  return ReactDOM.createPortal(
    <div className={modalStyles.popup}>
      <div className={modalStyles.container}>
        <div className={modalStyles.header} data-testid='closeModal'>
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        {children}
      </div>

      <ModalOverlay onClose={onClose} />
    </div>
  , modalRoot);
}

export default Modal;