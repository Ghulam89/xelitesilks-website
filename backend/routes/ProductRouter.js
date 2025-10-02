import express from "express";
import {
  createProducts,
  getAllProducts,
  getProductsById,
  deleteproductsById,
  searchProduct,
  updateProducts,
  getRelatedProducts,
  getCollectionByProducts,
} from "../controller/ProductController.js";
import { uploadProductImages } from "../upload/UploadFile.js";
const productRouter = express.Router();
productRouter.route("/create").post(uploadProductImages,createProducts);
productRouter.route("/getAll").get(getAllProducts);
productRouter.route("/categoryProducts/:collectionId/products-by-category").get(getCollectionByProducts);
productRouter.route("/related-products").get(getRelatedProducts);
productRouter.route("/search").get(searchProduct);
productRouter.route("/get").get(getProductsById);
productRouter.route("/delete/:id").delete(deleteproductsById);
productRouter.route("/update/:id").put(uploadProductImages,updateProducts);
export default productRouter;
