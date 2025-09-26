import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Checkout } from "../model/Checkout.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "di4vtp5l3",
  api_key: "855971682725667",
  api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k",
});

export const createCheckout = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const newCheckout = await Checkout.create(data);
  res.status(200).json({
    status: "success",
    message: "Your Order has been placed successfully!",
    data: newCheckout,
  });
});


export const createPaymentIntent = catchAsyncError(async (req, res, next) => {
  const { totalBill, email, userId, productIds } = req.body;

  const amount = Math.round(parseFloat(totalBill) * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: {
      userId: userId.toString(),
      productIds: JSON.stringify(productIds),
      email
    },
    receipt_email: email
  });
  
  res.status(200).json({
    status: "success",
    clientSecret: paymentIntent.client_secret
  });
});

export const getCheckoutById = async (req, res, next) => {
  const id = req?.params?.id;
  
  try {
    const data = await Checkout.findById(id).populate({
      path: 'productIds',
      model: 'Products',
      select: 'name images actualPrice size description bannerImage bannerTitle bannerContent'
    });

    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Checkout not found"
      });
    }

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
      message: error.message 
    });
  }
};
export const updateCheckout = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const orderId = req.params.id;

  const updatedCheckout = await Checkout.findByIdAndUpdate(orderId, data, {
    new: true,
  });
  if (!updatedCheckout) {
    return res.status(404).json({ message: "blog not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedCheckout,
    message: "Checkout updated successfully!",
  });
});

export const getAllCheckout = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCount = await Checkout.countDocuments();
    
    const checkout = await Checkout.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: "success",
      data: checkout,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching checkout records:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});
export const deleteCheckoutById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCheckout = await Checkout.findByIdAndDelete(id);
    if (!delCheckout) {
      return res.json({ status: "fail", message: "Checkout not Found" });
    }
    res.json({
      status: "success",
      message: "Checkout deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getUserCheckouts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const checkouts = await Checkout.find({ userId })
      .populate({
        path: "productIds",
        model: "Products",
        populate: [
          { path: "categoryId", model: "Category" },
          { path: "brandId", model: "Brand" },
          { path: "platform", model: "Platform" },
          { path: "region", model: "Region" }
        ]
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCheckouts = await Checkout.countDocuments({ userId });
    const totalPages = Math.ceil(totalCheckouts / limit);

    res.status(200).json({
      status: "success",
      data: checkouts,
      pagination: {
        total: totalCheckouts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching checkouts:", error);
    res.status(500).json({ status: "fail", error: "Internal Server Error" });
  }
};
