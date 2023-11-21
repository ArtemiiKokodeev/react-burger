import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorOrder from './constructor-order/constructor-order';

function BurgerConstructor( { ingredients } ) {
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
      <ConstructorOrder total="610"/>
    </section>
  );
}

BurgerConstructor.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
  }))
}; 

export default BurgerConstructor;