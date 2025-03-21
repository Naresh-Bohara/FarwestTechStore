import { toast } from "react-toastify";
import axiosInstance from "../config/axios.config";

class HttpService {
  #headers = {};
  #params = {};

  // Private method to configure headers and parameters
  #configureRequest(config) {
    this.#headers = {};
    this.#params = {};

    // Set content type
    this.#headers["Content-Type"] = config?.file
      ? "multipart/form-data"
      : "application/json";

    // Set authorization header if needed
    if (config?.auth) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        throw new Error("Authentication token not found.");
      }
      this.#headers["Authorization"] = `Bearer ${token}`;
    }

    // Include additional query parameters
    if (config?.params) {
      this.#params = config.params;
    }
  }

  // Private method for centralized error handling
  #handleError(exception) {
    const message =
      exception.response?.data?.message ||
      exception.message ||
      "An unexpected error occurred.";
    toast.error(message);
    throw new Error(message);
  }

  // POST request
  async postRequest(url, data = {}, config = {}) {
    try {
      this.#configureRequest(config);
      const response = await axiosInstance.post(url, data, {
        headers: this.#headers,
        params: this.#params,
      });
      return response.data; // Return only response data
    } catch (exception) {
      this.#handleError(exception);
    }
  }

  // GET request
  async getRequest(url, config = {}) {
    try {
      this.#configureRequest(config);
      const response = await axiosInstance.get(url, {
        headers: this.#headers,
        params: this.#params,
      });
      return response.data; // Return only response data
    } catch (exception) {
      this.#handleError(exception);
    }
  }

  // PUT request
  async putRequest(url, data = {}, config = {}) {
    try {
      this.#configureRequest(config);
      const response = await axiosInstance.put(url, data, {
        headers: this.#headers,
        params: this.#params,
      });
      return response.data;
    } catch (exception) {
      this.#handleError(exception);
    }
  }

  // PATCH request
  async patchRequest(url, data = {}, config = {}) {
    try {
      this.#configureRequest(config);
      const response = await axiosInstance.patch(url, data, {
        headers: this.#headers,
        params: this.#params,
      });
      return response.data;
    } catch (exception) {
      this.#handleError(exception);
    }
  }

  // DELETE request
  async deleteRequest(url, config = {}) {
    try {
      this.#configureRequest(config);
      const response = await axiosInstance.delete(url, {
        headers: this.#headers,
        params: this.#params,
      });
      return response.data;
    } catch (exception) {
      this.#handleError(exception);
    }
  }
}

export default HttpService;
