import { React } from 'react';
import PropTypes from 'prop-types';
import orderDetailssStyles from './order-details.module.css';
import OrderIcon from '../../images/OrderIcon.png';

function OrderDetails( { orderNumber } ) {

  return (
    <div className={orderDetailssStyles.orderDetails}>
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

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
}; 

export default OrderDetails;