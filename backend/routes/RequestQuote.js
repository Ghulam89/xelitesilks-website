import express from "express";

import { createRequestQuote, deleteRequestQuoteById, getAllRequestQuote, getRequestQuoteById, updateRequestQuote } from "../controller/RequestQuote.js";import { uploadRequestQuoteImages } from "../upload/UploadFile.js";
;

const blogRouter = express.Router();

blogRouter.route("/create").post(uploadRequestQuoteImages,createRequestQuote);
blogRouter.route("/getAll").get(getAllRequestQuote);
blogRouter.route("/update/:id").put(uploadRequestQuoteImages,updateRequestQuote);
blogRouter.route("/get/:id").get(getRequestQuoteById);
blogRouter.route("/delete/:id").delete(deleteRequestQuoteById);

export default blogRouter;
