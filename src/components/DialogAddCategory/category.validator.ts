import * as Yup from "yup";

const CategorySchema = () =>
  Yup.object({
    categoryName: Yup.string()
      .required("Category name cannot be empty")
      .min(3, "Must be more than 3 characters!")
      .max(30, "Cannot exceed 30 characters!"),
  });

export default CategorySchema;
