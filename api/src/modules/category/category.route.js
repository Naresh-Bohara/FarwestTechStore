import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import {CategoryCreateDto, CategoryUpdateDto} from "./category.request.js";
import categoryCtrl from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/home-category", categoryCtrl.getForHomePage)
categoryRouter.get("/home/with-products", categoryCtrl.getCategoriesWithProducts); 
categoryRouter.get("/:slug/by-slug", categoryCtrl.detailBySlug)

// group
categoryRouter.route("/")
        .post(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(CategoryCreateDto), categoryCtrl.storeCategory)
        .get(checkLogin, checkPermission(['admin']), categoryCtrl.listAllData);

categoryRouter.route("/:id")
        .get(checkLogin, checkPermission(['admin']), categoryCtrl.getById)
        .put(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(CategoryUpdateDto), categoryCtrl.updateCategory)
        .delete(checkLogin, checkPermission(['admin']), categoryCtrl.deleteById);

export default categoryRouter;