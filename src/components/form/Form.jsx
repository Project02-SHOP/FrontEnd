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

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    if (email === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    dispatch(loginDB(email, password));
  };

  // useEffect(() => {
  //   console.log(user);
  //   if (user.user.is_login === true) {
  //     navigate("/");
  //   }
  // }, [user.is_login]);

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

        {/* <div>
          <span className={styles.form_error}>에러메시지를 보여줍니다</span>
        </div> */}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        {/* <div>
          <span className={styles.form_error}>에러메시지를 보여줍니다</span>
        </div> */}
      </div>
      <button onClick={login}>제출</button>

      {/* <span className={styles.form_error}>에러메시지를 보여줍니다</span> */}
    </form>
  );
};

export default Form;
