import styles from "./Form.module.scss";

const Form = () => {
  return (
    <form className={styles.form}>
      <div>
        <input type="email" placeholder="E-mail" />

        {/* <div>
          <span className={styles.form_error}>에러메시지를 보여줍니다</span>
        </div> */}
      </div>
      <div>
        <input type="password" placeholder="Password" />

        {/* <div>
          <span className={styles.form_error}>에러메시지를 보여줍니다</span>
        </div> */}
      </div>
      <button type="submit">제출</button>

      {/* <span className={styles.form_error}>에러메시지를 보여줍니다</span> */}
    </form>
  );
};

export default Form;
