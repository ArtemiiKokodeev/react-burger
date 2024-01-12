import { React, useMemo } from 'react';
import PropTypes from 'prop-types';
import ingredientGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredients-item/ingredients-item';
// import { ingredientType } from '../../../utils/types';
import { useSelector } from 'react-redux';

function IngredientGroup( { typeEn, typeRu } ) {

  const { ingredients } = useSelector(state => state.ingredientsArr);

  const ingredientsFilteredList = useMemo(
    () => ingredients.filter(el => el.type === typeEn)
  , [ingredients, typeEn])

  return (
    <div className="mt-10">
      <h3 className="text text_type_main-medium mb-6">{typeRu}</h3>
      <ul className={`${ingredientGroupStyles.list} mb-10`}>
        {ingredientsFilteredList.map(elem => (
            <li key={elem._id}>
              <IngredientItem 
                ingredient={elem}
                name={elem.name}
                price={elem.price}
                image={elem.image}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

IngredientGroup.propTypes = {
  // ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  typeEn: PropTypes.string.isRequired,
  typeRu: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func.isRequired
}; 

export default IngredientGroup;
