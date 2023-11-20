import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addToCart } from "../../../../store/cart/cart.slice";
import styles from "./CardItem.module.scss";
import { useAuth } from "../../../../hooks/useAuth";

const CardItem = ({ item }) => {
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products.some((product) => product.id === item.id);
  const { is_login } = useAuth();

  const dispatch = useAppDispatch();
  const addItemToCart = () => {
    if (is_login === false) {
      alert("로그인 후 이용가능합니다.");
    } else if (is_login === true) {
      dispatch(addToCart(item));
    }
  };
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          width={"80%"}
          height={"200px"}
          alt="product card"
        />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <p>$ {item.price}</p>
      <div>
        <button
          disabled={productMatching}
          onClick={() => !productMatching && addItemToCart()}
        >
          {productMatching ? "장바구니에 담긴 제품" : "장바구니에 담기"}
        </button>
      </div>
    </li>
  );
};

export default CardItem;
