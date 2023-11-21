import { useState } from "react";
import styles from "./SellerItem.module.scss";
import { updateItemQuantity } from "../../../../store/additional/additional.slice";

const SellerItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateQuantity = () => {
    updateItemQuantity(item.id, quantity);
  };

  return (
    <li className={styles.order_item}>
      <img src={item.image[0]} alt="product card" />
      <div className={styles.order_price}>
        <h4>수량</h4>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleUpdateQuantity}>수량 수정</button>
      </div>
    </li>
  );
};

export default SellerItem;
