import mongoose from "mongoose";
const Schema = mongoose.Schema;

const requestQuoteSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
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
  boxStyle: {
    type: String,
    require: true,
  },
  length: {
    type: String,
    require: true,
  },
  width: {
    type: String,
    require: true,
  },
  depth: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  stock: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  printingSides: {
    type: String,
    require: true,
  },
  addons: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pageUrl: {
    type: String,
    require: true,
  },
  device: {
    type: String,
    require: true,
  },
  ip: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

export const RequestQuote = mongoose.model("RequestQuote", requestQuoteSchema);
