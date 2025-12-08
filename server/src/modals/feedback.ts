import mongoose from "mongoose";
import { Types } from "mongoose";

const feedbackSchema = new mongoose.Schema({
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

export const Feedback = mongoose.model("review", feedbackSchema);
