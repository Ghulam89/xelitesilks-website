
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    videoLink: {
        type: String,
        require: true,
    },
    description: {
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

export const Banner = mongoose.model("Banner", bannerSchema);
