import React from 'react';
import PropTypes from 'prop-types';
import ingredientItemStyles from './ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../../utils/types';

function IngredientItem( { ingredient, onIngredientClick, name, price, image } ) {

  const handleIngredientClick = () => {
    onIngredientClick(ingredient);
  }

  return (
    <div className={`${ingredientItemStyles.item} mb-8`} onClick={handleIngredientClick}>
      <img src={image} alt={`Ингредиент ${name}`} 
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

IngredientItem.propTypes = {
  ingredient: PropTypes.shape(ingredientType),
  onIngredientClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}; 

export default IngredientItem;