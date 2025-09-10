import mongoose from "mongoose";
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  totalBill: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  delivery: { 
    type: { 
      country: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      }, 
      zipCode: {
        type: String,
        required: true
      },
      addressLine1: {
        type: String,
        required: true
      },
      addressLine2: {
        type: String,
        required: false 
      },
    },
    require: true 
  },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  paymentIntentId: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Refunded", "Failed"],
    default: "Pending"
  },


  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

export const Checkout = mongoose.model("Checkout", checkoutSchema);
