import React, { useMemo } from 'react';
import ingredientItemStyles from './ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { SHOW_INGREDIENT_DETAILS } from "../../../services/actions/ingredient-details";
import { useDrag } from "react-dnd";
import { TIngredient } from '../../../utils/types';
import { useAppSelector, useAppDispatch } from '../../../index';

type TIngredientItemProps = {
  ingredient: TIngredient,
  name: string,
  price: number,
  image: string
};

function IngredientItem( { ingredient, name, price, image }: TIngredientItemProps ): React.JSX.Element {

  const dispatch = useAppDispatch();
  const { constructorBuns, constructorIngredients } = useAppSelector((state) => state.burgerConstructor);

  const handleIngredientClick = () => {
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      payload: ingredient
    });
  }

  const [, ref] = useDrag({
    type: "ingredient",
    item: ingredient
  });

  const ingredientsCounter = useMemo(() => {
    const count: { [key: string]: number } = {};
  
    constructorIngredients.forEach((el: TIngredient) => {
      if (!count[el._id]) {
        count[el._id] = 0;
      }
      count[el._id] = count[el._id] + 1;
    });
  
    if (constructorBuns) {
      count[constructorBuns._id] = 2;
    }
  
    return count;
  }, [constructorIngredients, constructorBuns]);
  

  return (
    <div className={`${ingredientItemStyles.item} mb-8`} onClick={handleIngredientClick} ref={ref} data-testid='ingredientItem'>
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
      <Counter 
        count={ingredientsCounter[ingredient._id]}
        size="default" 
        extraClass="m-1" 
      />
    </div>
  );
}

export default IngredientItem;