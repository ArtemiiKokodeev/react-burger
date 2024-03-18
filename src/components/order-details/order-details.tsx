import React from 'react';
import orderDetailssStyles from './order-details.module.css';
import OrderIcon from '../../images/OrderIcon.png';

type TOrderDetailsProps = { orderNumber: number };

function OrderDetails( { orderNumber }: TOrderDetailsProps ): React.JSX.Element {

  return (
    <div className={orderDetailssStyles.orderDetails} data-testid='orderModal'>
      <p className={`${orderDetailssStyles.orderNumber} text text_type_digits-large mb-8`}>
        {orderNumber}
      </p>
      <p className={`${orderDetailssStyles.numberText} text text_type_main-default mb-10`}>
        Идентификатор заказа
      </p>
      <img src={OrderIcon} alt="Заказ успешно оформлен"
        className={`${orderDetailssStyles.image} mb-10`}
      />
      <p className={`${orderDetailssStyles.text} text text_type_main-small mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${orderDetailssStyles.text} text text_type_main-small text_color_inactive mb-5`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;