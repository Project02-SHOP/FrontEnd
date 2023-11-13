import styles from "./DetailPage.module.scss";

const DetailPage = () => {
  return (
    <div className="page">
      {/* <Loader /> */}

      <div className={styles.card_wrapper}>
        <div className={styles.card_img}>
          <img src="제품이미지" alt="product card" />
        </div>
        <div className={styles.card_description}>
          <h3>제품카테고리</h3>
          <h1>제품타이틀</h1>

          <h4> $ 제품가격</h4>
          <p>제품설명</p>
          <div>
            <button>장바구니에 담기</button>
            장바구니로 이동
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
