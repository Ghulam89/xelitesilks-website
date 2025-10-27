import express from "express";
import {
  register,
  login,
  getAllUsers,
  UpdateProfile,
  deleteCustomerById,
  getUserById,
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controller/userController.js";
const userRoute = express.Router();
userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/getAll").get(getAllUsers);
userRoute.route("/get/:id").get(getUserById);
userRoute.route("/update/:id").put(UpdateProfile);
userRoute.route("/delete/:id").delete(deleteCustomerById);

// Profile management routes
userRoute.route("/profile/:id").get(getUserProfile);
userRoute.route("/profile/:id").put(updateUserProfile);

// Address management routes
userRoute.route("/:id/addresses").post(addAddress);
userRoute.route("/:id/addresses/:addressId").put(updateAddress);
userRoute.route("/:id/addresses/:addressId").delete(deleteAddress);
userRoute.route("/:id/addresses/:addressId/default").put(setDefaultAddress);

export default userRoute;
