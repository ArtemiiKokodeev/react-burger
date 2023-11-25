import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorOrder from './constructor-order/constructor-order';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor( { 
  ingredients,
  showModalOrderDetails,
  onOpenModalOrderDetails,
  onCloseModalWithOverlayClick,
  onCloseAllModals
} ) {

  return (
    <section className={`${burgerConstructorStyles.box} mt-25`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        extraClass={`${burgerConstructorStyles.item} ml-8`}
      />

      <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
        {ingredients.filter(elem => elem.type !== 'bun').map(el => (
          <li key={el._id} className={burgerConstructorStyles.item}>
            <DragIcon type="primary" />
            <ConstructorElement 
              text={el.name}
              price={el.price}
              thumbnail={el.image}
              extraClass={`${burgerConstructorStyles.item} ml-2 mb-4`}
            />
          </li>
        ))}
      </ul>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        extraClass={`${burgerConstructorStyles.item} ml-8`}
      />

      <ConstructorOrder total={610} onOpenModalOrderDetails={onOpenModalOrderDetails}/>

      {showModalOrderDetails && 
        <Modal 
          onClose={onCloseAllModals}
          onCloseModalWithOverlayClick={onCloseModalWithOverlayClick}
        >
          <OrderDetails orderNumber={123456}/>
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  showModalOrderDetails: PropTypes.bool.isRequired,
  onOpenModalOrderDetails: PropTypes.func.isRequired,
  onCloseModalWithOverlayClick: PropTypes.func.isRequired,
  onCloseAllModals: PropTypes.func.isRequired
}; 

export default BurgerConstructor;