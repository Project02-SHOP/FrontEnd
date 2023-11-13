import CartItem from "./cart-item/CartItem";
import styles from "./CartList.module.scss";

const CartList = () => {
  return (
    <div className={styles.cart_list}>
      <CartItem />
    </div>
  );
};

export default CartList;
