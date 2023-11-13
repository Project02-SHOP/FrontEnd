import styles from "./CardItem.module.scss";

const CardItem = () => {
  return (
    <li className={styles.card_item}>
      <img
        src="/img/detail_img.jpg"
        width={"80%"}
        height={"200px"}
        alt="product card"
      />

      <h5>아이템타이틀</h5>
      <div>
        <button>장바구니에 담긴 제품</button>
        <p>$ 아이템 가격</p>
      </div>
    </li>
  );
};

export default CardItem;
