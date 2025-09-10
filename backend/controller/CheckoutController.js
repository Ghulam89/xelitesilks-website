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

// create Checkout
export const createCheckout = catchAsyncError(async (req, res, next) => {
  const data = req.body;


  // console.log(data1);
  // const data = req.body;

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



// // / PayPal API base URL (use sandbox for testing)
// const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com'; // Change to https://api-m.paypal.com for production

// // Function to get PayPal access token
// const clientId = 'AaiAjek2ug7UzUcX5mP4GKDsJKZaGSbmn0kHFehtED8KW4ANIc3MM_EwgV1upOlK8D7zPe8L_ypWfYmp';
// const clientSecret = 'EGX_HDNFE1U_gs0m54pS5F2sOrvRcjk734G20e-C6yZUwpjgVF5RBgRwNCmq9xdYTrxaV8sed60LBsX1';



// // PayPal Environment Setup
// const environment = new paypal.core.SandboxEnvironment(
//     clientId,
//     clientSecret
//   );
//   const client = new paypal.core.PayPalHttpClient(environment);

// async function getPayPalAccessToken(captureId) {

//     console.log(captureId);
    

//     try {
//         const request = new paypal.payments.CapturesRefundRequest(captureId);
//         request.requestBody({});
    
//         const response = await client.execute(request);
    
//         console.log("Refund Status:", response.result.status);
//         return response.result;
//       } catch (error) {
//         console.error("PayPal Refund Error:", error);
//         throw error;
//       }
// }


// // Refund API endpoint
// const refundPaypalData = async (req, res) => {
//     const { payPalId } = req.body;

//     if (!payPalId) {
//         return res.status(400).send('Missing required field: orderId');
//     }

//     try {
//         // Fetch the order details from your database
//         const order = await Order.findOne({ where: { payPalId: payPalId } });

//         if (!order) {
//             return res.status(404).send('Order not found');
//         }

  

//         const request = new paypal.payments.CapturesRefundRequest(payPalId);
//         request.requestBody({});
    
//         const response = await client.execute(request);
    
//         console.log("Refund Status:", response.result.status);

//         if (!response.result.status.ok) {
//             throw new Error(`Failed to process refund. Status: ${response.result.status}`);
//         }

//         // const refundData = await refundResponse.json();

//         // console.log('Refund response:', refundData);

//         // // Update the order status in your database
//         await Order.update(
//             { paymentStatus: 'Refunded' },
//             { where: { id: order.id } }
//         );

//         // Return success response
//         res.status(200).json({
//             status: 'ok',
//             data: response
//         });
//     } catch (error) {
//         console.error('Error processing refund:', error.message);
//         res.status(500).json({
//             status: 'error',
//             message: 'Failed to process refund'
//         });
//     }
// };

// get Checkout by id
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
// update Checkout
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

// Get All Checkout
export const getAllCheckout = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
    const skip = (page - 1) * limit;

    // Get total count of all checkout records
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
// delete checkout
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
    const { userId } = req.params; // Get userId from URL params
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
      }) // Fully populate products with category, brand, platform, and region
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
