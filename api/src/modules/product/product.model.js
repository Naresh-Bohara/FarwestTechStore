import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min:3,
        max:100,
        unique: true
    },

    slug:{
         type:String,
         unique: true,
    },

    category:{
        type: mongoose.Types.ObjectId, 
        ref: "Category",
        required: true
    },

    brand:{
        type: mongoose.Types.ObjectId, 
        ref: "Brand",
        default: null
    },

    price:{
      type: Number,
      required: true,
      min: 100  
    },

    discount:{
        type: Number,
        default: 0,
        max: 100,
        min: 0
    },

    actualAmount:{
        type: Number,
        required: true
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },

    description: String,

    images:[{
        type: String,
    }],

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

}, {timestamps: true,
    autoCreate: true,
    autoIndex: true,
})

const ProductModel = mongoose.model("Product", ProductSchema); //products-collection
export default ProductModel;