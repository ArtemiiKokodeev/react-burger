import { React, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorOrder from './constructor-order/constructor-order';
import BurgerConstructorIng from './burger-constructor-ing/burger-constructor-ing';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from "uuid";
import { ADD_INGREDIENTS_TO_CONSTRUCTOR } from "../../services/actions/burger-constructor";

function BurgerConstructor( { 
  onCloseModalWithOverlayClick,
  onCloseAllModals
} ) {

  const { constructorBuns, constructorIngredients } = useSelector((state) => state.burgerConstructor);
  const { isOrderModalOpened, orderNum } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  // отправка экшена добавления ингредиента в конструктор
  const addIngToConstructor = (ingredient) => {
    return {
      type: ADD_INGREDIENTS_TO_CONSTRUCTOR,
      payload: {
        ...ingredient,
        key: uuid()
      }
    }
  }

  // хук переноса интгредиента в конструктор
  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngToConstructor(item));
    }
  });

  // расчет общей стоимости заказа
  const orderTotalPrice = useMemo(() => {
    const ingredientsTotalPrice = constructorIngredients.reduce((acc, i) => acc + i.price, 0)
    const bunsTotalPrice = constructorBuns ? constructorBuns.price * 2 : 0;
    const total =  bunsTotalPrice + ingredientsTotalPrice;
    return total ? total : 0;
  }, [constructorIngredients, constructorBuns]);

  return (
      <section className={`${burgerConstructorStyles.box} mt-25`} ref={drop}>
        {!constructorBuns ? 
          <div className={`${burgerConstructorStyles.defaultBun} ${burgerConstructorStyles.defaultTopBun} ml-8`}>
            <p>Выберите булки</p>
          </div> :
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorBuns.name}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
            extraClass={`${burgerConstructorStyles.item} ml-8`}
          />
        }

        {constructorIngredients.length === 0 ? 
          <div className={burgerConstructorStyles.defaultIngredientBox}>
            <div className={`${burgerConstructorStyles.defaultIngredient} mt-4 ml-2 mb-4`}>
              <p>Выберите начинку</p>
            </div> 
          </div> :
          <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
            {constructorIngredients.map((el, index) => (
              <BurgerConstructorIng key={el.key} el={el} index={index} />
            ))}
          </ul>
        }

        {!constructorBuns ? 
          <div className={`${burgerConstructorStyles.defaultBun} ${burgerConstructorStyles.defaultBottomBun} ml-8`}>
            <p>Выберите булки</p>
          </div> :
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={constructorBuns.name}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
            extraClass={`${burgerConstructorStyles.item} ml-8`}
          />
        }

        <ConstructorOrder total={orderTotalPrice} />

        {isOrderModalOpened &&
          <Modal 
            onClose={onCloseAllModals}
            onCloseModalWithOverlayClick={onCloseModalWithOverlayClick}
          >
            <OrderDetails orderNumber={orderNum}/>
          </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  onCloseModalWithOverlayClick: PropTypes.func.isRequired,
  onCloseAllModals: PropTypes.func.isRequired
}; 

export default BurgerConstructor;