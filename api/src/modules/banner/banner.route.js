import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import {BannerCreateDto, BannerUpdateDto} from "./banner.request.js";
import bannerCtrl from "./banner.controller.js";

const bannerRouter = Router();

bannerRouter.get("/home-banner", bannerCtrl.getForHomePage)

// group
bannerRouter.route("/")
        .post(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(BannerCreateDto), bannerCtrl.storeBanner)
        .get(checkLogin, checkPermission(['admin']), bannerCtrl.listAllData);

bannerRouter.route("/:id")
        .get(checkLogin, checkPermission(['admin']), bannerCtrl.getById)
        .put(checkLogin, checkPermission(['admin']), uploadFile().single("image"), bodyValidator(BannerUpdateDto), bannerCtrl.updateBanner)
        .delete(checkLogin, checkPermission(['admin']), bannerCtrl.deleteById);

export default bannerRouter;