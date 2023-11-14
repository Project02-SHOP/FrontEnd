import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../../hooks/redux";
import styles from "./NavCartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteFromCart } from "../../../../../../store/cart/cart.slice";

const NavCartItem = ({ products }) => {
  const dispatch = useAppDispatch();
  const deleteProduct = () => {
    dispatch(deleteFromCart(products.id));
  };
  return (
    <div className={styles.nav_cart_item}>
      <Link to={`/product/${products.id}`}>
        {" "}
        <img src={products.image} alt="product cart" />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{products.category}</h3>
        <h2>{products.title}</h2>
        <span>
          {products.price} x {products.quantity} = $ {products.total.toFixed(2)}
        </span>
      </div>
      <button onClick={deleteProduct} className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default NavCartItem;
