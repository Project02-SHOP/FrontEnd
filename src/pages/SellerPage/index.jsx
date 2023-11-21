import { useParams } from "react-router-dom";
import SellerList from "./seller-list/SellerList";

const SellerPage = () => {
  const { userId } = useParams();

  return (
    <div className="page">
      <div className="container">
        <h1>나의 판매 정보</h1>
        <SellerList userId={userId} />
      </div>
    </div>
  );
};

export default SellerPage;
