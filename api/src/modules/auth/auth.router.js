import { Router } from "express";
import {checkLogin, refreshToken } from "../../middlewares/auth.middleware.js";
import authCtrl from "./auth.controller.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import { activationDTO, loginDTO, resendOtpDTO, userRegistrationDTO } from "./auth.request.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";

const authRouter = Router();

authRouter.post("/register", uploadFile("image").single('image'), bodyValidator(userRegistrationDTO), authCtrl.register);
authRouter.post("/activate", bodyValidator(activationDTO), authCtrl.activateUser)
authRouter.post("/resend-otp", bodyValidator(resendOtpDTO), authCtrl.resendOtp)

authRouter.post("/login",bodyValidator(loginDTO), authCtrl.login)

authRouter.get("/me",checkLogin, authCtrl.getLoggedInUser)

authRouter.get("/refresh", refreshToken, authCtrl.refreshToken)

authRouter.get("/all-admin", checkLogin,checkPermission(['admin']), authCtrl.getUsers)

authRouter.post("/:id", checkLogin, authCtrl.updateUserById)

export default authRouter;