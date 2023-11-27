import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./DetailPage.module.scss";
import Loader from "../../components/loader/Loader";
import { addToCart } from "../../store/cart/cart.slice";
import { fetchProduct } from "../../store/products/product.slice";
import { useAuth } from "../../hooks/useAuth";
import SelectBox from "../../components/selectBox/SelectBox";

const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const { is_login } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");
  // const [selectImg, setSelectImg] = useState(img1);
  const option = ["s", "m", "l", "xl"];

  const { product, isLoading } = useAppSelector((state) => state.productSlice); //store에서 product를 가져온다
  const { products } = useAppSelector((state) => state.cartSlice); // 장바구니에 있는 products도 가져온다
  const productMatching = products.some(
    (cartItem) => cartItem.id === product.id
  ); //장바구니에 하나라도 있으면 true반환

  useEffect(() => {
    dispatch(fetchProduct(productId)); //store에서 product를 가져온다
    // dispatch(fetchProduct({ product_id: productId }));
  }, [productId]);

  const addItemToCart = () => {
    if (is_login === false) {
      window.alert("로그인 후 이용가능합니다.");
    } else if (is_login === true) {
      try {
        dispatch(addToCart({ product_id: product.id }));
      } catch (error) {
        console.error("카트추가 에러", error);
      }
    }
  };

  const optionSelectHandler = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log(selectedOption.toLowerCase());
  console.log(productMatching);
  return (
    <div className="page">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product.image} alt="product card" />
            <ul className={styles.card_thumb}>
              <li className={styles.select}>
                <img src={product.img1} alt="product card" />
              </li>
              <li>
                <img src={product.img2} alt="product card" />
              </li>
              <li>
                <img src={product.img3} alt="product card" />
              </li>
            </ul>
          </div>

          <div className={styles.card_description}>
            {/* <h3>{product.category}</h3> */}
            {product.category === 1 ? (
              <h3>women's clothing</h3>
            ) : (
              <h3>men's clothing</h3>
            )}
            <h1>{product.title}</h1>
            <h4> $ {product.price}</h4>
            <p>{product.productDetail}</p>
            <p>남은 수량 : {product.productQuantity}</p>
            <div className={styles.option}>
              <div>
                <SelectBox onChange={optionSelectHandler} options={option} />
                <div className={styles.ic_caret}></div>
              </div>
            </div>
            <div>
              <button
                disabled={productMatching}
                onClick={() => !productMatching && addItemToCart()}
              >
                {!productMatching ? "장바구니에 담기" : "장바구니에 담긴 제품"}
              </button>
              {is_login ? (
                <Link to="/cart">장바구니로 이동</Link>
              ) : (
                <Link to="/login">로그인 후 이용하기</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailPage;
