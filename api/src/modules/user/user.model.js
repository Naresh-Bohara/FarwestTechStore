import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    streetName: String,
    houseNo: String, 
    wardNo: Number,
    municipality: String,
    district: String,
    province: String
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 50,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'seller'],
        default: "customer",
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: "male"
    },
    address: String,
    phone: String,
    image: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    activationToken: String,
        forgetToken: String,
        expiryTime: Date,

        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

// Snake Case => Model Name =>singular form in CamelCase
//model will create a collection / table in our db with plural form of  our model name 
//collection name will always be in plural form and always in small case, users
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
  
