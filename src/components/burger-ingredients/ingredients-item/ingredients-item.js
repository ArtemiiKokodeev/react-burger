import React from 'react';
import ingredientItemStyles from './ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientItem( { name, price, image } ) {
  return (
    <div className={`${ingredientItemStyles.item} mb-8`}>
      <img src={image} alt="картинка ингредиента" 
        className={`${ingredientItemStyles.image} mr-4 mb-1 ml-4`}
      />
      <div className={`${ingredientItemStyles.priceContainer} mt-1 mb-1`}>
        <p className={`${ingredientItemStyles.price} text text_type_digits-default mr-2`}>
        {price}
      </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientItemStyles.name} text text_type_main-small`}>
        {name}
      </p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
}

export default IngredientItem;