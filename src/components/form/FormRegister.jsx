import styles from "./FormRegister.module.scss";

const FormRegister = () => {
  return (
    <form className={styles.form}>
      <div>
        <input type="email" placeholder="E-mail" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
        <input type="test" placeholder="Address" />
        <input
          type="file"
          id="profile_pic"
          name="profile_pic"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default FormRegister;
