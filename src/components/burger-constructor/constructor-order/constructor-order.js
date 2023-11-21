import React from 'react';
import constructorOrderStyles from './constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CurrencyIconMedium from '../../../images/CurrencyIconMedium.png';

function ConstructorOrder( { total } ) {
  return (
    <div className={`${constructorOrderStyles.container} mt-10`}>
      <div className={`${constructorOrderStyles.totalContainer}`}>
        <p className="text text_type_digits-medium mr-2">{total}</p>
        <img src={CurrencyIconMedium} style={{ width: '36px', height: '36px' }} alt='Иконка валюты' />
      </div>
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4">
        Оформить заказ
      </Button>
    </div>
  );
}

export default ConstructorOrder;