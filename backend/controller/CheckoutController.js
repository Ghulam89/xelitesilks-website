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

// Debug endpoint to check all orders and their userIds
export const debugAllOrders = catchAsyncError(async (req, res, next) => {
  try {
    const allOrders = await Checkout.find({}, 'userId email createdAt').sort({ createdAt: -1 });
    
    console.log("All orders in database:");
    allOrders.forEach((order, index) => {
      console.log(`Order ${index + 1}:`, {
        id: order._id,
        userId: order.userId,
        email: order.email,
        createdAt: order.createdAt
      });
    });

    res.status(200).json({
      status: "success",
      message: "Debug info logged to console",
      data: allOrders,
      totalOrders: allOrders.length
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});

// Debug endpoint to check products and their images
export const debugProducts = catchAsyncError(async (req, res, next) => {
  try {
    const { Products } = await import("../model/Product.js");
    const products = await Products.find({}).limit(5).select('name images');
    
    console.log("Sample products with images:");
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`, {
        id: product._id,
        name: product.name,
        images: product.images
      });
    });

    res.status(200).json({
      status: "success",
      message: "Product debug info logged to console",
      data: products,
      totalProducts: products.length
    });
  } catch (error) {
    console.error("Error in product debug endpoint:", error);
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

    console.log("getUserCheckouts - userId:", userId); // Debug log
    console.log("getUserCheckouts - page:", page, "limit:", limit); // Debug log

    const skip = (page - 1) * limit;

    // First check if there are any checkouts for this user
    const totalCheckouts = await Checkout.countDocuments({ userId });
    console.log("Total checkouts found:", totalCheckouts); // Debug log

    const checkouts = await Checkout.find({ userId })
      .populate({
        path: "productIds",
        model: "Products",
        select: 'name images actualPrice size description material color pattern'
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    console.log("Checkouts found:", checkouts.length); // Debug log
    console.log("Sample checkout with products:", JSON.stringify(checkouts[0], null, 2)); // Debug log

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
