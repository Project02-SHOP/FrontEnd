import styles from "./NavCartList.module.scss";
import NavCartItem from "./nav-cart-item/NavCartItem";

const NavCartList = () => {
  return (
    <div className={styles.nav_cart_list}>
      <NavCartItem />;
    </div>
  );
};

export default NavCartList;
