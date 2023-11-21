import styles from "./SellerList.module.scss";
import SellerItem from "./seller-item/SellerItem";

const SellerList = () => {
  return (
    <div className={styles.orders}>
      <div>
        <div className={styles.order_header}>
          <h3>주문 번호</h3>
          <p>합계: $</p>
        </div>
        <ul className={styles.orders_list}>
          <SellerItem />
        </ul>
      </div>
    </div>
  );
};

export default SellerList;
