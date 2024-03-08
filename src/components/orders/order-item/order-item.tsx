import React from 'react';
import { useLocation } from 'react-router-dom';
import orderItemStyles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderArr} from '../../../services/actions/ws-action-types';
import { TIngredient } from '../../../utils/types';
import { useAppSelector, useAppDispatch } from '../../../index';
import { SHOW_ORDER_INFO } from '../../../services/actions/order-info';

type TOrderItemProps = { order: IOrderArr };

function OrderItem( { order }: TOrderItemProps ): React.JSX.Element {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleOrderClick = () => {
    dispatch({
      type: SHOW_ORDER_INFO,
      payload: order
    });
  }

  const { ingredients } = useAppSelector((state) => state.ingredientsArr);

  // подсчет общей стоимости каждого заказа
  const menuItemPrices: { [key: string]: number } = {};

  ingredients.forEach(item => {
    menuItemPrices[item._id] = item.price;
  });
  
  const calculateOrderTotalPrice = (order: IOrderArr): number => {
    let totalPrice = 0;
    order.ingredients.forEach(ingredientId => {
      totalPrice += menuItemPrices[ingredientId] || 0;
    });
    return totalPrice;
  };

  // трансформация формата времени создания заказа
  function formatCreatedAt(createdAtString: string) {
    const createdAtDate = new Date(createdAtString);
    const now = new Date();

    const isToday =
      createdAtDate.getDate() === now.getDate() &&
      createdAtDate.getMonth() === now.getMonth() &&
      createdAtDate.getFullYear() === now.getFullYear();

    const isYesterday =
      createdAtDate.getDate() === now.getDate() - 1 &&
      createdAtDate.getMonth() === now.getMonth() &&
      createdAtDate.getFullYear() === now.getFullYear();

    const timeString = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return `Сегодня, ${timeString}`;
    } else if (isYesterday) {
      return `Вчера, ${timeString}`;
    } else {
      const dateString = createdAtDate.toLocaleDateString();
      return `${dateString}, ${timeString}`;
    }
  }

  // создание массива картинок ингредиентов заказа
  function getImagesForIngredients(menuItem: IOrderArr, ingredients: Array<TIngredient>) {
    const ingredientMap = new Map(ingredients.map(ingredient => [ingredient._id, ingredient]));
    return menuItem.ingredients.map(ingredientId => ingredientMap.get(ingredientId)?.image).filter(Boolean);
  }

  const imageUrls = getImagesForIngredients(order, ingredients).slice(0, 6);

  return (
    <div className={`${orderItemStyles.item} mb-4`} onClick={handleOrderClick}>
      <div className={orderItemStyles.numberAndTimeContainer}>
        <p className={`${orderItemStyles.number} text text_type_digits-default`}>
          {`#${order.number}`}
        </p>
        <p className={`${orderItemStyles.date} text text_type_main-small text_color_inactive`}>
          {formatCreatedAt(order.createdAt)}
        </p>
      </div>
      <p className={`${orderItemStyles.name} mt-6 text text_type_main-medium`}>
        {order.name}
      </p>
      {location.pathname === '/profile/orders' && 
        <p className="mt-2 text text_type_main-small ">
          {order.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
      }
      <div className={`${orderItemStyles.imgAndPriceContainer} mt-6 `}>
        <ul className={orderItemStyles.imageUrls}>
          {imageUrls.map((elem, index) => (
            <li key={index}>
              <img src={elem} alt='Ингредиент'
                className={`${orderItemStyles.image}`}
              />
            </li>
            ))
            }
          </ul>
        <div className={orderItemStyles.priceContainer}>
          <p className={`${orderItemStyles.price} text text_type_digits-default mr-2`}>
            {calculateOrderTotalPrice(order)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderItem;