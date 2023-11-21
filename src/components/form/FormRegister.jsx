import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FormRegister.module.scss";
import { emailCheck } from "../../shared/SignUpCheck";
import { api } from "../../shared/apis/Apis";

const FormRegister = () => {
  const img_ref = useRef(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState();
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [profileimage, setProfileimage] = useState("");
  const [placeholder, setPlaceholder] =
    useState("썸네일은 하나만 등록 가능합니다.");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileimage(reader.result);
        resolve();
      };
    });
  };

  const inputImgHandler = (e) => {
    if (img_ref.current.value !== "") {
      const fileName = img_ref.current.value;
      setPlaceholder(fileName);
      if (e.target.files.length > 1) {
        alert("썸네일은 하나만 선택 가능합니다.");
        e.target.value = "";
        return;
      }
    }
    if (e.target.files.length > 0) {
      encodeFileToBase64(e.target.files[0]);
    }
  };

  // 이메일 중복 체크
  const dupEmail = async (event) => {
    event.preventDefault();
    if (!emailCheck(email)) {
      return window.alert("이메일 형식을 지켜주세요.");
    } else {
      try {
        await api.post("/api/user/signup/dupEmail", { email });

        window.alert("사용 가능한 아이디 입니다.");
        setIsEmailAvailable(true);
      } catch (error) {
        window.alert("이미 사용중인 아이디 입니다.");
        setIsEmailAvailable(false);
        console.error("SignUp Error", error);
      }
    }
  };

  const Submit = async (event) => {
    event.preventDefault();
    if (!isEmailAvailable) {
      window.alert("이메일 중복 검사를 하셔야 합니다.");
      return;
    }
    if (
      email === "" ||
      nickname === "" ||
      password === "" ||
      confirmPassword === "" ||
      address === ""
    ) {
      window.alert("아이디,비밀번호,닉네임 및 주소지 모두를 입력해주세요!");
      return;
    }

    //이메일 형식 체크
    if (!emailCheck(email)) {
      window.alert("올바른 이메일 형식을 작성해주세요");
      return;
    }

    //비밀번호 일치 확인
    if (password !== confirmPassword) {
      window.alert("비밀번호가 일치하지 않습니다");
      return;
    }

    await api
      .post("/api/user/signup", {
        email,
        nickname,
        password,
        address,
        profileimage,
      })
      .then((res) => {
        console.log(res);
        window.alert("회원가입을 축하합니다!");
        navigate("/Login");
      })
      .catch((error) => {
        window.alert("아이디 또는 비밀번호를 확인해주세요.");
        console.log("회원가입 DB Error", error);
      });
  };

  return (
    <form className={styles.form}>
      <div>
        <input
          type="email"
          placeholder="이메일주소"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button onClick={dupEmail}>중복확인</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="닉네임"
          onChange={(event) => {
            setNickname(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호확인"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="주소입력란"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <div>
          {profileimage && <img src={profileimage} alt="preview-img" />}
        </div>
        <input placeholder={placeholder} disabled />
        <label htmlFor="itemImg" className={styles.label}>
          업로드
        </label>
        <div className={styles.itemImg}>
          <input
            type="file"
            name="image"
            ref={img_ref}
            accept=".jpg, .jpeg, .png"
            id="itemImg"
            className="itemImg"
            required
            onChange={inputImgHandler}
          />
        </div>
      </div>
      <button onClick={Submit}>회원가입</button>
    </form>
  );
};

export default FormRegister;
