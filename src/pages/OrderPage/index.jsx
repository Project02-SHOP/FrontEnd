// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import MyInfo from "../MyPage/MyPage/MyInfo";
import OrdersList from "./orders-list/OrdersList";

const OrderPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>나의 정보</h1>
        <MyInfo />
        <h1>주문 히스토리</h1>
        <OrdersList />
      </div>
    </div>
  );
};

export default OrderPage;
