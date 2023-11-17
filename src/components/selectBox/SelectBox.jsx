import React from "react";
import Option from "./Option";

const SelectBox = ({ options }) => {
  return (
    <select>
      {options.map((option) => (
        <Option key={option.id} value={option.option} />
      ))}
    </select>
  );
};

export default SelectBox;
