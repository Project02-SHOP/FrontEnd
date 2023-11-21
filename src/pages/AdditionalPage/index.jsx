// import React from "react";
import Additional from "./additional/Additional";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="page">
      <div className="form_container_additional">
        <h1>새로운 상품 등록</h1>
        <Additional />
        <p>
          <Link to={"/"}>홈으로 이동하기</Link>
        </p>
      </div>
    </div>
  );
};

export default index;
