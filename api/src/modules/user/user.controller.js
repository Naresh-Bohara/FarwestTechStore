import userSvc from "./user.service.js";

class UserController {

  // CREATE
  createUser = async (req, res, next) => {
    try {
      const user = await userSvc.createUser(req.body, req.file);

      res.json({
        detail: user,
        message: "User created successfully",
        status: "USER_CREATED",
      });

    } catch (err) {
      next(err);
    }
  };

  // GET ALL
  getUsers = async (req, res, next) => {
    try {
      const users = await userSvc.getUsers();

      res.json({
        detail: users,
        message: "Users fetched",
        status: "USER_LIST",
      });

    } catch (err) {
      next(err);
    }
  };

  // GET BY ID
  getUserById = async (req, res, next) => {
    try {
      const user = await userSvc.getUserById(req.params.id);

      res.json({
        detail: user,
        message: "User fetched",
        status: "USER_DETAIL",
      });

    } catch (err) {
      next(err);
    }
  };

  // UPDATE
  updateUser = async (req, res, next) => {
    try {
      const data = { ...req.body };
      // (service handles cloudinary upload)

      const updated = await userSvc.updateUser(
        req.params.id,
        data,
        req.file
      );

      res.json({
        detail: updated,
        message: "User updated",
        status: "USER_UPDATED",
      });

    } catch (err) {
      next(err);
    }
  };

  // DELETE
  deleteUser = async (req, res, next) => {
    try {
      await userSvc.deleteUser(req.params.id);

      res.json({
        detail: null,
        message: "User deleted",
        status: "USER_DELETED",
      });

    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();