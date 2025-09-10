import mongoose from "mongoose";
const Schema = mongoose.Schema;

const midcategorySchema = new Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  title: {
    type: String,
    require: true,
  },
 metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
   slug: {
    type: String,
    unique: true,
  },
  subTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
   iconAltText:{
     type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
   imageAltText:{
     type: String,
    require: true,
  },
  videoUpperHeading:{
     type: String,
    require: true,
  },
  videoUpperDescription:{
     type: String,
    require: true,
  },
  videoLink: {
    type: String,
    require: true,
  },
  videoDescription: {
    type: String,
    require: true,
  },
  bannerTitleFirst: {
    type: String,
    require: true,
  },
  bannerContentFirst: {
    type: String,
    require: true,
  },
  bannerImageFirst: {
    type: String,
    require: true,
  },
   bannerImageFirstAltText:{
     type: String,
    require: true,
  },
  bannerTitleSecond: {
    type: String,
    require: true,
  },
  bannerContentSecond: {
    type: String,
    require: true,
  },
  bannerImageSecond: {
    type: String,
    require: true,
  },
   bannerImageSecondAltText:{
     type: String,
    require: true,
  },
  bannerTitleThird: {
    type: String,
    require: true,
  },
  bannerContentThird: {
    type: String,
    require: true,
  },
  bannerImageThird: {
    type: String,
    require: true,
  },
   bannerImageThirdAltText:{
     type: String,
    require: true,
  },
  bannerTitleFourth: {
    type: String,
    require: true,
  },
  bannerContentFourth: {
    type: String,
    require: true,
  },
  bannerImageFourth: {
    type: String,
    require: true,
  },
  bannerImageFourthAltText:{
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

export const MidCategory = mongoose.model("MidCategory", midcategorySchema);
