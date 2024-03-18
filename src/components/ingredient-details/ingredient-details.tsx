import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useLocation } from 'react-router-dom';
import homeStyles from '../../pages/home/home.module.css';
import { useAppSelector } from '../../index';
import { TIngredient } from "../../utils/types";

type TIngredientDetailsProps = { background?: string };

const IngredientDetails = ( {background }: TIngredientDetailsProps ): React.JSX.Element => {

  const { ingredients, ingredientsRequest } = useAppSelector((state) => state.ingredientsArr);
  const { openedIngredient } = useAppSelector((state) => state.ingredientsDetails);

  const location = useLocation();
  const ing = openedIngredient ? openedIngredient : ingredients.find((el: TIngredient) => el._id === location.pathname.slice(-24))

  return (
    <>
    {
      ingredientsRequest ? <p className={homeStyles.loader}>Загрузка...</p> :
      ing && 
        <div className={ingredientDetailsStyles.ingredientDetails} data-testid='ingredientDetails'>
        <h3 className={`${background ? ingredientDetailsStyles.title : ingredientDetailsStyles.titlePage} text text_type_main-large`}>
          Детали ингредиента
        </h3>
        <img src={ing.image_large} alt={`Ингредиент ${ing.name}`} 
          className={`${ingredientDetailsStyles.image} mb-4`}
        />
        <p className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8`}>
          {ing.name}
        </p>
        <div className={`${ingredientDetailsStyles.container}`}>
          <div className={`${ingredientDetailsStyles.details} mr-5`}>
            <p className='text text_type_main-small text_color_inactive mb-2'>Калории, ккал</p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ing.calories}
            </p>
          </div>
          <div className={`${ingredientDetailsStyles.details} mr-5`}>
            <p className='text text_type_main-small text_color_inactive mb-2'>Белки, г</p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ing.proteins}
            </p>
          </div>
          <div className={`${ingredientDetailsStyles.details} mr-5`}>
            <p className='text text_type_main-small text_color_inactive mb-2'>Жиры, г</p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ing.fat}
            </p>
          </div>
          <div className={`${ingredientDetailsStyles.details}`}>
            <p className='text text_type_main-small text_color_inactive mb-2'>Углеводы, г</p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ing.carbohydrates}
            </p>
          </div>
        </div>
      </div> 
      }
    </>
  );
}

export default IngredientDetails;