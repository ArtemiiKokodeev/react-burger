import { React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ( { children, title, onClose, onCloseModalWithOverlayClick } ) => {

  useEffect(() => {
    document.addEventListener("keydown", handleCloseModalWithEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseModalWithEsc);
    }
    // eslint-disable-next-line
  }, []);

  function handleCloseModalWithEsc(e) {
    e.key === "Escape" && onClose();
  }

  const modalRoot = document.getElementById("react-modals");

  return ReactDOM.createPortal(
    <div className={modalStyles.popup} onClick={onCloseModalWithOverlayClick}>
      <div className={modalStyles.container}>
        <div className={modalStyles.header}>
          <h3 className={`${modalStyles.title} text text_type_main-large`}>
            {title}
          </h3>
          <CloseIcon type="primary" onClick={onClose}/>
        </div>
        {children}
      </div>

      <ModalOverlay onClose={onClose} />
    </div>
  , modalRoot);
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onCloseModalWithOverlayClick: PropTypes.func.isRequired
}; 

export default Modal;
