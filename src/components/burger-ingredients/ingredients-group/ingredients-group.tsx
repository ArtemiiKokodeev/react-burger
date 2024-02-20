import React, { useMemo, forwardRef } from 'react';
import ingredientGroupStyles from './ingredients-group.module.css';
import IngredientItem from '../ingredients-item/ingredients-item';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../../index';
import { TIngredient } from '../../../utils/types'

type TIngredientGroup = {
  typeEn: string,
  typeRu: string
};

const IngredientGroup = forwardRef<HTMLDivElement, TIngredientGroup>(
  ({ typeEn, typeRu}, ref) => {

  const { ingredients } = useAppSelector((state) => state.ingredientsArr);

  const ingredientsFilteredList = useMemo(
    () => ingredients.filter((el: TIngredient) => el.type === typeEn)
  , [ingredients, typeEn])

  const location = useLocation();

  return (
    <div className="mt-10" ref={ref}>
      <h3 className="text text_type_main-medium mb-6">{typeRu}</h3>
      <ul className={`${ingredientGroupStyles.list} mb-10`}>
        {ingredientsFilteredList.map((elem: TIngredient) => (
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

export default IngredientGroup;