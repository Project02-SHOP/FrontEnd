import styles from "./CategoryTab.module.scss";
import { setActiveCategory } from "../../../../store/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const CategoryTab = ({ text, categoryName }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categoriesSlice);

  const getActiveCategory = () => {
    dispatch(setActiveCategory(categoryName));
  };
  return (
    <button
      className={
        categoryName === category // redux store에서 가져온 category
          ? styles.active_category
          : styles.category_button
      }
      onClick={getActiveCategory}
    >
      {text}
    </button>
  );
};

export default CategoryTab;
