import styles from "./FiltersCategory.module.scss";
import CategoryTab from "./category-tab/CategoryTab";
import { CategoriesName } from "../../../store/categories/categories.type";

const FiltersCategory = () => {
  return (
    <div className={styles.filter_category}>
      <CategoryTab text={"모두"} categoryName={CategoriesName.All} />
      <CategoryTab
        text={"여성의류"}
        categoryName={CategoriesName.WomensClothing}
      />
      <CategoryTab
        text={"남성의류"}
        categoryName={CategoriesName.MensClothing}
      />
    </div>
  );
};

export default FiltersCategory;
