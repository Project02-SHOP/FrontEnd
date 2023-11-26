import { useEffect } from "react";
import styles from "./SellerList.module.scss";
import SellerItem from "./seller-item/SellerItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { bringMyItem } from "../../../store/additional/additional.slice";
import { Link } from "react-router-dom";

const SellerList = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.additionalSlice);

  useEffect(() => {
    dispatch(bringMyItem());
  }, [product.productQuantity]);

  return (
    <div className={styles.orders}>
      <ul className={styles.orders_list}>
        {!Array.isArray(product) || product.length === 0 ? (
          <div className={styles.order_item}>
            <h2>판매상품이 없습니다.</h2>
            <Link to={"/additional"}>상품등록하기</Link>
          </div>
        ) : (
          product.map((item) => (
            <SellerItem key={item.productId} product={item} />
          ))
        )}
      </ul>
    </div>
  );
};

export default SellerList;
