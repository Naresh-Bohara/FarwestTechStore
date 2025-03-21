import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
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

const BrandModel = mongoose.model("Brand", BrandSchema); //brands-collection
export default BrandModel;