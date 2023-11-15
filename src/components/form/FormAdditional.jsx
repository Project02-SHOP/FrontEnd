import React, { useRef, useState } from "react";
import styles from "./FormAdditional.module.scss";

const FormAdditional = () => {
  const img_ref = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [option, setOption] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [placeholder, setPlaceholder] =
    useState("이미지는 3장까지 가능합니다.");

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
    if (img_ref.current.value !== "") {
      const fileName = img_ref.current.value;
      setPlaceholder(fileName);
      if (e.target.files.length >= 4) {
        alert("최대 3개의 이미지만 선택할 수 있습니다.");
        e.target.value = "";
        return;
      }
    }
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

  const inputCountHandler = (e) => {
    setCount(e.target.value);
  };

  const inputOptionHandler = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("img : ", imageSrc);
    console.log("title : ", title);
    console.log("category : ", category);
    console.log("price : ", price);
    console.log("color : ", color);
    console.log("option : ", option);
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
        <input placeholder={placeholder} disabled />
        <label htmlFor="itemImg" className={styles.label}>
          업로드
        </label>

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
          min="0"
          step="1"
          placeholder="Item Price"
          required
          onChange={inputPriceHandler}
          value={price}
        />
        <input
          type="number"
          name="count"
          min="0"
          placeholder="Item Count"
          required
          onChange={inputCountHandler}
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
        <div className={styles.itemImg}>
          <input
            type="file"
            name="image"
            ref={img_ref}
            multiple="multiple"
            accept=".jpg, .jpeg, .png"
            id="itemImg"
            className="itemImg"
            required
            onChange={inputImgHandler}
          />
        </div>
      </div>
    </form>
  );
};

export default FormAdditional;
