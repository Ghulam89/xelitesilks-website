import express from "express";

import { createBanner,getAllbanners,getBannerById,deleteBannerById, updateBanner } from "../controller/bannerController.js";
import { uploadBannerImages } from "../upload/UploadFile.js";



const bannerRouter = express.Router();
bannerRouter.route("/create").post(uploadBannerImages,createBanner);
bannerRouter.route("/getAll").get(getAllbanners);
bannerRouter.route("/get/:id").get(getBannerById);
bannerRouter.route("/update/:id").put(uploadBannerImages,updateBanner);
bannerRouter.route("/delete/:id").delete(deleteBannerById);


export default bannerRouter;
