import { TOKEN_KEY } from "../config/index.js";
import bcrypt from "bcrypt";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dt8egjsqc",
  api_key: "687626968186366",
  api_secret: "jHt0Sl3cUe183ElXpTkTxr5Alok",
});

// register user
export const register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already exists", status: "fail" });
  }
  const user = await User.create(data);
  const token = jwt.sign({ id: user._id, email: user.email }, TOKEN_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user,
      token,
    },
  });
});

// login user
export const login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Request body:", req.body);
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        status: "fail",
        message: "Account not found",
      });
    }
    console.log("Existing user password:", existingUser.password);
    if (!password) {
      return res.status(400).json({
        status: "fail",
        message: "Password is required",
      });
    }

    if (!existingUser.password) {
      return res.status(500).json({
        status: "fail",
        message: "User password is missing in the database",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: existingUser,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

// get user by id
export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  // console.log('user id ====', req?.user?.userId)
  try {
    // const cachedUser = await redisClient.get(`user:${userId}`);
    // if (cachedUser) {
    //   return res.json(JSON.parse(cachedUser)); // Return cached user
    // }
    const data = await User.findById(userId);
    // await redisClient.set(`user:${userId}`, JSON.stringify(data), 'EX', 3600);
    res.json({
      status: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update Profile
export const UpdateProfile = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    let updatedFields = { ...data };
    if (req.files && req.files.image) {
      let image = req.files.image;
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
      updatedFields.image = result.url;
    }

    if (updatedFields.password) {
      console.log("Password is being updated");
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
      console.log("Hashed password:", updatedFields.password);
    }

    // Update the user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields }, // Use $set to update only provided fields
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the password from the response for security
    user.password = undefined;

    res.status(200).json({
      status: 200,
      data: user,
      message: "Profile updated successfully!",
    });
  } catch (err) {
    console.log("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All User
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1; 
  const perPage = 5;
  const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || '';
  try {
    const filter = searchQuery
      ? { 
          $or: [
            { username: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
          ],
        }
      : {};
    const count = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      status: "success",
      data: {
        users,
        pagination: {
          page,
          perPage,
          totalUsers: count,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});


// delete user
export const deleteCustomerById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCustomer = await User.findByIdAndDelete(id);
    if (!delCustomer) {
      return res.json({ status: "fail", message: "Customer not Found" });
    }
    // await redisClient.del(`user:${id}`);
    // await producer.connect();
    // await producer.send({
    //   topic: 'user-events',
    //   messages: [{ value: JSON.stringify({ action: 'delete', id }) }],
    // });
    res.json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
