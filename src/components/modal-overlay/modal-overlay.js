import { React } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay( { onClose } ) {

  const modalRoot = document.getElementById("react-modals");

  return ReactDOM.createPortal(
    <div className={modalOverlayStyles.overlay} onClick={onClose}>
    </div>
  , modalRoot);
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}; 

export default ModalOverlay;