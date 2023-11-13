import styles from "./NavCartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

const NavCartItem = () => {
  return (
    <div className={styles.nav_cart_item}>
      <img src="#" alt="product cart" />

      <div className={styles.nav_cart_description}>
        <h3>아이템카테고리</h3>
        <h2>아이템타이틀</h2>
        <span>총가격을 보여줍니다</span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default NavCartItem;
