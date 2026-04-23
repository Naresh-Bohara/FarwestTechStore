import e from "express";
import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "./product.service.js";

class ProductController {
    storeProduct = async (req, res, next) => {
        try {
            // transfer data
            // DB store
            // respond
            let data = await productSvc.transformProductCreateData(req);
            let productObj = await productSvc.createProduct(data);
            res.json({
                data: productObj,
                message: "Product Created Successfully!",
                status: HttpResponse.product.create_success,
                options: null
            })

        } catch (exception) {
            console.log("StoreProduct", exception);
            next(exception);
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const productExists = await productSvc.getDataById(req.params.id);
            const data = await productSvc.transformProductUpdateData(req, productExists);
            const updated = await productSvc.updateProductById(req.params.id, data)
            res.json({
                data: updated,
                message: "Product Updated Successfully.",
                status: HttpResponse.product.update_success,
                options: null
            })
        } catch (exception) {
            console.log("updateProduct: ", exception);
            next(exception);
        }
    }

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
                        { title: new RegExp(req.query.keyword, 'i') },
                        { description: new RegExp(req.query.keyword, 'i') },
                    ]
                }
            }

            let data = await productSvc.listAllProductData({
                limit: limit,
                skip: skip,
                filter: filter
            });

            let totalCount = await productSvc.totalCount(filter)
            res.json({
                data: data,
                message: "Product List",
                status: "PRODUCT_LIST_SUCCESS",
                options: {
                    page: page,
                    limit: limit,
                    total: totalCount
                }
            })
        } catch (exception) {
            console.log("ListAllData: ", exception);
            next(exception);
        }
    }

    // ===== NEW PUBLIC METHOD FOR ALL PRODUCTS PAGE =====
listAllPublicProducts = async (req, res, next) => {
    try {
        // pagination
        let page = +req.query.page || 1;
        let limit = +req.query.limit || 12;
        let skip = (page - 1) * limit;

        // filter - ONLY ACTIVE PRODUCTS
        let filter = { status: "active" };
        
        // search by keyword
        if (req.query.keyword) {
            filter.$or = [
                { title: new RegExp(req.query.keyword, 'i') },
                { description: new RegExp(req.query.keyword, 'i') },
            ];
        }
        
        // filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }
        
        // filter by brand
        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        // sorting
        let sort = { createdAt: -1 }; // default: newest first
        if (req.query.sort) {
            switch(req.query.sort) {
                case 'price-low':
                    sort = { price: 1 };
                    break;
                case 'price-high':
                    sort = { price: -1 };
                    break;
                case 'name-asc':
                    sort = { title: 1 };
                    break;
                case 'name-desc':
                    sort = { title: -1 };
                    break;
                case 'rating':
                    sort = { avgRating: -1 };
                    break;
            }
        }

        let data = await productSvc.listAllPublicProductData({
            limit: limit,
            skip: skip,
            filter: filter,
            sort: sort
        });

        let totalCount = await productSvc.totalCount(filter);
        
        res.json({
            data: data,
            message: "Products fetched successfully",
            status: "PRODUCT_LIST_SUCCESS",
            options: {
                page: page,
                limit: limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    } catch (exception) {
        console.log("listAllPublicProducts: ", exception);
        next(exception);
    }
};

    getById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = await productSvc.getDataById(id);
            res.json({
                data: data,
                message: "Product Detail",
                status: "PRODUCT_DETAIL",
                options: null,
            })
        } catch (exception) {
            console.log("getById: ", exception);
            next(exception)
        }
    }

    deleteById = async (req, res, next) => {
        try {
            const productExists = await productSvc.getDataById(req.params.id);
            let deletedData = await productSvc.deleteById(req.params.id)

            res.json({
                data: deletedData,
                message: "Product Deleted Successfully.",
                status: HttpResponse.product.delete_success,
                options: null
            })

        } catch (exception) {
            console.log("deleteById: ", exception);
            next(exception);
        }
    }

    getForHomePage = async (req, res, next) => {
        try {
            let data = await productSvc.listAllProductData({
                limit: 16,
                page: 1,
                filter: {
                    status: "active",
                }
            })
            res.json({
                data: data,
                message: "Product List For Home page.",
                status: HttpResponse.product.list_for_home,
                options: null,
            })
        } catch (exception) {
            console.log("getForHomePage: ", exception);
            next(exception);
        }
    }

    getDetailBySlug = async (req, res, next) => {
        try {
            const slug = req.params.slug;

            // Get product detail
            const productDetail = await productSvc.getSingleProductByFilter({
                slug: slug,
                status: "active"
            });

            // Get related products
            const related = await productSvc.listAllProductData({
                skip: 0,
                limit: 8,
                filter: {
                    slug: { $ne: slug },
                    status: "active",
                    category: productDetail.category._id
                }
            });

            // Get reviews for this product
            const { reviews, avgRating, totalReviews } = await productSvc.getReviewsByProductId(productDetail._id);

            // Send response
            res.json({
                data: {
                    detail: productDetail,
                    related: related,
                    reviews: reviews.length ? reviews : [], // empty array if no reviews
                    avgRating: parseFloat(avgRating), // convert string to number if needed
                    totalReviews: totalReviews
                },
                message: "Product detail.",
                status: HttpResponse.product.list_success
            });
        } catch (exception) {
            console.log("getDetailBySlug: ", exception);
            next(exception);
        }
    };


    addReview = async (req, res, next) => {
        try {
            const productId = req.params.id;
            const userId = req.loggedInUser._id;

            // Check if product exists
            const productExists = await productSvc.checkProductExists(productId);
            if (!productExists) {
                return res.status(404).json({
                    message: "Product not found.",
                    status: HttpResponse.product.not_found,
                    options: null
                });
            }

            // Check how many reviews user already has for this product
            const existingReviews = await productSvc.countUserReviews(productId, userId);

            if (existingReviews >= 3) {
                return res.status(400).json({
                    message: "You can only add up to 3 reviews per product.",
                    status: HttpResponse.review.limit_exceeded,
                    options: null
                });
            }

            // Transform request data
            const reviewData = await productSvc.transformReviewData(req, productId);

            // Save review
            const createdReview = await productSvc.createReview(reviewData);

            res.json({
                data: createdReview,
                message: "Review added successfully!",
                status: HttpResponse.review.create_success,
                options: null
            });
        } catch (exception) {
            console.log("addReview: ", exception);
            next(exception);
        }
    };

    // Get user review count for a product
    getUserReviewCount = async (req, res, next) => {
        try {
            const productId = req.params.id;
            const userId = req.loggedInUser._id;

            // Check if product exists
            const productExists = await productSvc.checkProductExists(productId);
            if (!productExists) {
                return res.status(404).json({
                    message: "Product not found.",
                    status: HttpResponse.product.not_found,
                    options: null
                });
            }

            const count = await productSvc.countUserReviews(productId, userId);

            res.json({
                data: { count },
                message: "User review count fetched successfully",
                status: HttpResponse.success,
                options: null,
            });
        } catch (exception) {
            console.log("getUserReviewCount: ", exception);
            next(exception);
        }
    };



}

const productCtrl = new ProductController();

export default productCtrl;