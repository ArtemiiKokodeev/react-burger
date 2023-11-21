import React from 'react';
import PropTypes from 'prop-types';
import ingredientGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredients-item/ingredients-item';
import { ingredientType } from '../../../utils/types';

function IngredientGroup( { typeEn, typeRu, ingredients } ) {
  return (
    <div className="mt-10">
      <h3 className="text text_type_main-medium mb-6">{typeRu}</h3>
      <ul className={`${ingredientGroupStyles.list} mb-10`}>
        {ingredients.filter(el => el.type === typeEn).map(elem => (
          <li key={elem._id}>
            <IngredientItem 
              name={elem.name}
              price={elem.price}
              image={elem.image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  typeEn: PropTypes.string.isRequired,
  typeRu: PropTypes.string.isRequired
}; 

export default IngredientGroup;
