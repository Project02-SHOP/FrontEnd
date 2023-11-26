import { useRef, useState } from "react";
import styles from "./FormAdditional.module.scss";
import { useAppDispatch } from "../../hooks/redux";
import { createProduct } from "../../store/additional/additional.slice";
import { getCookie } from "../../shared/Cookie";

const FormAdditional = () => {
  const img_ref = useRef(null);
  const endDate_ref = useRef(null);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [option, setOption] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");
  const [placeholder, setPlaceholder] =
    useState("이미지는 3장까지 가능합니다.");
  const status = getCookie("status");
  const token = getCookie("token");

  console.log(status);

  //현재 날짜를 정하는 부분
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  const today = `${year}-${month}-${date}T${hour}:${min}:${sec}`;
  // console.log(today);

  // 이미지를 서버에 업로드하는 함수
  // 이 함수는 실제 서버의 API 엔드포인트와 요청 메서드, 요청 헤더, 요청 본문 등에 따라 달라질 수 있습니다.
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return fetch("h", {
      // '/api/upload'는 실제 업로드 API 엔드포인트로 바꾸어야 합니다.
      method: "POST", // 메서드는 실제 업로드 API의 요청 메서드로 바꾸어야 합니다.
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => data.imageUrl); // 'imageUrl'은 서버가 응답으로 반환하는 이미지 URL의 키로 바꾸어야 합니다.
  };

  // onChange를 핸들링하는 부분
  const inputImgHandler = async (e) => {
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
    const promises = files.map(uploadImage); // 각 파일을 서버에 업로드
    const urls = await Promise.all(promises); // 모든 업로드가 완료될 때까지 기다림
    setImageSrc(urls); // 업로드된 이미지의 URL들을 상태에 저장
  };

  const inputTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  // useEffect(() => {}, [category]);

  const inputCategoryHandler = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };
  // console.log(category);

  const inputPriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const inputQuantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const inputOptionHandler = (e) => {
    setOption(e.target.value);
  };

  const inputEndDateHandler = (e) => {
    setEndDate(e.target.value);
  };

  const inputDescHandler = (e) => {
    setDesc(e.target.value);
  };

  //상품 등록을 클릭했을 때 이벤트 핸들링하는 부분
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory = category;

    const product = {
      productName: title,
      category,
      price,
      productQuantity: quantity,
      option,
      img1: imageSrc[0],
      img2: imageSrc[1],
      img3: imageSrc[2],
      saleEndDate: endDate,
      productDetail: desc,
      registerDate: today,
    };

    if (selectedCategory === "" || selectedCategory === "null") {
      alert("카테고리는 필수사항입니다.");
    } else {
      dispatch(createProduct({ product, status, token }))
        .then((data) => {
          console.log("Product created:", data);
          setImageSrc([]);
          setTitle("");
          setCategory("");
          setPrice("");
          setQuantity("");
          setOption("");
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
                <img src={imageSrc[0]} alt="preview-img" />
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
            onChange={inputTitleHandler}
            value={title ?? ""}
          />
          {/* 판매 상품 카테고리 구현 */}
          <div className={styles.labelHint}>
            <label>Item Category</label>
          </div>
          <select
            name="category"
            value={category ?? ""}
            onChange={inputCategoryHandler}
          >
            <option value={"null"}></option>
            <option value={"1"}>남성 의류</option>
            <option value={"2"}>여성 의류</option>
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
            onChange={inputPriceHandler}
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
            onChange={inputQuantityHandler}
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
          {/* <input
            className="endDate"
            type="date"
            name="endDate"
            ref={endDate_ref}
            id="endDate"
            required
            onChange={inputEndDateHandler}
            value={endDate}
            min={today}
          /> */}
          <input
            className="endDate"
            type="datetime-local"
            name="endDate"
            step="1"
            ref={endDate_ref}
            id="endDate"
            required
            onChange={inputEndDateHandler}
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
            onChange={inputDescHandler}
            value={desc}
          />
          <button>상품등록</button>
        </div>
      </div>

      <div className={styles.itemImg}>
        <input
          type="file"
          name="image"
          ref={img_ref}
          multiple="multiple"
          accept=".jpg, .jpeg, .png"
          id="itemImg"
          className="itemImg"
          // required
          onChange={inputImgHandler}
        />
      </div>
    </form>
  );
};

export default FormAdditional;