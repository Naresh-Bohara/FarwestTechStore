import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "../product/product.service.js";
import brandSvc from "./brand.service.js";

class BrandController {
  storeBrand = async (req, res, next) => {
    try {
      // transfer data
      // DB store
      // respond
      let data = await brandSvc.transformBrandCreateData(req);
      let brandObj = await brandSvc.createBrand(data);
      res.json({
        data: brandObj,
        message: "Brand Created Successfully!",
        status: HttpResponse.brand.create_success,
        options: null,
      });
    } catch (exception) {
      console.log("StoreBrand", exception);
      next(exception);
    }
  };

  updateBrand = async (req, res, next) => {
    try {
      const brandExists = await brandSvc.getDataById(req.params.id);
      const data = await brandSvc.transformBrandUpdateData(req, brandExists);
      const updated = await brandSvc.updateBrandById(req.params.id, data);
      res.json({
        data: updated,
        message: "Brand Updated Successfully.",
        status: HttpResponse.brand.update_success,
        options: null,
      });
    } catch (exception) {
      console.log("updateBrand: ", exception);
      next(exception);
    }
  };

  listAllData = async (req, res, next) => {
    try {
      // pagination
      let page = +req.query.page || 1;
      let limit = +req.query.limit || 10;
      let skip = (page - 1) * limit;

      // filter
      let filter = {};
      if (req.query.keyword) {
        filter = {
          $or: [
            { title: new RegExp(req.query.keyword, "i") },
            { description: new RegExp(req.query.keyword, "i") },
          ],
        };
      }

      let data = await brandSvc.listAllBrandData({
        limit: limit,
        skip: skip,
        filter: filter,
      });

      let totalCount = await brandSvc.totalCount(filter);
      res.json({
        data: data,
        message: "Brand List",
        status: "BRAND_LIST_SUCCESS",
        options: {
          page: page,
          limit: limit,
          total: totalCount,
        },
      });
    } catch (exception) {
      console.log("ListAllData: ", exception);
      next(exception);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await brandSvc.getDataById(id);
      res.json({
        data: data,
        message: "Brand Detail",
        status: "BANNER_DETAIL",
        options: null,
      });
    } catch (exception) {
      console.log("getById: ", exception);
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      const brandExists = await brandSvc.getDataById(req.params.id);
      let deletedData = await brandSvc.deleteById(req.params.id);

      res.json({
        data: deletedData,
        message: "Brand Deleted Successfully.",
        status: HttpResponse.brand.delete_success,
        options: null,
      });
    } catch (exception) {
      console.log("deleteById: ", exception);
      next(exception);
    }
  };

  getForHomePage = async (req, res, next) => {
    try {
      let data = await brandSvc.listAllBrandData({
        limit: 16,
        page: 1,
        filter: {
          status: "active",
        },
      });
      res.json({
        data: data,
        message: "Brand List For Home page.",
        status: HttpResponse.brand.list_for_home,
        options: null,
      });
    } catch (exception) {
      console.log("getForHomePage: ", exception);
      next(exception);
    }
  };

  getBrandsWithProducts = async (req, res, next) => {
  try {
    // Get active brands for homepage
    const brands = await brandSvc.listAllBrandData({
      limit: 8, // Show 8 brands on homepage
      skip: 0,
      filter: { status: "active" }
    });

    // For each brand, fetch 4 products with reviews
    const brandsWithProducts = await Promise.all(
      brands.map(async (brand) => {
        const products = await productSvc.listAllProductData({
          limit: 4, // Show 4 products per brand
          skip: 0,
          filter: {
            status: "active",
            brand: brand._id
          }
        });
        
        return {
          _id: brand._id,
          title: brand.title,
          slug: brand.slug,
          image: brand.image,
          description: brand.description,
          products: products.map(product => ({
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            discount: product.discount,
            actualAmount: product.actualAmount,
            images: product.images,
            avgRating: product.avgRating || 0,
            totalReviews: product.totalReviews || 0
          }))
        };
      })
    );

    res.json({
      data: brandsWithProducts,
      message: "Brands with products fetched successfully",
      status: "BRAND_PRODUCTS_SUCCESS",
      options: null
    });
  } catch (exception) {
    console.log("getBrandsWithProducts: ", exception);
    next(exception);
  }
};

  getDetailBySlug = async (req, res, next) => {
    try {
      const slug = req.params.slug;
      // const products = await brandSvc.getBrandWithProductBySlug(slug)
      const brandDetail = await brandSvc.getSingleBrandByFilter({ slug: slug });

      let page = +req.query.page || 1;
      let limit = +req.query.limit || 10;
      let skip = (page - 1) * limit;

      // filter
      let filter = {
        status: "active",
        brand: brandDetail._id
      };
      if (req.query.keyword) {
        filter = {
          ...filter,
          $or: [
            { title: new RegExp(req.query.keyword, "i") },
            { description: new RegExp(req.query.keyword, "i") },
          ],
        };
      }

      const totalCount = await productSvc.totalCount(filter);

      const products = await productSvc.listAllProductData({
        limit: limit,
        skip: skip,
        filter: filter,
      });

      res.json({
        data: {
          detail: brandDetail,
          products: products,
        },
        message: "Brand detail.",
        status: HttpResponse.brand.list_for_home,
        options: {
          page: page,
          limit: limit,
          totalCount: totalCount,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const brandCtrl = new BrandController();

export default brandCtrl;
