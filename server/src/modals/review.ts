import mongoose from "mongoose";
import { Types } from "mongoose";

const reviewSchema = new mongoose.Schema({
  product: {
    type: Types.ObjectId,
    required: true,
    ref: "product",
  },
  reviewInput: {
    type: String,
    requried: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export const Feedback = mongoose.model("review", reviewSchema);
