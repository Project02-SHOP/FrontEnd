import { useRef, useState } from "react";
import styles from "./FormAdditional.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { createProduct } from "../../store/additional/additional.slice";

const FormAdditional = () => {
  const img_ref = useRef(null);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [option, setOption] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [placeholder, setPlaceholder] =
    useState("이미지는 3장까지 가능합니다.");

  const encodeFileToBase64 = (files) => {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      reader.readAsDataURL(file);
      promises.push(promise);
    }
    return Promise.all(promises);
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

    const files = Array.from(e.target.files);
    encodeFileToBase64(files).then((encodedFiles) => {
      setImageSrc(encodedFiles);
    });
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

  const inputQuantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const inputOptionHandler = (e) => {
    setOption(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const product = {
  //     title,
  //     category,
  //     price,
  //     quantity,
  //     option,
  //     imageSrc,
  //   };

  //   dispatch(createProduct(product));

  //   console.log("img : ", imageSrc);
  //   console.log("title : ", title);
  //   console.log("category : ", category);
  //   console.log("price : ", price);
  //   console.log("quantity : ", quantity);
  //   console.log("option : ", option);
  //   setImageSrc([]);
  //   setTitle("");
  //   setCategory("");
  //   setPrice("");
  //   setQuantity("");
  //   setOption("");
  //   img_ref.current.value = "";
  //   setPlaceholder("이미지는 3장까지 가능합니다.");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      title,
      category,
      price,
      quantity,
      option,
      imageSrc,
    };

    dispatch(createProduct(product))
      .then((data) => {
        console.log("Product created:", data);
        setImageSrc([]);
        setTitle("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setOption("");
        img_ref.current.value = "";
        setPlaceholder("이미지는 3장까지 가능합니다.");
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        {imageSrc.length > 0 ? (
          <img src={imageSrc[0]} alt="preview-img" />
        ) : null}
      </div>
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
          name="quantity"
          min="0"
          placeholder="Item Quantity"
          required
          onChange={inputQuantityHandler}
          value={quantity}
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
