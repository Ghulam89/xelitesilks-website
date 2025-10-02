import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collections",
  },
  name: {
    type: String,
    require: true,
  },
  inspiration:{
     type: String,
    require: true,
  },
  guide:{
     type: String,
    require: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
  slug: {
    type: String,
    unique: true,
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true
    }
  }],
  actualPrice: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  material: {
    type: String,
    require: true,
  },
  color: {
    type: Array,
    require: true,
  },
  pattern: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});
export const Products = mongoose.model("Products", productSchema);
