import { React } from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types';

function IngredientDetails( { ingredient } ) {

  return (
    <div className={ingredientDetailsStyles.ingredientDetails}>
      <img src={ingredient.image_large} alt={`Ингредиент ${ingredient.name}`} 
        className={`${ingredientDetailsStyles.image} mb-4`}
      />
      <p className={`${ingredientDetailsStyles.name} text text_type_main-medium mb-8`}>
        {ingredient.name}
      </p>
      <div className={`${ingredientDetailsStyles.container}`}>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredient.calories}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredient.proteins}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details} mr-5`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredient.fat}
          </p>
        </div>
        <div className={`${ingredientDetailsStyles.details}`}>
          <p className='text text_type_main-small text_color_inactive mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientType)
}; 

export default IngredientDetails;