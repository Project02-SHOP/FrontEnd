import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchProducts } from "../../../store/products/products.slice";
import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";
import CardSkeleton from "../card-skeleton/CardSkeleton";

const CardList = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      {products.map((product) => (
        <CardItem key={product.productId} item={product} />
      ))}
    </ul>
  );
};

export default CardList;
