import FileUploadService from "../../services/cloudinary.service.js"
import bcrypt from "bcryptjs"
import { generateDateTime, generateRandomString } from "../../utilities/helpers.js";
import UserModel from "../user/user.model.js"
import mailSvc from "../../services/mail.service.js";
import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";

class AuthService {
    generateActivationOtp = ()=>{
        return {
        activationToken: generateRandomString(6).toUpperCase(),
        expiryTime: generateDateTime(5),
        }
    }
    transformCreateUser = async(req)=>{
        try{
      const data = req.body
      const file =  req.file
      data.password = bcrypt.hashSync(data.password, 12)

      const formattedData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
        gender: data.gender,
        phone: data.phone,
        image: file ? await FileUploadService.uploadFile(file.path, "/users") : null,
        status: "inactive" ,
        activationToken: generateRandomString(6).toUpperCase(),
        expiryTime: generateDateTime(5),
        }

        return formattedData;
    
    }catch(exception){
    throw(exception)
        }
    }

    registerUser = async(data)=>{
        try{
            // Check if user with this email already exists
            const existingUser = await UserModel.findOne({ email: data.email });
            // if (existingUser) {
            //     throw new Error("Email is already registered.");
            // }

            // If no user exists, proceed to save the new user
            const userObj = new UserModel(data);
           return await userObj.save();
        }catch(exception){
            throw(exception);
        }
    }

    sendActivationEmail = async(user)=>{
        try{
            let msg = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                <header style="text-align: center; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px;">
                    <h2 style="color: #333;">Welcome to Farwest Tech Store!</h2>
                    <p style="font-size: 14px; color: #777;">Your trusted source for technology products</p>
                </header>
                
                <p style="font-size: 16px; color: #333;">Dear ${user.name},</p>
                
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    We are thrilled to have you onboard! Your account has been successfully created. 
                    To start using your account, please activate it using the OTP code provided below.
                </p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; padding: 15px 30px; font-size: 18px; font-weight: bold; color: #ffffff; background-color: #ff4d4d; border-radius: 8px;">
                        ${user.activationToken}
                    </span>
                </div>
                
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    <strong>Note:</strong> This code is valid for only 5 minutes. If it expires, you can request a new one on our website.
                </p>
                
                <footer style="margin-top: 20px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 10px; color: #777;">
                    <p style="font-size: 14px;">Regards,</p>
                    <p style="font-size: 14px; font-weight: bold; color: #333;">Farwest Tech Store</p>
                    <p style="font-size: 12px; color: #999;">Please do not reply to this email.</p>
                </footer>
            </div>
        `;
        
            await mailSvc.sendEmail(user.email, "Activate your account!", msg);
            return true
        }catch(exception){
            throw exception;
        }
    }

    reSendActivationEmail = async(user)=>{
        try{
            let msg = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                <header style="text-align: center; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px;">
                    <h2 style="color: #333;">Your New OTP Code for Farwest Tech Store</h2>
                    <p style="font-size: 14px; color: #777;">We're here to help you activate your account</p>
                </header>
                
                <p style="font-size: 16px; color: #333;">Dear ${user.name},</p>
                
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    We noticed that your previous OTP code expired. Here is your new code to activate your account. Please use this OTP within 5 minutes to complete your account setup.
                </p>
        
            <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; padding: 15px 30px; font-size: 18px; font-weight: bold; color: #ffffff; background-color: #ff4d4d; border-radius: 8px;">
                    ${user.otp}
                </span>
            </div>
        
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
                <strong>Note:</strong> This code is valid for only 5 minutes. If it expires again, you can request another new code on our website.
            </p>
        
            <footer style="margin-top: 20px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 10px; color: #777;">
            <p style="font-size: 14px;">Warm regards,</p>
            <p style="font-size: 14px; font-weight: bold; color: #333;">Farwest Tech Store Team</p>
            <p style="font-size: 12px; color: #999;">Please do not reply to this email.</p>
                    </footer>
                </div>
            `;
            await mailSvc.sendEmail(user.email, "Re-activation OTP code", msg);
            return true
        }catch(exception){
            throw exception;
        }
    }

    getUserByFilter = async(filter)=>{
        try{
            const user = await UserModel.findOne(filter)
            if(!user){
                throw {status:HttpResponseCode.BAD_REQUEST, message:"User Not Found", statusCode:HttpResponse.validationFailed}
            }
            return user;
        }catch(exception){
            throw exception
        }
    }

    updateUserById = async(data, userId)=>{
        try{
            const user = await UserModel.findByIdAndUpdate(userId, {
                $set: data
            })
            return user;

        }catch(exception){
            throw exception
        }
    }
}

const authSvc = new AuthService();
export default authSvc;