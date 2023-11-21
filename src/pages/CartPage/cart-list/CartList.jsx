import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CartItem from "./cart-item/CartItem";
import styles from "./CartList.module.scss";
import { getCart } from "../../../store/cart/cart.slice";

const CartList = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cartSlice);
  console.log(products)
  
  useEffect(()=> {
    dispatch(getCart());
  },[dispatch])

  return (
    <div className={styles.cart_list}>
      {products.map((product) => (
        <CartItem key={product.id} item={product} />
      ))}
    </div>
  );
};

export default CartList;
