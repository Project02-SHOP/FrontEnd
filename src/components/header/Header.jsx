import styles from "./Header.module.scss";
import Nav from "./nav/Nav";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <div className={styles.header_logo}>
            <h2>NewShop</h2>
          </div>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;
