import React from "react";
import Option from "./option/Option";
import styles from "./SelectBox.module.scss";

const SelectBox = ({ options, onChange }) => {
  return (
    <select
      className={styles.form_select}
      name="product-1"
      id="product-1"
      required
      onChange={onChange}
    >
      {options.map((option) => (
        <Option key={option} value={option.toUpperCase()} />
      ))}
    </select>
  );
};

export default SelectBox;
