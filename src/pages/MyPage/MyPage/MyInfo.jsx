import { useEffect, useState } from "react";
import { apiToken } from "../../../shared/apis/Apis";
import { deleteCookie, getCookie } from "../../../shared/Cookie";
import styles from "./MyInfo.module.scss";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const MyInfo = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const status = getCookie("status");
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    profileimage: "",
    address: "",
  });

  console.log(userInfo);
  const navigator = useNavigate();

  const deleteUser = async () => {
    const email = getCookie("email");
    const password = getCookie("password");
    const token = getCookie("token");

    const requestData = {
      email: email,
      password: password,
    };
    try {
      const response = await apiToken.put("/api/user/delete", requestData, {
        headers: { "X-AUTH-TOKEN": ` ${token}` },
      });
      console.log(response.data);
      setIsDeleted(true);
      deleteCookie("token", response.data.token);
      deleteCookie("nickname", response.data.nickname);
      deleteCookie("profileimage", response.data.profileimage);
      deleteCookie("email", response.data.email);
      deleteCookie("password", response.data.password);
      deleteCookie("status", response.data.status);
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      // 오류 처리 (예: 오류 메시지 표시 등)
    }
  };
  const fetchUserInfo = async () => {
    try {
      const res = await apiToken.get("/api/mypage/info");
      setUserInfo(res.data);
    } catch (error) {
      console.error("유저 정보 가져오기 오류:", error);
      // 사용자에게 알리기 위해 오류 메시지를 표시하거나 다른 처리를 추가할 수 있음
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className={styles.myInfoCon}>
      <li className={styles.my_info}>
        <div className={styles.profile}>
          {userInfo.profileimage && (
            <img src={userInfo.profileimage} alt="Profile" />
          )}
        </div>
        <div className={styles.info_description}>
          <h4>{userInfo.nickname}님 반갑습니다</h4>
          <h3>
            {" "}
            <MdOutlineMarkEmailRead /> {userInfo.email}email
          </h3>
          <h3>
            {" "}
            <RiHome4Line /> {userInfo.address}주소지
          </h3>
        </div>

        {status === "SELLER" ? (
          <div className={styles.info_quit}>
            <h4>판매 상품</h4>
            <button onClick={() => navigator(`/seller/${userInfo.email}`)}>
              수량 수정
            </button>
          </div>
        ) : null}

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
