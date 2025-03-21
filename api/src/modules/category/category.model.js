import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
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
         required: true
    },

    parentId:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },

    description: String,

    image:{
        type: String,
        required: true
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

const CategoryModel = mongoose.model("Category", CategorySchema); //categories-collection
export default CategoryModel;