import { useState } from "react";
import styles from "./SellerItem.module.scss";
import { updateItemQuantity } from "../../../../store/additional/additional.slice";
import { useAppDispatch } from "../../../../hooks/redux";

const SellerItem = ({ product: { id, productQuantity, img1 } }) => {
  const [quantity, setQuantity] = useState(productQuantity);
  const productId = id;
  const dispatch = useAppDispatch();

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateQuantity = () => {
    dispatch(updateItemQuantity({ productId, productQuantity: quantity }));
  };

  return (
    <li className={styles.order_item}>
      <img src={img1} alt="product-card" />
      <div className={styles.order_price}>
        <h4>수량</h4>
        <div>수량 : {quantity}</div>
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
