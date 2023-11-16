import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../../shared/apis/Apis";
import { deleteCookie } from "../../../shared/Cookie";
import styles from "./Mypage.module.scss";

const Mypage = () => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteUser = async () => {
    try {
      const response = await api.delete("/api/user/delete");
      console.log(response.data);
      setIsDeleted(true);
      deleteCookie("Authorization", response.data.token);
      deleteCookie("nickname", response.data.nickname);
      deleteCookie("profileimage", response.data.profileimage);
      deleteCookie("email", response.data.email);
      deleteCookie("password", response.data.password);
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      // 오류 처리 (예: 오류 메시지 표시 등)
    }
  };

  return (
    <div className={styles.mypage_wrapper}>
      <div>
        <h2>장바구니 조회</h2>
        <div>
          <Link to="cart">장바구니 이동</Link>
        </div>
      </div>
      <div>
        <div>유저 정보 조회</div>
        <div>
          <div>유저 아이디(email)</div>
          <div>유저 프로필이미지</div>
          <div>유저 닉네임</div>
          <div>유저 주소</div>
        </div>
      </div>
      <div>
        <div>구매내역 조회 / 판매내역 조회</div>
      </div>

      <div>
        <div>회원 탈퇴</div>
        <div>
          {isDeleted ? (
            <p>회원 탈퇴가 완료되었습니다.</p>
          ) : (
            <>
              <p>회원 탈퇴하시겠습니까?</p>
              <button onClick={deleteUser}>회원 탈퇴</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
