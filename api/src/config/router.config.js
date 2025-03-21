//global route

import { Router } from "express";
import authRouter from "../modules/auth/auth.router.js";
import bannerRouter from "../modules/banner/banner.route.js";
import brandRouter from "../modules/brand/brand.route.js";
import categoryRouter from "../modules/category/category.route.js";
import productRouter from "../modules/product/product.route.js";
import orderRouter from "../modules/order/order.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

export default router;