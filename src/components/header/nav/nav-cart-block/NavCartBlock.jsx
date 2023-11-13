import styles from "./NavCartBlock.module.scss";
import NavCartList from "./nav-cart-list/NavCartList";

const NavCartBlock = () => {
  return (
    <div className={styles.nav_cart_block}>
      <NavCartList />
      <div className={styles.nav_cart_price}>
        <p>합계: $ </p>
      </div>
      <div className={styles.nav_cart_link}>장바구니로 이동</div>
    </div>
  );
};

export default NavCartBlock;
