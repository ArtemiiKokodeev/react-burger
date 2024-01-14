import { React, useMemo } from 'react';
import PropTypes from 'prop-types';
import constructorOrderStyles from './constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CurrencyIconMedium from '../../../images/CurrencyIconMedium.png';
import { useSelector, useDispatch } from 'react-redux';
import { handleCreateOrder } from '../../../services/actions/order';

function ConstructorOrder( { total } ) {

  const dispatch = useDispatch();
  const { constructorBuns, constructorIngredients } = useSelector((state) => state.burgerConstructor);

  const orderIngredients = useMemo(() => { 
    return [...constructorIngredients, constructorBuns]
  }, [constructorBuns, constructorIngredients]);

  const createOrder = () => {
    dispatch(handleCreateOrder(orderIngredients));
  };

  return (
    <div className={`${constructorOrderStyles.container} mt-10`}>
      <div className={`${constructorOrderStyles.totalContainer}`}>
        <p className="text text_type_digits-medium mr-2">{total}</p>
        <img src={CurrencyIconMedium} className="image" alt='Иконка валюты' />
      </div>
      <Button onClick={createOrder} 
        htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4">
          Оформить заказ
      </Button>
    </div>
  );
}

ConstructorOrder.propTypes = {
  total: PropTypes.number.isRequired
}; 

export default ConstructorOrder;