import { Link } from "react-router-dom";
import styles from "./CardItem.module.scss";

const CardItem = ({ item }) => {
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.productId}`}>
        <img
          src={item.image}
          width={"80%"}
          height={"200px"}
          alt="product card"
        />
      </Link>
      <h5>{item.productName.substring(0, 15)}</h5>
      <p>$ {item.price}</p>
    </li>
  );
};

export default CardItem;
