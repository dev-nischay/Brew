import mongoose, { Types } from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },

  currency: {
    type: String,
    default: "INR",
    required: true,
  },

  purchasedAt: {
    type: Date,
    default: Date.now,
  },

  totalAmount: {
    type: Number,
    min: 0,
    required: true,
  },

  items: [
    {
      productId: {
        types: Types.ObjectId,
        required: true,
        ref: "product",
      },
    },
  ],
});

export const Purchase = mongoose.model("purchase", purchaseSchema);
