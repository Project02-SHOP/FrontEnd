import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Nav.module.scss";

import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { BsFillPencilFill } from "react-icons/bs";
import { useAuth } from "../../../hooks/useAuth";
import { logoutDB } from "../../../store/user/user.slice";
import { getCookie } from "../../../shared/Cookie";

const Nav = () => {
  let { is_login } = useAuth();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cartSlice);

  const handleSignOut = () => {
    const token = getCookie("token")
    is_login = false;
    dispatch(logoutDB(token));
  };

  const loginAlert = () => alert("로그인 후 이용가능합니다.");

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            {is_login ? (
              <Link
                to={"/cart"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {""}
                <FiShoppingCart />
              </Link>
            ) : (
              <FiShoppingCart onClick={loginAlert} />
            )}
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
            {is_login ? (
              <Link
                to={"/order"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {""}
                <FiUser title="주문" />
              </Link>
            ) : (
              <FiUser title="주문" onClick={loginAlert} />
            )}
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
