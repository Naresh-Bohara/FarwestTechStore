import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import { AddToCartDTO, CheckoutDTO, RemoveFromCartDTO } from "./order.request.js";
import orderCtrl from "./order.controller.js";
import { uploadFile } from "../../middlewares/multipart-parser.middleware.js";

const orderRouter = Router();

// CUSTOMER ROUTES
orderRouter.get("/my", checkLogin, orderCtrl.getMyOrders);

orderRouter.get(
  "/my-cart",
  checkLogin,
  checkPermission(["customer", "admin"]),
  orderCtrl.viewAllCartItems
);

orderRouter.post(
  "/add-to-cart",
  checkLogin,
  checkPermission(["customer", "admin"]),
  bodyValidator(AddToCartDTO),
  orderCtrl.addToCart
);

orderRouter.put(
  "/remove-cart-item",
  checkLogin,
  checkPermission(["customer", "admin"]),
  bodyValidator(RemoveFromCartDTO),
  orderCtrl.removeFromCart
);

orderRouter.post(
  "/checkout",
  checkLogin,
  checkPermission(["customer", "admin"]),
  bodyValidator(CheckoutDTO),
  orderCtrl.checkout
);

orderRouter.post(
  "/qr-payment",
  checkLogin,
  checkPermission(["customer", "admin"]),
  uploadFile("image").single("paymentScreenshot"),
  orderCtrl.qrCheckout
);


// SELLER ROUTES
orderRouter.get(
  "/seller/orders",
  checkLogin,
  checkPermission(["seller"]),
  orderCtrl.getSellerOrders
);

// ADMIN ROUTES

orderRouter.get(
  "/all",
  checkLogin,
  checkPermission(["admin"]),
  orderCtrl.getAllOrders
);

orderRouter.put(
  "/:id/status",
  checkLogin,
  checkPermission(["admin"]),
  orderCtrl.updateOrderStatus
);

orderRouter.put(
  "/:id/verify-payment",
  checkLogin,
  checkPermission(["admin"]),
  orderCtrl.verifyPayment
);

orderRouter.put(
  "/:id/cancel",
  checkLogin,
  checkPermission(["admin"]),
  orderCtrl.cancelOrder
);

// DYNAMIC ROUTE (ALWAYS LAST)
orderRouter.get("/:id", checkLogin, orderCtrl.getSingleOrder);

export default orderRouter;