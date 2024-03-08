import React, { useEffect } from 'react';
import orderInfosStyles from './order-info.module.css';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../index';
import { IOrderArr } from '../../services/actions/ws-action-types';
// import { TIngredient } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderInfoProps = { background?: string };

const OrderInfo = ( {background }: TOrderInfoProps ): React.JSX.Element => {

  const { orders } = useAppSelector((state) => state.feed);
  const { openedOrder } = useAppSelector((state) => state.orderInfo);

  const location = useLocation();
  const orderInfo = openedOrder ? openedOrder : orders.find((el: IOrderArr) => String(el.number) === location.pathname.slice(-5))
  const orderInfoIngredientsId = orderInfo?.ingredients
  const { ingredients } = useAppSelector((state) => state.ingredientsArr);

  useEffect(() => {
    console.log(orderInfo)
    console.log(ingredients)
    console.log(orderIngredientsWithIdAndQuantity)
    console.log(orderIngredients)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // создание массива объектов с ключами: _id - уникальные ингредиенты заказа, count - кол-во штук одного ингредиента в заказе
  const idCounts = {};
  orderInfoIngredientsId?.forEach(_id => {
    // @ts-ignore
    idCounts[_id] = (idCounts[_id] || 0) + 1;
  });
   // @ts-ignore
  const orderIngredientsWithIdAndQuantity = Object.keys(idCounts).map(_id => ({ _id, count: idCounts[_id] }));

  // создание массива объектов - ингредиентов со всеми характеристиками и кол-вом в заказе
  const orderIngredients = ingredients
  .filter(ingredient => orderIngredientsWithIdAndQuantity.some(obj => obj._id === ingredient._id))
  .map(ingredient => {
    const matchingFirstObj = orderIngredientsWithIdAndQuantity.find(obj => obj._id === ingredient._id);

    if (matchingFirstObj) {
        // If there is a match, merge the objects and add the 'count' key
        return {
            ...ingredient,
            count: matchingFirstObj.count
        };
    }

    // If there is no match, return the original object from secondArray
    return ingredient;
});
  
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

  return (
    <>
    {
      orderInfo &&
        <div className={background ? orderInfosStyles.orderInfo : orderInfosStyles.orderInfoOwnPage}>
          <h3 className={`${background ? orderInfosStyles.number : orderInfosStyles.numberOwnPage} mb-10 text text_type_digits-default`}>
            {`#${orderInfo.number}`}
          </h3>
          <p className={`${background ? orderInfosStyles.name : orderInfosStyles.nameOwnPage} mb-2 text text_type_main-medium`}>
            {orderInfo.name}
          </p>
          <p className={`${background ? orderInfosStyles.status : orderInfosStyles.statusOwnPage} mb-15 text text_type_main-default text_color_inactive`}>
            {orderInfo.status === 'done' ? 'Выполнен' : 'Готовится'}
          </p>
          <p className='mb-2 text text_type_main-medium'>
            Состав:
          </p>
          <ul className={`${orderInfosStyles.ingredients} custom-scroll`}>
            {orderIngredients.map((ing) => (
              <li key={ing._id} className={orderInfosStyles.ingredientContainer}>
                <div className={orderInfosStyles.imgNameContainer}>
                  <img src={ing.image} 
                    alt='Ингредиент'className={`${orderInfosStyles.image} mr-4`} />
                  <p className={`${orderInfosStyles.name} mt-6 mb-6 text text_type_main-default`}>
                    {ing.name}
                  </p>
                </div>
                <div className={`${orderInfosStyles.priceContainer} mr-4`}>
                  <p className={`${orderInfosStyles.price} text text_type_digits-default mr-2`}>
                  {`${ing.count} х ${ing.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div> 
              </li>
              ))
              }
          </ul>  
        <div className={`${orderInfosStyles.bottomContainer} mt-10`}>
          <p className={`${orderInfosStyles.date} text text_type_main-default text_color_inactive`}>
            {formatCreatedAt(orderInfo.createdAt)}
          </p>
          <div className={orderInfosStyles.priceContainer}>
            <p className={`${orderInfosStyles.price} text text_type_digits-default mr-2`}>
              {calculateOrderTotalPrice(orderInfo)}
            </p>
            <CurrencyIcon type="primary" />
        </div>
        </div>
      </div> 
      }
    </>
  );
}

export default OrderInfo;