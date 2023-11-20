import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  deleteFromCartDB,
  updateCartItemQuantity,
} from "../../../../store/cart/cart.slice";
import styles from "./CartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = ({ item }) => {
  
  const dispatch = useAppDispatch();
  console.log(item);

  const deleteProduct = () => {
    dispatch(deleteFromCartDB(item.id));
  };

  const incrementCount = () => {
    dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity + 1 }));
  };

  const decrementCount = () => {
    dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity - 1 }));
  };
  return (
    <div className={styles.cart_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt="product card" />
      </Link>
      <div className={styles.cart_description}>
        <h3>{item.category}</h3>
        <h2>{item.title}</h2>
        <span>
          {item.price} X {item.quantity} = ${item.total.toFixed(2)}
        </span>
      </div>

      <div className={styles.cart_count}>
        <div>
          <button disabled={item.quantity === 1} onClick={decrementCount}>
            -
          </button>
          <span>{item.quantity}</span>
          <button disabled={item.quantity === 10} onClick={incrementCount}>
            +
          </button>
        </div>
      </div>
      <button className={styles.cart_delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default CartItem;
