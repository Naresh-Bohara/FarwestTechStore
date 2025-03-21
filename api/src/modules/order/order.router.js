import { Router } from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";
import { AddToCartDTO, CheckoutDTO, RemoveFromCartDTO, TransactionDTO } from "./order.request.js";
import orderCtrl from "./order.controller.js";

const orderRouter = Router();

orderRouter.post("/add-to-cart", checkLogin, checkPermission(['customer', 'admin']), bodyValidator(AddToCartDTO), orderCtrl.addToCart)

orderRouter.get("/my-cart", checkLogin, checkPermission(['customer', 'admin']), orderCtrl.viewAllCartItems)

orderRouter.put("/remove-from-cart", checkLogin, checkPermission(['customer', 'admin']), bodyValidator(RemoveFromCartDTO), orderCtrl.removeFromCart)

orderRouter.post("/checkout", checkLogin, checkPermission(['customer', 'admin']), bodyValidator(CheckoutDTO), orderCtrl.checkout) 

orderRouter.get("/all-list", checkLogin, orderCtrl.getMyOrders)

orderRouter.post("/:id/transaction", checkLogin, checkPermission(['customer', 'admin']), bodyValidator(TransactionDTO), orderCtrl.createTransaction)

export default orderRouter;