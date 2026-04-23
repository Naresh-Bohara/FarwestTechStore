import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import {ProductCreateDto, ProductUpdateDto, ReviewCreateDto} from "./product.request.js";
import productCtrl from "./product.controller.js";

const productRouter = Router();

productRouter.get("/home-product", productCtrl.getForHomePage)
productRouter.get("/public/all", productCtrl.listAllPublicProducts);
productRouter.get("/:slug/by-slug", productCtrl.getDetailBySlug)
productRouter.get("/:id/user-review-count",checkLogin,checkPermission(['admin', 'customer']), productCtrl.getUserReviewCount
);

// group
productRouter.route("/")
        .post(checkLogin, checkPermission(['admin', 'seller']), uploadFile().array("images"), bodyValidator(ProductCreateDto), productCtrl.storeProduct)
        .get(checkLogin, checkPermission(['admin', 'seller']), productCtrl.listAllData);

productRouter.route("/:id")
        .get(checkLogin, checkPermission(['admin', 'seller']), productCtrl.getById)
        .put(checkLogin, checkPermission(['admin', 'seller']), uploadFile().array("images"), bodyValidator(ProductUpdateDto), productCtrl.updateProduct)
        .delete(checkLogin, checkPermission(['admin', 'seller']), productCtrl.deleteById);

productRouter.route("/:id/review")
.post(checkLogin, checkPermission(['admin', 'customer']), bodyValidator(ReviewCreateDto), productCtrl.addReview);
export default productRouter;