import styles from "./CategoryTab.module.scss";
import { setActiveCategory } from "../../../../store/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { apiToken } from "../../../../shared/apis/Apis";

const CategoryTab = ({ text, categoryName }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categoriesSlice);

  const getActiveCategory = async () => {
    try {
      const response = await apiToken.get(`/api/category/${categoryName}`);
      dispatch(setActiveCategory(response.data));
    } catch (error) {
      console.error(error);
    }
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
