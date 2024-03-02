import React, { useRef } from 'react';
import burgerConstructorIngStyles from './burger-constructor-ing.module.css';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { 
  REMOVE_INGREDIENTS_FROM_CONSTRUCTOR, 
  SORT_INGREDIENTS_IN_CONSTRUCTOR 
} from "../../../services/actions/burger-constructor";
// import { TIngredient } from '../../../utils/types';
import { TConstructorIngredient } from '../../../utils/types';

type TBurgerConstructorIngProps = {
  el: TConstructorIngredient,
  index: number
};

function BurgerConstructorIng( { el, index }: TBurgerConstructorIngProps ): React.JSX.Element {

  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const moveIngredient = (dragIndex: any, hoverIndex: any) => {
    dispatch({
      type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      }
    });
  };

  const [, drag] = useDrag({
    type: "ingredientItem",
    item: { index }
  });

  const [, drop] = useDrop({
    accept: "ingredientItem",
    hover: (ingredientItem: any, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = ingredientItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = (ref.current as HTMLLIElement)?.getBoundingClientRect() as DOMRect;
      const hoverMiddleY =
      (hoverBoundingRect?.bottom - hoverBoundingRect?.top) / 2;
      const clientOffset = monitor.getClientOffset() as { y: number };
      const hoverClientY = clientOffset?.y - hoverBoundingRect?.top;

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

  const removeIngFromConstructor = (el: TConstructorIngredient) => {
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

export default BurgerConstructorIng;