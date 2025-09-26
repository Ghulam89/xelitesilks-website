import express from "express";
import {
  createCollection,
  getAllCollection,
  getCollectionById,
  deleteCollectionById,
  updateCollection,
} from "../controller/CollectionController.js";
import { uploadBrandImages } from "../upload/UploadFile.js";
const  collectionRouter = express.Router();
collectionRouter.route("/create").post(uploadBrandImages, createCollection);
collectionRouter.route("/getAll").get(getAllCollection);
collectionRouter.route("/update/:id").put(updateCollection);
collectionRouter.route("/get").get(getCollectionById);
collectionRouter.route("/delete/:id").delete(deleteCollectionById);

export default collectionRouter;
