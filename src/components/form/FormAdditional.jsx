import React, { useState } from "react";
import styles from "./FormAdditional.module.scss";

const FormAdditional = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [option, setOption] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const inputImgHandler = (e) => {
    if (e.target.files.length > 0) {
      encodeFileToBase64(e.target.files[0]);
    }
  };
  const inputTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const inputCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const inputPriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const inputColorHandler = (e) => {
    setColor(e.target.value);
  };

  const inputOptionHandler = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("img : ", imageSrc);
    console.log("title : ", title);
    console.log("category : ", category);
    console.log("price : ", price);
    console.log("color : ", color);
    console.log("option : ", option);
    e.preventDefault();
    setImageSrc("");
    setTitle("");
    setCategory("");
    setPrice("");
    setColor("");
    setOption("");
    e.target.itemImg.value = "";
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>{imageSrc && <img src={imageSrc} alt="preview-img" />}</div>
      <div>
        <input
          type="file"
          name="image"
          multiple="multiple"
          accept=".jpg, .jpeg, .png"
          id="itemImg"
          required
          onChange={inputImgHandler}
        />
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          required
          onChange={inputTitleHandler}
          value={title}
        />
        <input
          type="text"
          name="category"
          placeholder="Item Category"
          required
          onChange={inputCategoryHandler}
          value={category}
        />
        <input
          type="number"
          name="price"
          placeholder="Item Price"
          required
          onChange={inputPriceHandler}
          value={price}
        />
        <input
          type="text"
          name="color"
          placeholder="Item Color"
          required
          onChange={inputColorHandler}
          value={color}
        />
        <input
          type="text"
          name="option"
          placeholder="Item Option"
          required
          onChange={inputOptionHandler}
          value={option}
        />
        <button>상품등록</button>
      </div>
    </form>
  );
};

export default FormAdditional;
