import React from "react";
import Option from "./option/Option";

const SelectBox = (props) => {
  return (
    <select>
      {props.map((props) => (
        <Option key={props.id} option={props.option} />
      ))}
    </select>
  );
};

export default SelectBox;
