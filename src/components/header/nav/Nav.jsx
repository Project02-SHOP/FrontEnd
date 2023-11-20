import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Nav.module.scss";

import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { BsFillPencilFill } from "react-icons/bs";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../shared/apis/Apis";
import { logOut, removeUser } from "../../../store/user/user.slice";

const Nav = () => {
  const { is_login } = useAuth();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cartSlice);

  const handleSignOut = async () => {
    try {
      await api.post("/api/user/logout");
      dispatch(removeUser());
      dispatch(logOut());
    } catch (error) {
      console.error(error);
    }
  };

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
            <Link
              to={"/order"}
              style={{ textDecoration: "none", color: "black" }}
            >
              {""}
              <FiUser title="주문" />
            </Link>
          </div>
        </li>
        <li>
          {/* user && user.isAdmin && 일때만 등록페이지 */}
          <Link
            to="/additional"
            style={{ textDecoration: "none", color: "black" }}
          >
            <BsFillPencilFill />
          </Link>
        </li>
        <li>
          {is_login === true ? (
            <VscSignOut
              className={styles.nav_sign_out}
              onClick={handleSignOut}
              title="로그아웃"
            />
          ) : (
            <Link
              to={"./login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <FiLogIn title="로그인" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
