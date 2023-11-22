import styles from "./FiltersCategory.module.scss";
import CategoryTab from "./category-tab/CategoryTab";
import { CategoriesName } from "../../../store/categories/categories.type";
import axios from "axios";

const FiltersCategory = () => {
  async function getCategory() {
    try {
      const response = await axios.get(
        "https://15.164.234.129/api/shop/product/category"
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  getCategory();

  return (
    <div className={styles.filter_category}>
      <CategoryTab text={"모두"} categoryName={CategoriesName.All} />
      <CategoryTab text={"쥬얼리"} categoryName={CategoriesName.Jewelry} />
      <CategoryTab
        text={"여성의류"}
        categoryName={CategoriesName.WomensClothing}
      />
      <CategoryTab
        text={"남성의류"}
        categoryName={CategoriesName.MensClothing}
      />
      <CategoryTab
        text={"전자기기"}
        categoryName={CategoriesName.Electronics}
      />
    </div>
  );
};

export default FiltersCategory;
