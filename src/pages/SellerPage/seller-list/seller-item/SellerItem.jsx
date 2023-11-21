import styles from "./OrderItem.module.scss";

const SellerItem = () => {
  return (
    <li className={styles.order_item}>
      <img src="주문이미지" alt="product card" />

      <div className={styles.order_description}>
        <h4>주문카테고리</h4>
        <h3>주문타이틀</h3>
      </div>
      <div className={styles.order_price}>
        <h4>가격 :</h4>
        <span>$ 주문가격 x 주문갯수 </span>
      </div>
      <div className={styles.order_total}>
        <h4>합계 : </h4>
        <span>$ 주문합계</span>
      </div>
    </li>
  );
};

export default SellerItem;
