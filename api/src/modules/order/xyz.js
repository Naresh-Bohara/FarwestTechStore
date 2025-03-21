import HttpResponse from "../../constants/response-status.contants.js";
import productSvc from "../product/product.service.js";
import orderSvc from "./order.service.js";

class OrderController {
    addToCart = async(req, res, next)=>{
        try{
            const {productId, quantity} = req.body;
            const productDetail = await productSvc.getSingleProductByFilter({
                _id: productId,
                status: "active"
            })

            // buyer
            const buyer = req.loggedInUser

            // existing cart
            const existingCart = await orderSvc.findSingleCartItemByFilter({
                buyerId: buyer._id,
                productId: productId,
                orderId: null 
            })
            let cart = null;
            if(existingCart){
                // update cart with quantity
                let qty = quantity + existingCart.quantity
                const updateBody = {
                    amount: productDetail.actualAmount * qty,
                    quantity: qty
                }
                cart = await orderSvc.updateCartById(existingCart._id, updateBody)
                res.json({
                    detail: cart,
                    message: "Cart updated successfully.",
                    status: HttpResponse.cart.cart_update_success,
                    options: null
                })
            }else{
                // create cart
                const cartItem = {
                    orderId: null,
                    productId: productId,
                    buyerId: buyer._id,
                    quantity: quantity,
                    price: productDetail.actualAmount,
                    amount: productDetail.actualAmount * quantity,
                    status: "new",
                    seller: productDetail?.seller?._id
                }
                cart = await orderSvc.createCartItem(cartItem); 
                res.json({
                    detail: cart,
                    message: "Product added in the cart",
                    status: HttpResponse.cart.create_cart_success,
                    options: null
                })
            }
        }catch(exception){
            next(exception);
        }
    }

    viewAllCartItems = async (req, res, next)=>{
        try{
            const loggedInuser = req.loggedInUser;
            let filter = {
                orderId: null
            }
            if(loggedInuser.role === "customer"){
                filter = {
                    ...filter,
                    buyerId: loggedInuser._id
                }
            }

            const allCartItems = await orderSvc.findCartByFilter(filter);
            res.json({
                detail: allCartItems,
                message: "All cart items.",
                status: HttpResponse.cart.all_cart_list,
                options: null
            })
        }catch(exception){
            next(exception);
        }
    }

    removeFromCart = async(req, res, next)=>{
        try{
            const {cartId, quantity} = req.body;
            const cartItem = await orderSvc.findSingleCartItemByFilter({
                _id: cartId
            })
            if(!cartItem){
                throw {status: 400, message: "Cart doesn't exists.", code: HttpResponse.cart.cart_not_found}
            }

            if(quantity <= 0 || cartItem.quantity === quantity){
               let removed = await orderSvc.removeCartByFilter({_id: cartId})
               res.json({
                detail: removed,
                message: "Cart item removed.",
                status: HttpResponse.cart.remove_success,
                options: null
               })
            }else{
                if(cartItem.quantity < quantity){
                    throw {status: 400, message: "Quantity should be less or equal to current quantity in the cart.", code: HttpResponse.cart.cart_not_found}
                }
                let updateBody = {
                    quantity: cartItem.quantity - quantity,
                    amount: cartItem.productId.actualAmount * (cartItem.quantity - quantity)
                }
                const updatedata = await orderSvc.updateCartById(cartItem._id, updateBody)
                res.json({
                    detail: updatedata,
                    message: "Cart item removed.",
                    status: HttpResponse.cart.remove_success,
                    options: null
                   })
            }
        }catch(exception){
            next(exception);
        }
    }

   checkout = async (req, res, next) => {
    try {
        const { cartId, discount } = req.body;
        const cartDetails = await orderSvc.findCartByFilter({
            _id: { $in: cartId }
        });

        const loggedInUser = req.loggedInUser;

        let subtotal = 0;
        cartDetails.map((cart) => {
            subtotal += cart.productId.actualAmount * cart.quantity;
        });

        // Ensure tax rate is set correctly
        const tax = (subtotal - discount * 100) * (process.env.TAX_AMOUNT || 0);

        const orderData = {
            buyerId: loggedInUser._id,
            subtotal: subtotal,
            discount: discount * 100,
            tax: tax,
            serviceCharge: process.env.SERVICE_CHARGE || 100,
            total: subtotal + tax + process.env.SERVICE_CHARGE || 0,
            cartItems: cartId,
            createdBy: loggedInUser._id,
            orderDate: new Date(),
        };

        // Create order
        const createdOrder = await orderSvc.createOrder(orderData);

        // Send email after order creation
        await orderSvc.sendOrderConfirmationEmail(loggedInUser, createdOrder);

        res.json({
            detail: createdOrder,
            message: "Order created successfully. A confirmation email has been sent.",
            status: HttpResponse.cart.create_order_success,
            options: null
        });
    } catch (exception) {
        next(exception);
    }
};

}

const orderCtrl = new OrderController();
export default orderCtrl;


















import HttpResponse from "../../constants/response-status.contants.js";
import mailSvc from "../../services/mail.service.js";
import CartModel from "./order-detail.model.js";
import OrderModel from "./order.model.js";

class OrderService {
    findCartByFilter = async(filter)=>{
        try{
            const data = await CartModel.find(filter)
                            .populate("productId", ["_id", "title", "slug", "images", "proce", "actualAmount", "discount"])
                            .populate("buyerId", ["_id", "name", "email", "phone", "role", "address"])
                            .populate("seller", ["_id", "name", "email", "phone", "role", "address"])
            return data;
        }catch(exception){
            console.log("findCartByFilter", exception);
            throw exception;
        }
    }

    findSingleCartItemByFilter = async(filter)=>{
        try{
            const data = await CartModel.findOne(filter)
                            .populate("productId", ["_id", "title", "slug", "images", "proce", "actualAmount", "discount"])
                            .populate("buyerId", ["_id", "name", "email", "phone", "role", "address"])
                            .populate("seller", ["_id", "name", "email", "phone", "role", "address"])
            return data;
        }catch(exception){
            console.log("findSingleCartItemByFilter", exception);
            throw exception
        }
    }

    createCartItem = async(cartItem)=>{
        try{
            const cart = new CartModel(cartItem)
            return await cart.save();
        }catch(exception){
            console.log("createCartItem", exception);
            throw exception;
        }
    }

    updateCartById = async(id, data)=>{
        try{
            const update = await CartModel.findByIdAndUpdate(id, {$set: data}, {new: true})
            return update;
        }catch(exception){
            console.log("updateCartById", exception);
            throw exception;
        }
    }

    removeCartByFilter = async(filter)=>{
        try{
            const del = await CartModel.findOneAndDelete(filter);
            if(!del){
                throw {code: 400, message: "Cart doesn't exists.", status: HttpResponse.cart.cart_not_found}
            }
            return del;
        }catch(exception){
            console.log("removeCartByFilter", exception);
            throw exception;
        }
    }

    createOrder = async (orderData)=>{
        try{
            const order =  new OrderModel(orderData);
            return await order.save();
        }catch(exception){
            console.log("createOrder",exception);
            throw exception;
        }
    }

    sendOrderConfirmationEmail = async (loggedInUser, orderObj) => {
        try {
            const { email, name, _id: orderId } = loggedInUser;
            const items = orderObj.cartItems;  // Assume cartItems are stored in the orderObj
            const totalAmount = orderObj.total;

            // Construct the email message
            let msg = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
                    <header style="text-align: center; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px;">
                        <h2 style="color: #333;">Thank You for Your Order!</h2>
                        <p style="font-size: 14px; color: #777;">Farwest Tech Store - Your trusted source for technology products</p>
                    </header>

                    <p style="font-size: 16px; color: #333;">Dear ${name},</p>

                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Thank you for your order! Your order ID is <strong>#${orderId}</strong>. Below are the details of your purchase:
                    </p>

                    <h3 style="color: #333;">Order Summary</h3>
                <ul style="font-size: 16px; color: #333;">
  ${items.map(item => {
    if (item.productId && item.productId.title) {
        return `<li>${item.productId.title} x ${item.quantity} - $${item.price}</li>`;
    } else {
        return `<li>Product not found x ${item.quantity} - $${item.price}</li>`;
    }
}).join('')}

</ul>

                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        <strong>Total Amount:</strong> <span>Rs. <span/> ${totalAmount}
                    </p>

                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        We are processing your order and will notify you once it has been shipped.
                    </p>

                    <footer style="margin-top: 20px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 10px; color: #777;">
                        <p style="font-size: 14px;">Regards,</p>
                        <p style="font-size: 14px; font-weight: bold; color: #333;">Farwest Tech Store</p>
                        <p style="font-size: 12px; color: #999;">Please do not reply to this email.</p>
                    </footer>
                </div>
            `;

            // Send the email using your mail service
            await mailSvc.sendEmail(email, `Order Confirmation - #${orderId}`, msg);
            return true;
        } catch (exception) {
            console.error("Error sending order confirmation email:", exception);
            throw exception;
        }
    }
}

const orderSvc = new OrderService();
export default orderSvc;






