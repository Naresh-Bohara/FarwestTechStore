import HttpResponseCode from "../../constants/http-status-code.contants.js";
import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "../product/product.service.js";
import orderSvc from "./order.service.js";

class OrderController {
    // Add product to cart
    addToCart = async(req, res, next) => {
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
    viewAllCartItems = async(req, res, next) => {
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
    removeFromCart = async(req, res, next) => {
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

            if(!cartDetails || cartId.length !==cartDetails.length){
                throw{
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
    
            let tax = ((subtotal - discount ) * process.env.TAX_AMOUNT) 
    
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

    getMyOrders = async (req, res, next)=>{
        try{
            const loggedInUser = req. loggedInUser;

            if(loggedInUser.role === 'admin'){
                // all the orders
                const allOrders = await orderSvc.getAllOrders(); //pagination do here
                res.json({
                    detail: allOrders,
                    message: "Your orders!",
                    status: "YOUR_ORDERS",
                    options: null
                })
            } else if(loggedInUser.role === 'customer'){
                const allOrders = await orderSvc.getAllOrders({
                    buyerId: loggedInUser._id
                }); 
                res.json({
                    detail: allOrders,
                    message: "Your orders!",
                    status: "YOUR_ORDERS",
                    options: null
                })
            } else if(loggedInUser.role === 'seller'){
               const allOrders = await orderSvc.findCartByFilter({
                orderId: {$ne: null},
                seller: loggedInUser._id
               })

               res.json({
                detail: allOrders,
                message: "Your orders!",
                status: "YOUR_ORDERS",
                options: null
            })
            }
        }catch(exception){
            next(exception);
        }
    }

    createTransaction = async(req, res, next)=>{
        try{
            const orderId = req.params.id;
            console.log(orderId)
            const data = req.body;
            data.createdBy = req.loggedInUser._id
            
            const transaction = await orderSvc.createTransaction(orderId, data);
            res.json({
                detail: transaction,
                message: "Your order has been paid",
                status: "ORDER_PAID",
                options: null
            })
        }catch(exception){
            next(exception);
        }
    }
    
}

const orderCtrl = new OrderController();
export default orderCtrl;
