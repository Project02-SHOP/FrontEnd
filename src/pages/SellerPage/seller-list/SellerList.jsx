import { useEffect } from "react";
import styles from "./SellerList.module.scss";
import SellerItem from "./seller-item/SellerItem";
import { bringMyItem } from "../../../store/additional/additional.slice";
import { additionalSlice } from "../../../store/additional/additional.slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const SellerList = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.additionalSlice);

  useEffect(() => {
    dispatch(bringMyItem(userId));
  }, [dispatch, userId, SellerItem]);

  return (
    <div className={styles.orders}>
      <ul className={styles.orders_list}>
        {product &&
          product.map((product) => (
            <SellerItem key={product.id} item={product} />
          ))}
      </ul>
    </div>
  );
};

export default SellerList;
