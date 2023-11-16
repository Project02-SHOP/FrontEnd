import MyInfo from "../MyPage/MyPage/MyInfo";
import OrdersList from "./orders-list/OrdersList";

const OrderPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>주문 히스토리</h1>
        <OrdersList />
        <h1>나의 정보</h1>
        <MyInfo />
      </div>
    </div>
  );
};

export default OrderPage;
