import { useState } from "react";
import styles from "./SellerItem.module.scss";
import { updateItemQuantity } from "../../../../store/additional/additional.slice";
import { useAppDispatch } from "../../../../hooks/redux";

const SellerItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.productQuantity);
  const productId = product.productId;
  const dispatch = useAppDispatch();

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleUpdateQuantity = () => {
    dispatch(updateItemQuantity({ productId, productQuantity: quantity }));
  };

  return (
    <li className={styles.order_item}>
      <img src={product.img1} alt="product-card" />
      <div className={styles.order_title}>
        <h3>{product.productName}</h3>
        <h4>price : {product.price}</h4>
      </div>
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
