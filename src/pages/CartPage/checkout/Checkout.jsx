import styles from "./Checkout.module.scss";

const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          {" "}
          <span>합계</span> $
        </p>
        <button className={styles.checkout_button}>계산하기</button>
        로그인
      </div>
    </div>
  );
};

export default Checkout;
