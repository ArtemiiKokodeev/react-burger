import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type IModalOverlayProps = { onClose: () => void };

function ModalOverlay( { onClose }: IModalOverlayProps ) {

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    e.target === e.currentTarget && onClose();
  }

  return (
    <div className={modalOverlayStyles.overlay} onClick={handleCloseModalWithOverlayClick}>
    </div>
  );
}

export default ModalOverlay;