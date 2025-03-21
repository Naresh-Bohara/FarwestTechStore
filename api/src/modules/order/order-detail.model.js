import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    orderId:{
        type: mongoose.Types.ObjectId,
        ref: "Order",
        default: null
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity:{
        type: Number,
        min: 1,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['new', 'ordered', 'cancelled'],
        default: "new"
    },
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,

})

const CartModel = mongoose.model("Cart", CartSchema); //carts collection
export default CartModel;