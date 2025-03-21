import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import {BrandCreateDto, BrandUpdateDto} from "./brand.request.js";
import brandCtrl from "./brand.controller.js";

const brandRouter = Router();

brandRouter.get("/home-brand", brandCtrl.getForHomePage);
brandRouter.get("/:slug/by-slug", brandCtrl.getDetailBySlug)

// group
brandRouter.route("/")
        .post(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(BrandCreateDto), brandCtrl.storeBrand)
        .get(checkLogin, checkPermission(['admin']), brandCtrl.listAllData);

brandRouter.route("/:id")
        .get(checkLogin, checkPermission(['admin']), brandCtrl.getById)
        .put(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(BrandUpdateDto), brandCtrl.updateBrand)
        .delete(checkLogin, checkPermission(['admin']), brandCtrl.deleteById);

export default brandRouter;