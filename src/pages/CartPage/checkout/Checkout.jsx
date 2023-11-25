import { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../hooks/useAuth";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // 장바구니 정보를 가져오는 함수
  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCart(response.data);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("장바구니 정보를 가져오는 중 에러가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const sendOrder = async () => {
    try {
      const response = await axios.post("/api/order", cart);
      if (response.status === 200) {
        alert("주문이 성공적으로 접수되었습니다!");
      }
    } catch (error) {
      console.error("주문을 보내는 중 에러가 발생했습니다:", error);
    }
  };
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          {" "}
          <span>합계</span> $ {totalPrice.toFixed(2)}
        </p>

        <button className={styles.checkout_button} onClick={sendOrder}>
          계산하기
        </button>
      </div>
    </div>
  );
};

export default Checkout;
