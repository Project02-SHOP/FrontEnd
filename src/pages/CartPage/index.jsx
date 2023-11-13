import CartEmpty from "../../components/cartEmpty/CartEmpty";
import CartList from "./cart-list/CartList";
import Checkout from "./checkout/Checkout";

const CartPage = () => {
  return (
    <div className="page">
      <CartEmpty title="Cart" />
      <div className="container">
        <h1>장바구니</h1>
        <CartList />
        <Checkout />
      </div>
    </div>
  );
};

export default CartPage;
