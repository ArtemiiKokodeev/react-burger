import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientGroupTabs from './ingredients-group-tabs/ingredients-group-tabs';
import IngredientGroup from './ingredients-group/ingredients-group';

function BurgerIngredients() {
  return (
    <section className="mt-5 mr-10 mb-10">
      <h2 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h2>
      <IngredientGroupTabs />
      <div className={`${burgerIngredientsStyles.box} custom-scroll`}>
        <IngredientGroup typeEn="bun" typeRu="Булки"/>
        <IngredientGroup typeEn="sauce" typeRu="Соусы"/>
        <IngredientGroup typeEn="main" typeRu="Начинки"/>
      </div>
    </section>
  );
}

export default BurgerIngredients;
