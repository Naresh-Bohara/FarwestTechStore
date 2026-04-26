import HttpService from "../../services/http.service";

class OrderService extends HttpService {

  //  get my orders (customer/seller/admin based on backend logic)
  getMyOrders = async () => {
    try {
      const response = await this.getRequest("/order/my", {
        auth: true
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  //  get single order
  getOrderById = async (id) => {
    try {
      const response = await this.getRequest(`/order/${id}`, {
        auth: true
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  //  admin: get all orders
  getAllOrders = async (query = "") => {
    try {
      const response = await this.getRequest(`/order/all${query}`, {
        auth: true
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  //  update order status (admin)
  updateOrderStatus = async (id, data) => {
    try {
      const response = await this.putRequest(`/order/${id}/status`, data, {
        auth: true
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  //  verify payment (admin)
  verifyPayment = async (id, data) => {
    try {
      const response = await this.putRequest(
        `/order/${id}/verify-payment`,
        data,
        { auth: true }
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  //  cancel order (admin only for now)
  cancelOrder = async (id) => {
    try {
      const response = await this.putRequest(`/order/${id}/cancel`, {}, {
        auth: true
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

}

const orderSvc = new OrderService();
export default orderSvc;