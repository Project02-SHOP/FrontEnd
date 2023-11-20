import styles from "./Form.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginDB } from "../../store/user/user.slice";
import { emailCheck } from "../../shared/SignUpCheck";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((user) => user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    dispatch(loginDB({ email, password }));
  };

  useEffect(() => {
    console.log(user);
    //user에 모든 redux toolkit의 slice가 포함되어 있음
    if (user.userSlice.is_login === true) {
      navigate("/");
    }
  }, [user.userSlice.is_login]);

  return (
    <form className={styles.form}>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={login}>제출</button>
    </form>
  );
};

export default Form;
