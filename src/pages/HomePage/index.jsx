import FiltersCategory from "./filters-category/FiltersCategory";
import CardList from "./card-list/CardList";
import CountProducts from "./count-products/CountProducts";
import MainSwiper from "../../components/Swiper/MainSwiper";
import { useAppDispatch } from "../../hooks/redux";
import {
  bringMyItem,
  updateItemQuantity,
} from "../../store/additional/additional.slice";

const HomePage = () => {
  const productId = "33";
  const productQuantity = Number(15);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZWxsZXIxMjNAbmF2ZXIuY29tIiwicm9sZSI6IlNFTExFUiIsImlhdCI6MTcwMDgzNzAyNiwiZXhwIjoxNzAxNDQxODI2fQ.MrkebdywHuv98wFLzJGt3sd0cNEJbUT2dnfuJ_lVqnE";
  const userId = "seller123@naver.com";
  const dispatch = useAppDispatch();

  const test = () => {
    dispatch(updateItemQuantity({ productId, productQuantity, token }));
    dispatch(bringMyItem({ userId, token }));
  };

  const handleUpdateQuantity = () => {
    dispatch(bringMyItem());
  };
  return (
    <div className="page">
      <MainSwiper />
      <div className="container">
        <h1>Products</h1>
        <FiltersCategory />
        <CountProducts />
        <CardList />
        <button onClick={handleUpdateQuantity}>test</button>
      </div>
    </div>
  );
};

export default HomePage;
