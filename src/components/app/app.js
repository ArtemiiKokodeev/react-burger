import { React, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetIngredients } from '../../services/actions/ingredients';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_ORDER_DETAILS } from "../../services/actions/order";

function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest } = useSelector((state) => state.ingredientsArr);
  const { orderRequest } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(handleGetIngredients());
  }, [dispatch]);

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
    dispatch({
      type: CLOSE_ORDER_DETAILS
    });
  }
  
  return (
    <div className={appStyles.app}>
      <AppHeader />
      {
        ingredientsRequest || orderRequest ? <p className={appStyles.loader}>Загрузка...</p> :
          <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients 
                onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
                onCloseAllModals={handleCloseAllModals}
              />
              <BurgerConstructor 
                onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
                onCloseAllModals={handleCloseAllModals}
              />
            </DndProvider>
          </main>
      }
    </div>
  );
}

export default App;
