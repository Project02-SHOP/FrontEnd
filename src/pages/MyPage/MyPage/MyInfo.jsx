import { useState } from "react";
import { api } from "../../../shared/apis/Apis";
import { deleteCookie, getCookie } from "../../../shared/Cookie";
import styles from "./MyInfo.module.scss";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
// import { CgUserlane } from "react-icons/cg";
const MyInfo = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const nickname = getCookie("nickname");
  const email = getCookie("email");
  console.log(email);

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
    <div>
      <li className={styles.my_info}>
        <div className={styles.profile}></div>
        <div className={styles.info_description}>
          <h4>{nickname}님 반갑습니다</h4>
          <h3>
            {" "}
            <MdOutlineMarkEmailRead /> {email}
          </h3>
          <h3>
            {" "}
            <RiHome4Line /> 제주도 제주도 제주도 제주도
          </h3>
        </div>

        <div className={styles.info_quit}>
          <h4>회원 탈퇴</h4>
          <span>
            {isDeleted ? (
              <p>회원 탈퇴가 완료되었습니다.</p>
            ) : (
              <>
                <p>회원 탈퇴하시겠습니까?</p>
                <button onClick={deleteUser}>회원 탈퇴</button>
              </>
            )}
          </span>
        </div>
      </li>

      <div></div>
    </div>
  );
};

export default MyInfo;
