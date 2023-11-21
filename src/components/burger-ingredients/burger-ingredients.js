import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientGroupTabs from './ingredients-group-tabs/ingredients-group-tabs';
import IngredientGroup from './ingredients-group/ingredients-group';
import { ingredientType } from '../../utils/types'

function BurgerIngredients( { ingredients } ) {
  return (
    <section className="mt-10 mr-10">
      <h2 className="text text_type_main-large mb-5">
        Соберите бургер
      </h2>
      <IngredientGroupTabs />
      <div className={`${burgerIngredientsStyles.box} custom-scroll`}>
        <IngredientGroup typeEn="bun" typeRu="Булки" ingredients={ingredients}/>
        <IngredientGroup typeEn="sauce" typeRu="Соусы" ingredients={ingredients}/>
        <IngredientGroup typeEn="main" typeRu="Начинки" ingredients={ingredients}/>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired
}; 

export default BurgerIngredients;
