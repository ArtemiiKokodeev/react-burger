import { React, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import ingredientGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredients-item/ingredients-item';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const IngredientGroup = forwardRef(( { typeEn, typeRu }, ref) => {

  const { ingredients } = useSelector(state => state.ingredientsArr);

  const ingredientsFilteredList = useMemo(
    () => ingredients.filter(el => el.type === typeEn)
  , [ingredients, typeEn])

  const location = useLocation();

  return (
    <div className="mt-10" ref={ref}>
      <h3 className="text text_type_main-medium mb-6">{typeRu}</h3>
      <ul className={`${ingredientGroupStyles.list} mb-10`}>
        {ingredientsFilteredList.map(elem => (
          <Link
            key={elem._id}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/ingredients/${elem._id}`}
            // а также сохраняем в свойство background роут,
            // на котором была открыта наша модалка
            state={{ background: location }}
            style={{textDecoration: 'none'}}
          >
            <li key={elem._id}>
              <IngredientItem 
                ingredient={elem}
                name={elem.name}
                price={elem.price}
                image={elem.image}
              />
            </li>
          </Link>
          ))
        }
      </ul>
    </div>
  );
})

IngredientGroup.propTypes = {
  typeEn: PropTypes.string.isRequired,
  typeRu: PropTypes.string.isRequired,
}; 

export default IngredientGroup;
