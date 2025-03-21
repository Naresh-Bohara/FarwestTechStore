import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import authSvc from "./auth.service.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController {
  register = async (req, res, next) => {
    try{
      //transforamtion
      const formattedData = await authSvc.transformCreateUser(req);
      const user = await authSvc.registerUser(formattedData)

      await authSvc.sendActivationEmail(user);
      res.json({
        data: user,
        message: "Register Request",
        status: HttpResponse.success,
        options:null
      })

    }catch(exception){
      console.log(exception)
      next(exception)
    }
  };

  activateUser = async(req, res, next)=>{
    try{
      const {email, otp} = req.body;
      //verify user and otp
      const user = await authSvc.getUserByFilter({
        email:email,
      })

      if(user.status !== "inactive"){
        throw {status:HttpResponseCode.BAD_REQUEST, message:"User already activated.", statusCode:HttpResponse.validationFailed}
      }

      if(user.activationToken !== otp){
        throw {status:HttpResponseCode.BAD_REQUEST, message:"Incorrect OTP code", statusCode:HttpResponse.validationFailed}
      }

      let today = new Date();
      today = today.getTime()

      let otpExpiryTime = user.expiryTime;
      otpExpiryTime.getTime()

      if((today - otpExpiryTime) > 0){
        throw {status:HttpResponseCode.BAD_REQUEST, message:"OTP code expired", statusCode:HttpResponse.validationFailed}
      }

      // activate
      const update = await authSvc.updateUserById({
        status: "active",
        expiryTime: null,
        activationToken: null
      }, user._id)

      res.json({
        data: null,
        message: "Account activated successfully. Please login to continue.",
        status: HttpResponse.success,
        options: null
      })

    }catch(exception){
      console.log(exception)
      next(exception)
    }
  }

  resendOtp = async(req, res, next)=>{
    try{
      const { email } = req.body;
      const user  = await authSvc.getUserByFilter({
        email: email
      })

      if(user.status !== "inactive"){
        throw {status:HttpResponseCode.BAD_REQUEST, message:"User already activated.", statusCode:HttpResponse.validationFailed}
      }

      const newOtpCode = authSvc.generateActivationOtp()
      await authSvc.updateUserById(newOtpCode, user._id)

      await authSvc.reSendActivationEmail({email: user.email, otp: newOtpCode.activationToken, name: user.name})
      res.json({
        data: null,
        message: "A new OTP code has been delivered to you email.",
        status: HttpResponse.success,
        options: null
      })

    }catch(exception){
      console.log(exception)
      next(exception)
    }
  }


    login = async(req, res, next)=>{
        try{
          const {email, password} = req.body;
          const user = await authSvc.getUserByFilter({
            email: email
          })

          if(user.status !== "active"){
            throw {status:HttpResponseCode.BAD_REQUEST, message:"User Not Found", statusCode:HttpResponse.user.notActivate}
          }
          
          else{
            if(bcrypt.compareSync(password, user.password)){
              // login success
              const payload = {
                sub: user._id,
              }

              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '10h', 
              });

              const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "15d"
              })

              res.json({
                data: {
                  token: token,
                  refreshToken: refreshToken,
                  detail:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    gender: user.gender,
                    image: user.image,
                    address: user.address,
                    phone: user.phone
                  }
                },
                message: "Login Success.",
                status: HttpResponse.success,
                options: null
              })

            }else{
              throw {status:HttpResponseCode.BAD_REQUEST, message:"Credential doesn't match.", statusCode:HttpResponse.user.credentialNotMatch}
            }
          }

        }catch(exception){
          console.log(exception)
          next(exception)
        }
    }

    getLoggedInUser = (req, res, next)=>{
      try{
        res.json({
          data: req.loggedInUser,
          message: "User Profile Fetched.",
          status: HttpResponse.success,
          options: null
        })

      }catch(exception){
        next(exception)
      }
    }

    updateUserById = (req, res, next)=>{
        // update user profile
        // login check 

        const params = req.params
        const query = req.query || null
        const headers = req.headers

        // body //payload provided by FE or api call
        // parsers 
        const data = req.body
    }

    getUsers = (req, res, next)=>{
      res.json({
        data: req.loggedInUser,
        message: "User Profile Fetched.",
        status: HttpResponse.success,
        options: null
      })
    }

    refreshToken = (req, res, next)=>{
     try{
      const loggedInUser = req.loggedInUser

      const payload = {
        sub: loggedInUser._id,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10h" 
      }); 

      const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d"
      })

      res.json({
        data: {
          token: token,
          refreshToken: refreshToken
        },
        message: "Refresh Token.",
        status: HttpResponse.success,
        options: null
      })

     }catch(exception){
      next(exception)
     }
    }
}

const authCtrl = new AuthController()

export default authCtrl