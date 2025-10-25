import HttpService from "../../services/http.service";

class ProductService extends HttpService {
  productCreate = async (data) => {
    try {
      const response = await this.postRequest("/product", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getProductList = async ({ page = 1, limit = 10, search = null }) => {
    try {
      let params = {};
      if (search) params.keyword = search;

      const response = await this.getRequest("/product", {
        auth: true,
        params: { ...params, page, limit },
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  deleteProduct = async (productId) => {
    try {
      const response = await this.deleteRequest("/product/" + productId, {
        auth: true,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getProductDetailById = async (id) => {
    try {
      const response = await this.getRequest("/product/" + id, { auth: true });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  productEdit = async (id, data) => {
    try {
      const response = await this.putRequest("/product/" + id, data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getProductForHomePage = async () => {
    try {
      const response = await this.getRequest("/product/home-product");
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getProductBySlug = async (slug) => {
    try {
      const response = await this.getRequest("/product/" + slug + "/by-slug");
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  // ====== New methods for Reviews ======

  // Add review
  addReview = async (productId, data) => {
    try {
      const response = await this.postRequest(`/product/${productId}/review`, data, {
        auth: true,
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  // Get how many reviews logged-in user has for a product
  getUserReviewCount = async (productId) => {
    try {
      const response = await this.getRequest(`/product/${productId}/user-review-count`, {
        auth: true,
      });
      return response.data.count || 0;
    } catch (exception) {
      console.log(exception);
      return 0;
    }
  };
}

const productSvc = new ProductService();

export default productSvc;
