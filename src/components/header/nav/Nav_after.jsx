import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Nav.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { removeUser } from "../../../store/user/user.slice";
import { removeUserId } from "../../../store/cart/cart.slice";

// import { getAuth, signOut } from "firebase/auth";  //서버로직으로 바꿔주세요
// import app from "../../../firebase";//서버로직으로 바꿔주세요

const Nav = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const auth = getAuth(app); // 서버로직으로 바꿔주세요
  const { products } = useAppSelector((state) => state.cartSlice);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(removeUserId());
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link
              to={"/order"}
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
          {isAuth ? (
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
