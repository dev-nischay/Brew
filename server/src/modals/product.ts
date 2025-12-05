import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  seller: {
    type: Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

export const Product = mongoose.model("product", productSchema);
