import { React, useRef } from 'react';
// import PropTypes from 'prop-types';
import burgerConstructorIngStyles from './burger-constructor-ing.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { 
  REMOVE_INGREDIENTS_FROM_CONSTRUCTOR, 
  SORT_INGREDIENTS_IN_CONSTRUCTOR 
} from "../../../services/actions/burger-constructor";

function BurgerConstructorIng( { el, index } ) {

  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((state) => state.burgerConstructor);
  const ref = useRef(null);

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
        draggedIngredient: constructorIngredients[dragIndex]
      }
    });
  };

  const [, drag] = useDrag({
    type: "ingredientItem",
    item: { index }
  });

  const [, drop] = useDrop({
    accept: "ingredientItem",
    hover: (ingredientItem, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = ingredientItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      moveIngredient(dragIndex, hoverIndex);
      ingredientItem.index = hoverIndex;
    },
  });

  const removeIngFromConstructor = (el) => {
    dispatch({
      type: REMOVE_INGREDIENTS_FROM_CONSTRUCTOR,
      payload: el.key
    })
  }

  drag(drop(ref));

  return (
    <li key={el.key} ref={ref} className={burgerConstructorIngStyles.item}>
      <DragIcon type="primary" />
      <ConstructorElement 
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        extraClass={`${burgerConstructorIngStyles.item} ml-2 mb-4`}
        handleClose={() => removeIngFromConstructor(el)}
      />
    </li>
  );
}

BurgerConstructorIng.propTypes = {
  
}; 

export default BurgerConstructorIng;