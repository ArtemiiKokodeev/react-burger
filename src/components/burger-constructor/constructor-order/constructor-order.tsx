import React, { useMemo } from 'react';
import constructorOrderStyles from './constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CurrencyIconMedium from '../../../images/CurrencyIconMedium.png';
import { useNavigate } from 'react-router-dom';
import { handleCreateOrder } from '../../../services/actions/order';
import { CLEAR_CONSTRUCTOR } from "../../../services/actions/burger-constructor";
import { useAppSelector, useAppDispatch } from '../../../index';

type TConstructorOrderProps = { total: number };

function ConstructorOrder( { total }: TConstructorOrderProps ): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { constructorBuns, constructorIngredients } = useAppSelector((state) => state.burgerConstructor);
  const { loggedIn } = useAppSelector((state) => state.login);

  const orderIngredients = useMemo(() => {
    const orderArr = structuredClone(constructorIngredients);
    if (constructorBuns) {
      orderArr.unshift(constructorBuns);
      orderArr.push(constructorBuns);
    }
    return orderArr;
  }, [constructorIngredients, constructorBuns]);

  const createOrder = () => {
    if (!loggedIn) {
      navigate('/login', {replace: true});
    } else {
      dispatch(handleCreateOrder(orderIngredients));
      dispatch({type: CLEAR_CONSTRUCTOR})
    }
  };

  return (
    <div className={`${constructorOrderStyles.container} mt-10`}>
      <div className={`${constructorOrderStyles.totalContainer}`}>
        <p className="text text_type_digits-medium mr-2">{total}</p>
        <img src={CurrencyIconMedium} className="image" alt='Иконка валюты' />
      </div>
      <Button data-testid='orderMade' htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4"
        onClick={createOrder} 
        disabled={constructorBuns === null || constructorIngredients.length === 0}>
          Оформить заказ
      </Button>
    </div>
  );
}

export default ConstructorOrder;