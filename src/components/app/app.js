import { React, useEffect, useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetIngredients } from '../../services/actions/ingredients';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";

function App() {

  const [showModalOrderDetails, setShowModalOrderDetails] = useState(false); // открытие модального окна заказа
  // const [orderNumber, setOrderNumber] = useState(0); // открытие модального окна заказа

  const dispatch = useDispatch();
  const { ingredientsRequest } = useSelector((state) => state.ingredientsArr);

  useEffect(() => {
    dispatch(handleGetIngredients());
  }, [dispatch]);

  function handleOpenModalOrderDetails() {
    setShowModalOrderDetails(true);
  }

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e) {
    e.target === e.currentTarget && handleCloseAllModals();
  }

  // закрытие всех модальных окон
  function handleCloseAllModals() {
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
      payload: null
    });
    setShowModalOrderDetails(false);
  }
  
  return (
    <div className={appStyles.app}>
      <AppHeader />
      {
      ingredientsRequest ? <p>Загрузка...</p> :
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients 
              onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
              onCloseAllModals={handleCloseAllModals}
            />
            <BurgerConstructor 
              showModalOrderDetails={showModalOrderDetails}
              onOpenModalOrderDetails={handleOpenModalOrderDetails}
              onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
              onCloseAllModals={handleCloseAllModals}
              // orderNumber={orderNumber}
            />
          </DndProvider>
        </main>
      }
    </div>
  );
}

export default App;
