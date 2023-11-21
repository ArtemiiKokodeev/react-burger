import React from 'react';
import ingredientGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredients-item/ingredients-item';
import { IngredientData } from '../../../utils/data';

function IngredientGroup( { typeEn, typeRu } ) {
  return (
    <div className="mt-10">
      <h3 className="text text_type_main-medium mb-6">{typeRu}</h3>
      <ul className={`${ingredientGroupStyles.list} mb-10`}>
        {IngredientData.filter(el => el.type === typeEn).map(elem => (
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

export default IngredientGroup;
