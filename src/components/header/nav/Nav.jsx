import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Nav.module.scss";

import NavCartBlock from "./nav-cart-block/NavCartBlock";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <FiShoppingCart />
            <div className={styles.nav_hover_cart}>
              <NavCartBlock />
            </div>
          </div>
        </li>
        <li>
          <div className={styles.counter}>
            <FiUser title="주문" />
          </div>
        </li>
        <li>
          <VscSignOut className={styles.nav_sign_out} title="로그아웃" />
          <FiLogIn title="로그인" />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
