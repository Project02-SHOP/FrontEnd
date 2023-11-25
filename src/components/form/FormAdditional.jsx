import { useRef, useState } from "react";
import styles from "./FormAdditional.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { createProduct } from "../../store/additional/additional.slice";
import { getCookie } from "../../shared/Cookie";

const FormAdditional = () => {
  const img_ref = useRef(null);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [option, setOption] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");
  const [placeholder, setPlaceholder] =
    useState("이미지는 3장까지 가능합니다.");
  const status = getCookie("status");

  //현재 날짜를 정하는 부분
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${date}`;

  //입력받은 image를 Base64로 인코딩하는 부분
  // const encodeFileToBase64 = (files) => {
  //   let promises = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();
  //     const promise = new Promise((resolve) => {
  //       reader.onload = () => {
  //         resolve(reader.result);
  //       };
  //     });
  //     reader.readAsDataURL(file);
  //     promises.push(promise);
  //   }
  //   return Promise.all(promises);
  // };

  const encodeFileToBase64 = (files) => {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const promise = new Promise((resolve) => {
        reader.onload = () => {
          let base64Data = reader.result;
          let pureBase64Data = base64Data.replace(/^data:.+;base64,/, "");
          resolve(pureBase64Data);
        };
      });
      reader.readAsDataURL(file);
      promises.push(promise);
    }
    return Promise.all(promises);
  };

  //onChange를 핸들링하는 부분
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

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const inputCategoryHandler = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const inputOptionHandler = (e) => {
    const options = e.target.value.split(",").map((option) => option.trim());
    setOption(options);
  };

  // const inputOptionHandler = (e) => {
  //   setOption(e.target.value);
  // };

  // 상품 등록을 클릭했을 때 이벤트 핸들링하는 부분
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory = category;

    const product = {
      productName: title,
      category: Number(selectedCategory),
      price: Number(price),
      productQuantity: Number(quantity),
      option,
      img1: "1234",
      img2: "1234",
      img3: "1234",
      saleEndDate: endDate,
      productDetail: desc,
      registerDate: today,
    };

    if (selectedCategory === 0) {
      alert("카테고리는 필수사항입니다.");
    } else {
      dispatch(createProduct({ product, status }))
        .then(() => {
          // console.log("Product created:", data);
          console.log(product);
          setImageSrc([]);
          setTitle("");
          setCategory(0);
          setPrice("");
          setQuantity("");
          setOption([]);
          setEndDate("");
          setDesc("");
          img_ref.current.value = "";
          setPlaceholder("이미지는 3장까지 가능합니다.");
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContents}>
        <div className={styles.formLeft}>
          {/* 미리보기 이미지 구현 */}
          <div>
            {imageSrc.length > 0 ? (
              <div className={styles.formPreview}>
                <img
                  src={`data:image/jpeg;base64,${imageSrc[0]}`}
                  alt="preview-img"
                />
              </div>
            ) : (
              <div className={styles.formPreview}></div>
            )}
          </div>
          <div>
            {/* 이미지 업로드 구현 */}
            <input placeholder={placeholder} disabled />
            <label htmlFor="itemImg" className={styles.label}>
              업로드
            </label>
          </div>
        </div>
        <div className={styles.formRight}>
          {/* 판매 상품 타이틀 구현 */}
          <div className={styles.labelHint}>
            <label>Item Title</label>
          </div>
          <input
            type="text"
            name="title"
            required
            onChange={handleInputChange(setTitle)}
            value={title}
          />
          {/* 판매 상품 카테고리 구현 */}
          <div className={styles.labelHint}>
            <label>Item Category</label>
          </div>
          <select
            name="category"
            value={category}
            onChange={inputCategoryHandler}
          >
            <option value={0}></option>
            <option value={1}>남성 의류</option>
            <option value={2}>여성 의류</option>
          </select>
          {/* 판매 상품 가격 구현 */}
          <div className={styles.labelHint}>
            <label>Item Price</label>
          </div>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            onChange={handleInputChange(setPrice)}
            value={price}
          />
          {/* 판매 상품 개수 구현 */}
          <div className={styles.labelHint}>
            <label>Item Quantity</label>
          </div>
          <input
            type="number"
            name="quantity"
            min="0"
            required
            onChange={handleInputChange(setQuantity)}
            value={quantity}
          />
          {/* 옵션 입력 구현 */}
          <div className={styles.labelHint}>
            <label>Item Option</label>
          </div>
          <input
            type="text"
            name="option"
            required
            onChange={inputOptionHandler}
            value={option}
          />
          {/* 판매 종료 날짜 구현 */}
          <div className={styles.labelHint}>
            <label>End date of item sale</label>
          </div>
          <input
            className="endDate"
            type="date"
            name="endDate"
            id="endDate"
            required
            onChange={handleInputChange(setEndDate)}
            value={endDate}
            min={today}
          />

          {/* 상품설명 구현 */}
          <div className={styles.labelHint}>
            <label>Item Description</label>
          </div>
          <input
            type="text"
            name="desc"
            required
            onChange={handleInputChange(setDesc)}
            value={desc}
          />
          <button>상품등록</button>
        </div>
      </div>

      <div className={styles.itemImg}>
        {/* <input
          type="file"
          name="image"
          ref={img_ref}
          multiple="multiple"
          accept=".jpg, .jpeg, .png"
          id="itemImg"
          className="itemImg"
          // required
          onChange={inputImgHandler}
        /> */}
      </div>
    </form>
  );
};

export default FormAdditional;
