import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
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

export const Collections = mongoose.model("Collections", collectionSchema);
