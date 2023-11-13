import OrdersList from "./orders-list/OrdersList";

const OrderPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>주문 히스토리</h1>
        <OrdersList />
      </div>
    </div>
  );
};

export default OrderPage;
