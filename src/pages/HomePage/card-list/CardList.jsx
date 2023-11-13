import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";

const CardList = () => {
  // if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      <CardItem />
    </ul>
  );
};

export default CardList;
