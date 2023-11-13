import styles from "./CartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = () => {
  return (
    <div className={styles.cart_item}>
      <img src="이미지" alt="product card" />

      <div className={styles.cart_description}>
        <h3>이미지카테고리</h3>
        <h2>아이템타이틀</h2>
        <span>아이템총가격</span>
      </div>

      <div className={styles.cart_count}>
        <div>
          <button>-</button>
          <span>아이템량</span>
          <button>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default CartItem;
