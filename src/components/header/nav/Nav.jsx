import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Nav.module.scss";

import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

const Nav = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link
              to={"/cart"}
              style={{ textDecoration: "none", color: "black" }}
            >
              {""}
              <FiShoppingCart />
            </Link>
            {products.length > 0 && <b>{products.length}</b>}
            {products.length > 0 && (
              <div className={styles.nav_hover_cart}>
                <NavCartBlock />
              </div>
            )}
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
