import React from 'react';
import PropTypes from 'prop-types';
import constructorOrderStyles from './constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import CurrencyIconMedium from '../../../images/CurrencyIconMedium.png';

function ConstructorOrder( { total, onOpenModalOrderDetails } ) {
  return (
    <div className={`${constructorOrderStyles.container} mt-10`}>
      <div className={`${constructorOrderStyles.totalContainer}`}>
        <p className="text text_type_digits-medium mr-2">{total}</p>
        <img src={CurrencyIconMedium} className="image" alt='Иконка валюты' />
      </div>
      <Button onClick={onOpenModalOrderDetails} 
        htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4">
          Оформить заказ
      </Button>
    </div>
  );
}

ConstructorOrder.propTypes = {
  total: PropTypes.number.isRequired,
  onOpenModalOrderDetails: PropTypes.func.isRequired
}; 

export default ConstructorOrder;