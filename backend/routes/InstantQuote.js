import express from "express";

import { createInstantQuote, deleteInstantQuoteById, getAllInstantQuote, getInstantQuoteById, updateInstantQuote, testIPDetection } from "../controller/InstantQuote.js";
import { uploadInstantQuoteImages } from "../upload/UploadFile.js";

const instantQuoteRouter = express.Router();

instantQuoteRouter.route("/create").post(uploadInstantQuoteImages,createInstantQuote);
instantQuoteRouter.route("/getAll").get(getAllInstantQuote);
instantQuoteRouter.route("/update/:id").put(uploadInstantQuoteImages,updateInstantQuote);
instantQuoteRouter.route("/get/:id").get(getInstantQuoteById);
instantQuoteRouter.route("/delete/:id").delete(deleteInstantQuoteById);
instantQuoteRouter.route("/test-ip").get(testIPDetection);

export default instantQuoteRouter;
