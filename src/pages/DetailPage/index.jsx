import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./DetailPage.module.scss";
import Loader from "../../components/loader/Loader";
import { addToCart } from "../../store/cart/cart.slice";
import { fetchProduct } from "../../store/products/product.slice";

const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { product, isLoading } = useAppSelector((state) => state.productSlice);
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products.some((product) => product.id === product.id);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId]);

  const addItemToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="page">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product.image} alt="product card" />
            <ul className={styles.card_thumb}>
              <li>{product.image[0]}</li>
              <li>{product.image[1]}</li>
              <li>{product.image[2]}</li>
            </ul>
          </div>

          <div className={styles.card_description}>
            <h3>{product.category}</h3>
            <h1>{product.title}</h1>
            <h4> $ {product.price}</h4>
            <p>{product.description}</p>
            <div className={styles.option}>
              <div className={styles.option_sel}></div>
              <div className={styles.option_sel}></div>
            </div>
            <div>
              <button
                disabled={!productMatching}
                onClick={() => productMatching && addItemToCart()}
              >
                {productMatching ? "장바구니에 담기" : "장바구니에 담긴 제품"}
              </button>
              <Link to={"/cart"}>장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailPage;
