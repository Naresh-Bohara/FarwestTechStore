import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number
    },
    serviceCharge: {
        type: Number
    },
      deliveryCharge: {      
    type: Number,
    default: 0,
  },
    total: {
        type: Number,
        required: true
    },
    orderDate: Date,
    status: {
        type: String,
        enum: ["new", "processing", "shipped", "completed", "cancelled"],
        default: "new",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    cartItems: [{  // Add this field to store cart items in the order
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    }]
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const OrderModel = mongoose.model("Order", OrderSchema); // orders-collection
export default OrderModel;
