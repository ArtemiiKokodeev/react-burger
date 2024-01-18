import { useState, useEffect, useCallback } from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = (initialState = false, { onOpen, onClose } ={}) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  useEffect(() => {
    setIsModalOpen(initialState);
  }, [initialState]);

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    if (typeof onOpen === "function") {
      onOpen();
    }
  }, [onOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  }, [onClose]);

  const toggle = () => {
    isModalOpen ? closeModal() : openModal();
  };

  return {
    isModalOpen,
    toggle,
    openModal,
    closeModal,
  };
};