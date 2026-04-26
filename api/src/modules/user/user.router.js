import { Router } from "express";
import userCtrl from "./user.controller.js";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import { createUserDTO, updateUserDTO } from "./user.request.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";

const userRouter = Router();

//  Only admin access
userRouter.use(checkLogin, checkPermission(["admin"]));

// Create user
userRouter.post(
  "/",
  uploadFile("image").single("image"),
  bodyValidator(createUserDTO),
  userCtrl.createUser
);

// Get all users
userRouter.get("/", userCtrl.getUsers);

// Get single user
userRouter.get("/:id", userCtrl.getUserById);

// Update user
userRouter.put(
  "/:id",
  uploadFile("image").single("image"),
  bodyValidator(updateUserDTO),
  userCtrl.updateUser
);

// Delete user
userRouter.delete("/:id", userCtrl.deleteUser);

export default userRouter;