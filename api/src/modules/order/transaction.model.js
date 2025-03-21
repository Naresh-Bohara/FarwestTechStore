import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    transactionDate: Date,
    transactionCode: String,
    paymentMethods: {
        type: String,
        enum: ["cash", "eswa", "khalti", "bank", "connectips", "other"],
      },
      response:{
        type: String
      },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
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

const TransactionModel = mongoose.model("Transaction", TransactionSchema) // transactions-collection
export default TransactionModel;