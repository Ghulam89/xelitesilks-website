import express from "express";

import {
  createCategory,
  getCategoryById,
  getAllCategory,
  deleteCategoryById,
  updateCategory
} from "../controller/MidCategory.js";
import { uploadCategoryImages } from "../upload/UploadFile.js";
const categoryRouter = express.Router();
categoryRouter.route("/create").post(uploadCategoryImages,createCategory);
categoryRouter.route("/getAll").get(getAllCategory);
categoryRouter.route("/update/:id").put(uploadCategoryImages,updateCategory);
categoryRouter.route("/get").get(getCategoryById);
categoryRouter.route("/delete/:id").delete(deleteCategoryById);

export default categoryRouter;
