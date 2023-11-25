import { useEffect } from "react";
import styles from "./SellerList.module.scss";
import SellerItem from "./seller-item/SellerItem";
import { bringMyItem } from "../../../store/additional/additional.slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const SellerList = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.additionalSlice.product);

  useEffect(()=> {
    dispatch(bringMyItem());
  },[])

  console.log(product);
  return (
    <div className={styles.orders}>
      <ul className={styles.orders_list}>      
        {product &&
          product.map((item) => <SellerItem key={product.id} product={item} />)}
      </ul>
    </div>
  );
};

export default SellerList;
