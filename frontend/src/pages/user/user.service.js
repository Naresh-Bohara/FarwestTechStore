import HttpService from "../../services/http.service";

class UserService extends HttpService {

  createUser = async (data) => {
    try {
      return await this.postRequest("/user", data, {
        auth: true,
        file: true, // IMPORTANT
      });
    } catch (err) {
      throw err;
    }
  };

  getUsers = async () => {
    return await this.getRequest("/user", { auth: true });
  };

  getUserById = async (id) => {
    return await this.getRequest(`/user/${id}`, { auth: true });
  };

  updateUser = async (id, data) => {
    return await this.putRequest(`/user/${id}`, data, {
      auth: true,
      file: true,
    });
  };

  deleteUser = async (id) => {
    return await this.deleteRequest(`/user/${id}`, { auth: true });
  };
}

export default new UserService();