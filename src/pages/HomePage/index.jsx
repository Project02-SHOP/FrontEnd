import FiltersCategory from "./filters-category/FiltersCategory";
import CardList from "./card-list/CardList";
import CountProducts from "./count-products/CountProducts";
import MainSwiper from "../../components/Swiper/MainSwiper";

const HomePage = () => {
  return (
    <div className="page">
      <MainSwiper />
      <div className="container">
        <h1>Products</h1>
        <FiltersCategory />
        <CountProducts />
        <CardList />
      </div>
    </div>
  );
};

export default HomePage;
