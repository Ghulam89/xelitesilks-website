import express from "express";

import {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlogById,updateBlog,
  editorImageUpload
} from "../controller/BlogController.js";
import { uploadBlogImages, uploadEditorImage } from "../upload/UploadFile.js";
const blogRouter = express.Router();
blogRouter.route("/create").post(uploadBlogImages,createBlog);
blogRouter.route("/getAll").get(getAllBlogs);
blogRouter.route("/update/:id").put(uploadBlogImages,updateBlog);
blogRouter.route("/upload-editor-image").post(uploadEditorImage,editorImageUpload);
blogRouter.route("/get").get(getBlogById);
blogRouter.route("/delete/:id").delete(deleteBlogById);

export default blogRouter;
