import UserModel from "./user.model.js";
import bcrypt from "bcryptjs";
import FileUploadService from "../../services/cloudinary.service.js";

class UserService {

  // CREATE USER
  createUser = async (data, file) => {
    try {
      data.password = bcrypt.hashSync(data.password, 12);

      // upload to Cloudinary
      if (file) {
        const uploadedImage = await FileUploadService.uploadFile(file.path, "/users");
        data.image = uploadedImage; // store URL
      }

      const user = new UserModel(data);
      return await user.save();

    } catch (err) {
      throw err;
    }
  };

  // GET USERS
  getUsers = async (filter = {}) => {
    return await UserModel.find(filter).select("-password");
  };

  // GET USER BY ID
  getUserById = async (id) => {
    return await UserModel.findById(id).select("-password");
  };

  // UPDATE USER
  updateUser = async (id, data, file) => {
    try {

      // upload new image if exists
      if (file) {
        const uploadedImage = await FileUploadService.uploadFile(file.path, "/users");
        data.image = uploadedImage;
      }

      return await UserModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).select("-password");

    } catch (err) {
      throw err;
    }
  };

  // DELETE USER
 deleteUser = async (id) => {
  const user = await UserModel.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await UserModel.findByIdAndDelete(id);

  return user;
};
}

export default new UserService();