import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import styles from "./Checkout.module.scss";
import { getTotalPrice, postOrder } from "../../../store/cart/cart.slice";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../hooks/useAuth";

const Checkout = () => {
  const cart = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart]);

  const sendOrder = () => {
    dispatch(postOrder(cart));
  };
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          {" "}
          <span>합계</span> $ {cart.totalPrice.toFixed(2)}
        </p>

        <button className={styles.checkout_button} onClick={() => sendOrder()}>
          계산하기
        </button>
      </div>
    </div>
  );
};

export default Checkout;
