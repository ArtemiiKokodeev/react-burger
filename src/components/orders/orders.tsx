import React from 'react';
import { useAppSelector } from '../../index';
import ordersStyles from './orders.module.css';
import { useLocation, Link } from 'react-router-dom';
import OrderItem from './order-item/order-item';

function Orders(): React.JSX.Element {

  const { orders } = useAppSelector((state) => state.feed);
  const location = useLocation();

    return (
      <section className="mt-10 mr-10 custom-scroll">
        {location.pathname === '/feed' && 
          <h2 className="text text_type_main-large mb-5">
            Лента заказов
          </h2>
        }
        <ul className={`${ordersStyles.list} mb-10`}>
          {Array.from(orders).reverse().map((elem) => (
            <Link
              key={elem.number}
              // Тут мы формируем динамический путь для нашего заказа
              to={`/feed/${elem.number}`}
              // а также сохраняем в свойство background роут,
              // на котором была открыта наша модалка
              state={{ background: location }}
              style={{textDecoration: 'none'}}
            >
              <li key={elem._id}>
                <OrderItem order={elem} />
              </li>
            </Link>
            ))
            }
        </ul>
    </section>
    )
};

export default Orders;