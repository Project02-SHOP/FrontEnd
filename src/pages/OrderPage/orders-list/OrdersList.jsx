import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";

const OrdersList = () => {
  return (
    <div className={styles.orders}>
      <div>
        <div className={styles.order_header}>
          <h3>주문 번호</h3>
          <p>합계: $</p>
        </div>
        <ul className={styles.orders_list}>
          <OrderItem />
        </ul>
      </div>
    </div>
  );
};

export default OrdersList;
