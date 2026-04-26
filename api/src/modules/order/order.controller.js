import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "../product/product.service.js";
import orderSvc from "./order.service.js";

class OrderController {
    // Add product to cart
    addToCart = async (req, res, next) => {
        try {
            const { productId, quantity } = req.body;
            const productDetail = await productSvc.getSingleProductByFilter({
                _id: productId,
                status: "active"
            });

            // Buyer
            const buyer = req.loggedInUser;

            // Existing cart
            const existingCart = await orderSvc.findSingleCartItemByFilter({
                buyerId: buyer._id,
                productId: productId,
                orderId: null
            });

            let cart = null;
            if (existingCart) {
                // Update cart with quantity
                let qty = quantity + existingCart.quantity;
                const updateBody = {
                    amount: productDetail.actualAmount * qty,
                    quantity: qty
                };
                cart = await orderSvc.updateCartById(existingCart._id, updateBody);
                res.json({
                    detail: cart,
                    message: "Cart updated successfully.",
                    status: HttpResponse.cart.cart_update_success,
                    options: null
                });
            } else {
                // Create cart
                const cartItem = {
                    orderId: null,
                    productId: productId,
                    buyerId: buyer._id,
                    quantity: quantity,
                    price: productDetail.actualAmount,
                    amount: productDetail.actualAmount * quantity,
                    status: "new",
                    seller: productDetail?.seller?._id
                };
                cart = await orderSvc.createCartItem(cartItem);
                res.json({
                    detail: cart,
                    message: "Product added to the cart.",
                    status: HttpResponse.cart.create_cart_success,
                    options: null
                });
            }
        } catch (exception) {
            next(exception);
        }
    };

    // View all cart items
    viewAllCartItems = async (req, res, next) => {
        try {
            const loggedInUser = req.loggedInUser;
            let filter = {
                orderId: null
            };

            if (loggedInUser.role === "customer") {
                filter = {
                    ...filter,
                    buyerId: loggedInUser._id
                };
            }

            const allCartItems = await orderSvc.findCartByFilter(filter);
            res.json({
                detail: allCartItems,
                message: "All cart items.",
                status: HttpResponse.cart.all_cart_list,
                options: null
            });
        } catch (exception) {
            next(exception);
        }
    };

    // Remove item from cart
    removeFromCart = async (req, res, next) => {
        try {
            const { cartId, quantity } = req.body;
            const cartItem = await orderSvc.findSingleCartItemByFilter({
                _id: cartId
            });

            if (!cartItem) {
                throw { status: 400, message: "Cart item doesn't exist.", code: HttpResponse.cart.cart_not_found };
            }

            if (quantity <= 0 || cartItem.quantity === quantity) {
                let removed = await orderSvc.removeCartByFilter({ _id: cartId });
                res.json({
                    detail: removed,
                    message: "Cart item removed.",
                    status: HttpResponse.cart.remove_success,
                    options: null
                });
            } else {
                if (cartItem.quantity < quantity) {
                    throw { status: 400, message: "Quantity should be less than or equal to the current quantity in the cart.", code: HttpResponse.cart.cart_not_found };
                }
                let updateBody = {
                    quantity: cartItem.quantity - quantity,
                    amount: cartItem.productId.actualAmount * (cartItem.quantity - quantity)
                };
                const updatedData = await orderSvc.updateCartById(cartItem._id, updateBody);
                res.json({
                    detail: updatedData,
                    message: "Cart item updated.",
                    status: HttpResponse.cart.remove_success,
                    options: null
                });
            }
        } catch (exception) {
            next(exception);
        }
    };

    // Checkout and place order
    checkout = async (req, res, next) => {
        try {
            const { cartId, discount } = req.body;
            const cartDetails = await orderSvc.findCartByFilter({
                _id: { $in: cartId },
                orderId: null
            });

            if (!cartDetails || cartId.length !== cartDetails.length) {
                throw {
                    status: HttpResponseCode.BAD_REQUEST,
                    message: "Order has already been placed.",
                    code: HttpResponse.cart.cart_not_found
                }
            }

            const loggedInUser = req.loggedInUser;

            let subtotal = 0;
            cartDetails.forEach((cart) => {
                subtotal += cart.productId.actualAmount * cart.quantity;
            });

            // let tax = ((subtotal - discount) * process.env.TAX_AMOUNT)
            let tax = 0

            const total = (subtotal - discount + tax + 100)

            const orderData = {
                buyerId: loggedInUser._id,
                subtotal: subtotal,
                discount: discount,
                tax: tax,
                serviceCharge: 100,
                total: total,
                orderDate: new Date(),
                cartItems: cartId,
                status: "new",
                createdBy: loggedInUser._id
            };

            const orderObj = await orderSvc.createOrder(orderData);

            const updateCartItems = cartDetails.map((cart) => {
                cart.orderId = orderObj._id;
                cart.price = cart.productId.actualAmount;
                cart.amount = cart.productId.actualAmount * cart.quantity;
                cart.status = "ordered";
                cart.updatedBy = loggedInUser._id;
                return cart.save();
            });

            await Promise.all(updateCartItems);

            await orderSvc.sendOrderConfirmationEmail(loggedInUser, orderObj);

            res.json({
                detail: orderObj,
                message: "Your order has been placed successfully.",
                status: HttpResponse.cart.order_placed,
                options: null
            });
        } catch (exception) {
            next(exception);
        }
    };

    getMyOrders = async (req, res, next) => {
        try {
            const user = req.loggedInUser;

            let orders;

            if (user.role === "admin") {
                orders = await orderSvc.getAllOrders();
            }

            else if (user.role === "customer") {
                orders = await orderSvc.getAllOrders({
                    buyerId: user._id
                });
            }

            else if (user.role === "seller") {
                orders = await orderSvc.getAllOrders({}, user._id);
            }

            return res.json({
                detail: orders,
                message: "Your orders!",
                status: "YOUR_ORDERS",
                options: null
            });

        } catch (err) {
            next(err);
        }
    };

    qrCheckout = async (req, res, next) => {
        try {
            console.log("BODY:", req.body);
            console.log("FILE IN CONTROLLER:", req.file);  // 👈 ADD THIS
            const data = {
                body: req.body,
                file: req.file,
                user: req.loggedInUser
            };

            const order = await orderSvc.qrCheckout(data);

            res.json({
                detail: order,
                message: "Order placed. Waiting for verification.",
                status: "QR_ORDER_PLACED",
                options: null
            });

        } catch (err) {
            next(err);
        }
    };

    getSingleOrder = async (req, res, next) => {
    try {
        const user = req.loggedInUser;
        const orderId = req.params.id;

        const order = await orderSvc.getOrderById(orderId);

        if (!order) {
            return res.status(404).json({
                detail: null,
                message: "Order not found",
                status: "ORDER_NOT_FOUND",
                options: null
            });
        }

        // 🔐 ROLE-BASED ACCESS CONTROL

        // admin can see everything
        if (user.role === "admin") {
            return res.json({
                detail: order,
                message: "Order detail fetched",
                status: "ORDER_DETAIL",
                options: null
            });
        }

        // customer can only see their own order
        if (user.role === "customer") {
            if (order.buyerId.toString() !== user._id.toString()) {
                return res.status(403).json({
                    detail: null,
                    message: "Not allowed to access this order",
                    status: "FORBIDDEN",
                    options: null
                });
            }
        }

        // seller can see only orders containing their items
        if (user.role === "seller") {
            const hasSellerItem = order.items.some(
                (item) => item.seller.toString() === user._id.toString()
            );

            if (!hasSellerItem) {
                return res.status(403).json({
                    detail: null,
                    message: "Not allowed to access this order",
                    status: "FORBIDDEN",
                    options: null
                });
            }
        }

        return res.json({
            detail: order,
            message: "Order detail fetched",
            status: "ORDER_DETAIL",
            options: null
        });

    } catch (err) {
        next(err);
    }
};

updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const allowedStatus = [
            "new",
            "pending",
            "processing",
            "shipped",
            "completed",
            "cancelled"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                detail: null,
                message: "Invalid status value",
                status: "INVALID_STATUS",
                options: allowedStatus
            });
        }

        const order = await orderSvc.updateOrderById(orderId, {
            status,
            updatedBy: req.loggedInUser._id
        });

        if (!order) {
            return res.status(404).json({
                detail: null,
                message: "Order not found",
                status: "ORDER_NOT_FOUND",
                options: null
            });
        }

        return res.json({
            detail: order,
            message: "Order status updated successfully",
            status: "ORDER_STATUS_UPDATED",
            options: null
        });

    } catch (err) {
        next(err);
    }
};

verifyPayment = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { paymentStatus } = req.body; 
        // expected: "paid" | "failed"

        const allowedStatus = ["paid", "failed"];

        if (!allowedStatus.includes(paymentStatus)) {
            return res.status(400).json({
                detail: null,
                message: "Invalid payment status",
                status: "INVALID_PAYMENT_STATUS",
                options: allowedStatus
            });
        }

        const order = await orderSvc.updateOrderById(orderId, {
            paymentStatus,
            status: paymentStatus === "paid" ? "processing" : "cancelled",
            updatedBy: req.loggedInUser._id
        });

        if (!order) {
            return res.status(404).json({
                detail: null,
                message: "Order not found",
                status: "ORDER_NOT_FOUND",
                options: null
            });
        }

        return res.json({
            detail: order,
            message:
                paymentStatus === "paid"
                    ? "Payment verified successfully"
                    : "Payment rejected and order cancelled",
            status: "PAYMENT_VERIFIED",
            options: null
        });

    } catch (err) {
        next(err);
    }
};


cancelOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        const order = await orderSvc.updateOrderById(orderId, {
            status: "cancelled",
            paymentStatus: "failed",
            updatedBy: req.loggedInUser._id
        });

        if (!order) {
            return res.status(404).json({
                detail: null,
                message: "Order not found",
                status: "ORDER_NOT_FOUND",
                options: null
            });
        }

        return res.json({
            detail: order,
            message: "Order cancelled successfully",
            status: "ORDER_CANCELLED",
            options: null
        });

    } catch (err) {
        next(err);
    }
};

getAllOrders = async (req, res, next) => {
  try {
    const user = req.loggedInUser;

    if (user.role !== "admin") {
      return res.status(403).json({
        detail: null,
        message: "Access denied",
        status: "FORBIDDEN",
        options: null
      });
    }

    const { status, page = 1, limit = 10 } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const { data, total } = await orderSvc.getAllOrders(
      filter,
      null,
      parsedPage,
      parsedLimit
    );

    return res.json({
      detail: data,
      message: "All orders fetched successfully",
      status: "ALL_ORDERS",
      options: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit)
      }
    });

  } catch (err) {
    next(err);
  }
};

getSellerOrders = async (req, res, next) => {
    try {
        const sellerId = req.loggedInUser._id;

        const orders = await orderSvc.getAllOrders({}, sellerId);

        return res.json({
            detail: orders,
            message: "Seller orders fetched successfully",
            status: "SELLER_ORDERS",
            options: null
        });

    } catch (err) {
        next(err);
    }
};

}

const orderCtrl = new OrderController();
export default orderCtrl;
