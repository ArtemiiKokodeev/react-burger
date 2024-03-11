import React, { useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../index';
import orderFeedStyles from './order-feed.module.css';
import Orders from '../../components/orders/orders';
import { FEED_CONNECTION_START, FEED_CONNECTION_CLOSED } from '../../services/actions/feed';

function OrderFeed(): React.JSX.Element {

  const { orders, total, totalToday } = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();

  const ordersReady = useMemo(() => {
    const ordersNumberArr = orders.filter(el => el.status === 'done').slice(0, 5);
    return ordersNumberArr;
  }, [orders]);

  const ordersInProgress = useMemo(() => {
    const ordersNumberArr = orders.filter(el => el.status === 'pending').slice(0, 5);
    return ordersNumberArr;
  }, [orders]);

    // запрос массива заказов
    useEffect(() => {
      dispatch({ 
        type: FEED_CONNECTION_START, 
        payload: 'wss://norma.nomoreparties.space/orders/all' 
      });
      return () => {
        // console.log('OrderFeed component is unmounted');
        dispatch({ type: FEED_CONNECTION_CLOSED });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

  return (
    <div className={orderFeedStyles.main}>
      <Orders />

      <div className={`${orderFeedStyles.ordersInfoContainer} mt-25`}>
        <div className={orderFeedStyles.readyAndInprogressContainer}>
          <div className={`${orderFeedStyles.readyContainer} mr-30`}>
            <p className="text text_type_main-medium">
              Готовы:
            </p>
            <ul className={orderFeedStyles.orderNumbers}>
              {ordersReady.map((el, index) => (
                <li key={index}>
                  <p className="text text_type_digits-default text_color_inactive mb-2">
                    {el.number}
                  </p>
                </li>
                ))
              }
            </ul>
          </div>
          <div>
            <p className="text text_type_main-medium">
              В работе:
            </p>
            <ul className={orderFeedStyles.orderNumbers}>
              {ordersInProgress.map((el, index) => (
                <li key={index}>
                  <p className="text text_type_digits-default text_color_inactive mb-2">
                    {el.number}
                  </p>
                </li>
                ))
              }
            </ul>
          </div>
        </div> 

        <div className="mt-10 mb-10">
          <p className="text text_type_main-medium">
            Выполнено за все время:
          </p>
          <p className="text text_type_digits-large">
            {total}
          </p>
        </div>

        <div className="mt-10 mb-10">
          <p className="text text_type_main-medium">
            Выполнено за сегодня:
          </p>
          <p className="text text_type_digits-large">
            {totalToday}
          </p>
        </div>
      </div>
    </div>
  )
};

export default OrderFeed;