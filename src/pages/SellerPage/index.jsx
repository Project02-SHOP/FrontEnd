import SellerList from "./seller-list/SellerList";

const SellerPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>나의 판매 정보</h1>
        <SellerList />
      </div>
    </div>
  );
};

export default SellerPage;
