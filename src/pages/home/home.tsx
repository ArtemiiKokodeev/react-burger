import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import homeStyles from './home.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_ORDER_DETAILS } from "../../services/actions/order";
import { useAppSelector, useAppDispatch } from '../../index';

function Home(): React.JSX.Element {
  const { ingredientsRequest } = useAppSelector((state) => state.ingredientsArr);
  const { orderRequest } = useAppSelector((state) => state.order);
  const { loginRequest } = useAppSelector((state) => state.login);

  const dispatch = useAppDispatch();

  // закрытие модальных окон по клику на оверлей
  function handleCloseModalWithOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
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
    <> 
      {
        ingredientsRequest || orderRequest || loginRequest ? <p className={homeStyles.loader}>Загрузка...</p> :
          <main className={homeStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor 
                onCloseModalWithOverlayClick={handleCloseModalWithOverlayClick}
                onCloseAllModals={handleCloseAllModals}
              />
            </DndProvider>
          </main>
      }
    </>
  )
}

export default Home;