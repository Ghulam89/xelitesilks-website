import mongoose from "mongoose";
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  bannerImage: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  bannerAltText: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  imageAltText: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  bgColor: {
    type: String,
    require: true,
  },
   metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
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

export const Brands = mongoose.model("Brands", brandSchema);
