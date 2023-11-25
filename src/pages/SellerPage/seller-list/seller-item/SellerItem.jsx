import { useState } from "react";
import styles from "./SellerItem.module.scss";
import { updateItemQuantity } from "../../../../store/additional/additional.slice";
import { useAppDispatch } from "../../../../hooks/redux";
import { getCookie } from "../../../../shared/Cookie";

const SellerItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const token = getCookie("token");
  const productId = item.id;
  const dispatch = useAppDispatch();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateQuantity = () => {
    dispatch(updateItemQuantity({ productId, productQuantity, token }));
  };

  return (
    <li className={styles.order_item}>
      <img src={item.image[0]} alt="product card" />
      <div className={styles.order_price}>
        <h4>수량</h4>
        <input
          type="number"
          min="0"
          step={1}
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleUpdateQuantity}>수량 수정</button>
      </div>
    </li>
  );
};

export default SellerItem;
