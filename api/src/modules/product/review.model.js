import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    reviewBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

// Helpful indexes
// ReviewSchema.index({ productId: 1 });
// ReviewSchema.index({ productId: 1, reviewBy: 1 }, { unique: true });

const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
