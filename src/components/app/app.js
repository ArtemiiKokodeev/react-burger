import { React, useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import * as api from '../../utils/api';

function App() {

  const [ingredients, setIngredients] = useState([]); // массив ингредиентов с сервера
  const [showModalIngredientDetails, setShowModalIngredientDetails] = useState(false); // открытие модального окна ингредиента
  const [selectedIngredientForOpen, setSelectedIngredientForOpen] = useState(null); // данные ингредиента, которого кликнули
  const [showModalOrderDetails, setShowModalOrderDetails] = useState(false); // открытие модального окна заказа
  // const [orderNumber, setOrderNumber] = useState(0); // открытие модального окна заказа

  // запрос на сервер для получения всех ингредиентов при монтировании компонента
  useEffect(() => {
    handleGetIngredients()
  }, [])

  // открытие модального окна ингредиента
  useEffect(() => {
    selectedIngredientForOpen && setShowModalIngredientDetails(true)
  }, [selectedIngredientForOpen])

  function handleOpenModalOrderDetails() {
    setShowModalOrderDetails(true);
  }

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e) {
    e.target === e.currentTarget && handleCloseAllModals();
  }

  // закрытие всех модальных окон
  function handleCloseAllModals() {
    setShowModalIngredientDetails(false);
    setSelectedIngredientForOpen(null);
    setShowModalOrderDetails(false);
  }

  // получение всех ингредиентов с сервиса API
  function handleGetIngredients() {
    api.getIngredients()
    .then((ingredients) => {
      setIngredients(ingredients.data)
    })
    .catch(() => {
      console.log("Во время запроса произошла ошибка")
    })
  };
  
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients 
          ingredients={ingredients}
          selectedIngredientForOpen={selectedIngredientForOpen}
          onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
          showModalIngredientDetails={showModalIngredientDetails}
          onCloseAllModals={handleCloseAllModals}
          onIngredientClick={setSelectedIngredientForOpen}
        />
        <BurgerConstructor 
          ingredients={ingredients}
          showModalOrderDetails={showModalOrderDetails}
          onOpenModalOrderDetails={handleOpenModalOrderDetails}
          onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
          onCloseAllModals={handleCloseAllModals}
          // orderNumber={orderNumber}
        />
      </main>
    </div>
  );
}

export default App;
