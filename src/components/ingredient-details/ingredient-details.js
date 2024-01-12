import { React } from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {

  const { openedIngredient } = useSelector((state) => state.ingredientsDetails);

  return (
    <div className={ingredientDetailsStyles.ingredientDetails}>
      <img src={openedIngredient.image_large} alt={`Ингредиент ${openedIngredient.name}`} 
        className={`${ingredientDetailsStyles.image} mb-4`}
      />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8`}>
        {openedIngredient.name}
      </p>
      <div className={`${ingredientDetailsStyles.container}`}>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient.calories}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient.proteins}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient.fat}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details}`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;