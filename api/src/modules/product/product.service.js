import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import FileUploadService from "../../services/cloudinary.service.js";
import ProductModel from "./product.model.js";
import slugify from "slugify";
import ReviewModel from "./review.model.js";

class ProductService {
    // Transform create product request
    transformProductCreateData = async (req) => {
        try {
            const data = req.body;
            const files = req.files;
            const images = [];

            if (files && files.length > 0) {
                for (const image of files) {
                    const uploadImage = await FileUploadService.uploadFile(image.path, "/product");
                    images.push(uploadImage);
                }
            }

            data.images = images;
            data.category = data.category || null;
            data.brand = data.brand || null;

            if (req.loggedInUser.role === "seller") {
                data.seller = req.loggedInUser._id;
            } else if (req.loggedInUser.role === "admin" && (!data.seller || data.seller.trim() === "")) {
                data.seller = null;
            }

            data.price = data.price * 100;
            data.actualAmount = data.price - (data.price * data.discount / 100);
            data.slug = slugify(data.title, { lower: true });
            data.createdBy = req.loggedInUser._id;

            return data;
        } catch (exception) {
            throw exception;
        }
    }

    // Transform update product request
    transformProductUpdateData = async (req, oldValue) => {
        try {
            const data = req.body;
            const files = req.files || [];
            const images = [];

            if (files.length > 0) {
                for (const image of files) {
                    const uploadImage = await FileUploadService.uploadFile(image.path, "/product");
                    images.push(uploadImage);
                }
            } else {
                images.push(...oldValue.images);
            }

            data.images = images;
            data.category = data.category || null;
            data.brand = data.brand || null;

            if (req.loggedInUser.role === "seller") {
                data.seller = req.loggedInUser._id;
            } else if (req.loggedInUser.role === "admin" && (!data.seller || data.seller === "")) {
                data.seller = null;
            }

            data.price = data.price * 100;
            data.actualAmount = data.price - (data.price * data.discount / 100);
            data.updatedBy = req.loggedInUser._id;

            return data;
        } catch (exception) {
            throw exception;
        }
    }

    // Create product
    createProduct = async (data) => {
        try {
            const productObj = new ProductModel(data);
            return await productObj.save();
        } catch (exception) {
            throw exception;
        }
    }

    // Count total products
    totalCount = async (filter) => {
        try {
            return await ProductModel.countDocuments(filter);
        } catch (exception) {
            throw exception;
        }
    }

    // List products with pagination and filter
    listAllProductData = async ({ limit = 10, skip = 0, filter = {} }) => {
        try {
            const products = await ProductModel.aggregate([
                { $match: filter },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "productId",
                        as: "reviews"
                    }
                },
                {
                    $addFields: {
                        avgRating: { $avg: "$reviews.rating" },
                        totalReviews: { $size: "$reviews" }
                    }
                },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit }
            ]);

            return products;
        } catch (exception) {
            throw exception;
        }
    };

    // ===== NEW PUBLIC METHOD FOR ALL PRODUCTS =====
listAllPublicProductData = async ({ limit = 12, skip = 0, filter = {}, sort = { createdAt: -1 } }) => {
    try {
        const products = await ProductModel.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "productId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    avgRating: { $avg: "$reviews.rating" },
                    totalReviews: { $size: "$reviews" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryData"
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brandData"
                }
            },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit }
        ]);

        return products;
    } catch (exception) {
        throw exception;
    }
};


    // Get product by ID
    getDataById = async (id) => {
        try {
            const product = await ProductModel.findById(id)
                .populate("category", ["_id", "title", "slug"])
                .populate("brand", ["_id", "title", "slug"])
                .populate("seller", ["_id", "name", "email", "role"])
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"]);

            if (!product) {
                throw {
                    status: HttpResponseCode.NOT_FOUND,
                    message: "Product doesn't exist.",
                    statusCode: HttpResponse.notFound
                };
            }

            return product;
        } catch (exception) {
            throw exception;
        }
    }

    // Get product by filter
    getSingleProductByFilter = async (filter) => {
        try {
            const product = await ProductModel.findOne(filter)
                .populate("category", ["_id", "title", "slug"])
                .populate("brand", ["_id", "title", "slug"])
                .populate("seller", ["_id", "name", "email", "role"])
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"]);

            if (!product) {
                throw {
                    status: HttpResponseCode.NOT_FOUND,
                    message: "Product doesn't exist.",
                    statusCode: HttpResponse.notFound
                };
            }

            return product;
        } catch (exception) {
            throw exception;
        }
    }

    // Update product by ID
    updateProductById = async (id, data) => {
        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(id, { $set: data }, { new: true });
            if (!productUpdate) {
                throw {
                    status: HttpResponseCode.BAD_REQUEST,
                    message: "Product can't be updated.",
                    statusCode: HttpResponse.product.update_error
                };
            }
            return productUpdate;
        } catch (exception) {
            throw exception;
        }
    }

    // Delete product by ID
    deleteById = async (id) => {
        try {
            const deleted = await ProductModel.findByIdAndDelete(id);
            if (!deleted) {
                throw {
                    status: HttpResponseCode.BAD_REQUEST,
                    message: "Product can't be deleted.",
                    statusCode: HttpResponse.product.delete_error
                };
            }
            return deleted;
        } catch (exception) {
            throw exception;
        }
    }

    // Count user reviews for a specific product
    countUserReviews = async (productId, userId) => {
        try {
            return await ReviewModel.countDocuments({ productId, reviewBy: userId });
        } catch (exception) {
            throw exception;
        }
    };

    // Transform review data
    transformReviewData = async (req, productId) => {
        try {
            const data = req.body;
            const rating = Math.min(Math.max(data.rating || 0, 1), 5);

            return {
                productId: productId,
                reviewBy: req.loggedInUser._id,
                rating: rating,
                reviewText: data.reviewText || ""
            };
        } catch (exception) {
            throw exception;
        }
    }

    // Check if product exists
    checkProductExists = async (productId) => {
        try {
            const product = await ProductModel.findById(productId).select("_id");
            return !!product; // returns true if found, false if not
        } catch (exception) {
            return false; // invalid ObjectId also treated as "not found"
        }
    };

    // Count user reviews for a specific product
    countUserReviews = async (productId, userId) => {
        try {
            return await ReviewModel.countDocuments({ productId, reviewBy: userId });
        } catch (exception) {
            throw exception;
        }
    };


    // Create review
    createReview = async (data) => {
        try {
            const reviewObj = new ReviewModel(data);
            return await reviewObj.save();
        } catch (exception) {
            throw exception;
        }
    }

    // Get reviews, avg rating, total reviews
    getReviewsByProductId = async (productId) => {
        try {
            const reviews = await ReviewModel.find({ productId })
                .populate("reviewBy", ["_id", "name", "email", "role", "image"])
                .sort({ createdAt: -1 });

            const formattedReviews = reviews.map(r => ({
                _id: r._id,
                reviewBy: r.reviewBy,
                rating: r.rating,
                review: r.reviewText || "",
                createdAt: r.createdAt
            }));

            const avgRating = reviews.length
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : 0;

            return { reviews: formattedReviews, avgRating, totalReviews: reviews.length };
        } catch (exception) {
            throw exception;
        }
    }
}

const productSvc = new ProductService();
export default productSvc;
