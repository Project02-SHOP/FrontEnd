import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contacts}>
          Copyright © Project02. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
