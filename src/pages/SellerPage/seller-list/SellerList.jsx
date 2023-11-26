import { useEffect } from "react";
import styles from "./SellerList.module.scss";
import SellerItem from "./seller-item/SellerItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { bringMyItem } from "../../../store/additional/additional.slice";

const SellerList = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.additionalSlice);

  useEffect(() => {
    dispatch(bringMyItem());
  }, [product.productQuantity]);

  return (
    <div className={styles.orders}>
      <ul className={styles.orders_list}>
        {product &&
          product.map((item) => (
            <SellerItem key={item.productId} product={item} />
          ))}
      </ul>
    </div>
  );
};

export default SellerList;
