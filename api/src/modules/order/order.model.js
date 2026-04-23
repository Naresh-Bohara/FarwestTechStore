import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    serviceCharge: {
      type: Number,
      default: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    paymentScreenshot: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    status: {
      type: String,
      enum: [
        "new",
        "processing",
        "shipped",
        "completed",
        "cancelled",
        "pending",
      ],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    cartItems: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;