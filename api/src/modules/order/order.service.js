import HttpResponse from "../../constants/response-status.contants.js";
import FileUploadService from "../../services/cloudinary.service.js";
import mailSvc from "../../services/mail.service.js";
import CartModel from "./order-detail.model.js";
import OrderModel from "./order.model.js";
import mongoose from "mongoose";

class OrderService {
  findCartByFilter = async (filter) => {
    try {
      const data = await CartModel.find(filter)
        .populate("productId", [
          "_id",
          "title",
          "slug",
          "images",
          "price",
          "actualAmount",
          "discount",
        ])
        .populate("buyerId", [
          "_id",
          "name",
          "email",
          "phone",
          "role",
          "address",
        ])
        .populate("seller", [
          "_id",
          "name",
          "email",
          "phone",
          "role",
          "address",
        ]);
      return data;
    } catch (exception) {
      console.log("findCartByFilter", exception);
      throw exception;
    }
  };

  findSingleCartItemByFilter = async (filter) => {
    try {
      const data = await CartModel.findOne(filter)
        .populate("productId", [
          "_id",
          "title",
          "slug",
          "images",
          "price",
          "actualAmount",
          "discount",
        ])
        .populate("buyerId", [
          "_id",
          "name",
          "email",
          "phone",
          "role",
          "address",
        ])
        .populate("seller", [
          "_id",
          "name",
          "email",
          "phone",
          "role",
          "address",
        ]);
      return data;
    } catch (exception) {
      console.log("findSingleCartItemByFilter", exception);
      throw exception;
    }
  };

  createCartItem = async (cartItem) => {
    try {
      const cart = new CartModel(cartItem);
      return await cart.save();
    } catch (exception) {
      console.log("createCartItem", exception);
      throw exception;
    }
  };

  updateCartById = async (id, data) => {
    try {
      const update = await CartModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return update;
    } catch (exception) {
      console.log("updateCartById", exception);
      throw exception;
    }
  };

  removeCartByFilter = async (filter) => {
    try {
      const del = await CartModel.findOneAndDelete(filter);
      if (!del) {
        throw {
          code: 400,
          message: "Cart doesn't exists.",
          status: HttpResponse.cart.cart_not_found,
        };
      }
      return del;
    } catch (exception) {
      console.log("removeCartByFilter", exception);
      throw exception;
    }
  };

  createOrder = async (orderData) => {
    try {
      const order = new OrderModel(orderData);
      return await order.save();
    } catch (exception) {
      console.log("createOrder", exception);
      throw exception;
    }
  };

  sendOrderConfirmationEmail = async (loggedInUser, orderObj) => {
    try {
      const { email, name, _id: orderId } = loggedInUser;
      const items = orderObj.cartItems;
      const totalAmount = orderObj.total;
      const tax = orderObj.tax;
      const serviceCharge = orderObj.serviceCharge;
      const discount = orderObj.discount; // Assuming discount is a value like 0.10 for 10% discount

      // Find and populate cart items with product details
      const populatedItems = await CartModel.find({ _id: { $in: items } })
        .populate("productId", [
          "_id",
          "title",
          "slug",
          "images",
          "price",
          "actualAmount",
          "discount",
          "subtotal"
        ])
        .exec();

      // Calculate subtotal if it's not directly provided
      const subtotal = populatedItems.reduce((acc, item) => {
        const price = item.productId.price || 0;
        const quantity = item.quantity || 0;
        return acc + price * quantity;
      }, 0);

      // Construct the email content
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
            ${populatedItems
          .map((item) => {
            if (item.productId && item.productId.title) {
              return `<li>${item.productId.title} <span style="font-size: 16px; color: green;"> X </span> ${item.quantity} - Rs. ${item.productId.price}</li>`;
            } else {
              return `<li>Product not found <span style="font-size: 16px; color: green;"> X </span> ${item.quantity} - Rs. ${item.productId ? item.productId.price : 'N/A'}</li>`;
            }
          })
          .join('')}
          </ul>
  
          <h3 style="color: #333;">Order Breakdown</h3>
          <ul style="font-size: 16px; color: #333; list-style-type: none; padding: 0;">
            <li style="margin-bottom: 5px;">Subtotal: <strong>Rs. ${subtotal}</strong></li>
            <li style="margin-bottom: 5px;">Discount: <strong style="color: #FF5733;">- Rs. ${discount}</strong></li>
            <li style="margin-bottom: 5px;">Service Charge: <strong>+ Rs. ${serviceCharge}</strong></li>
            <li style="margin-bottom: 5px;">Tax: <strong>+ Rs. ${tax}</strong></li>
            <li style="margin-top: 10px; font-size: 18px; font-weight: bold;">Total Amount: <strong>Rs. ${totalAmount}</strong></li>
          </ul>
  
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

      // Send the email
      await mailSvc.sendEmail(email, `Order Confirmation - #${orderId}`, msg);
      return true;
    } catch (exception) {
      console.error("Error sending order confirmation email:", exception);
      throw exception;
    }
  }

  getAllOrders = async (filter = {}, sellerId = null) => {
    try {
     const pipeline = [
  { $match: filter },

  {
    $lookup: {
      from: "carts",
      localField: "_id",
      foreignField: "orderId",
      as: "items"
    }
  },

  {
    $lookup: {
      from: "users",
      localField: "buyerId",
      foreignField: "_id",
      as: "buyer"
    }
  },

  {
    $unwind: {
      path: "$buyer",
      preserveNullAndEmptyArrays: true
    }
  },

  {
    $unwind: {
      path: "$items",
      preserveNullAndEmptyArrays: true
    }
  },

  ...(sellerId
    ? [{ $match: { "items.seller": sellerId } }]
    : []),

  {
    $group: {
      _id: "$_id",
      buyerId: { $first: "$buyerId" },
      subtotal: { $first: "$subtotal" },
      total: { $first: "$total" },
      status: { $first: "$status" },
      buyer: { $first: "$buyer" },
      items: { $push: "$items" }
    }
  },

  {
    $project: {
      "buyer.password": 0,
      "buyer.__v": 0,
      "buyer.activationToken": 0,
      "buyer.expiryTime": 0
    }
  }
];

      return await OrderModel.aggregate(pipeline);
    } catch (exception) {
      console.log("getAllOrders", exception);
      throw exception;
    }
  };

  qrCheckout = async ({ body, file, user }) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        gender,
        cartItems,
      } = body;

      const parsedCart = JSON.parse(cartItems);

      // 1. Get cart
      const cartDetails = await this.findCartByFilter({
        _id: { $in: parsedCart },
        orderId: null,
      });

      if (!cartDetails || cartDetails.length !== parsedCart.length) {
        throw {
          status: 400,
          message: "Invalid cart items",
        };
      }

      // 2. Upload screenshot
      let screenshotUrl = null;
      if (file?.path) {
        screenshotUrl = await FileUploadService.uploadFile(
          file.path,
          "payments"
        );
      }

      // 3. Calculate price
      let subtotal = 0;
      cartDetails.forEach((cart) => {
        subtotal += cart.productId.actualAmount * cart.quantity;
      });

      const tax = subtotal * 0.13;
      const total = subtotal + tax + 100;

      // 4. Create order
      const orderObj = await this.createOrder({
        buyerId: user._id,

        name,
        email,
        phone,
        address,
        gender,

        subtotal,
        tax,
        serviceCharge: 100,
        total,

        cartItems: parsedCart,

        paymentMethod: "QR",
        paymentStatus: "pending",
        status: "pending",

        paymentScreenshot: screenshotUrl,
      });

      // 5. Update cart
      await Promise.all(
        cartDetails.map((cart) => {
          cart.orderId = orderObj._id;
          cart.status = "ordered";
          return cart.save();
        })
      );

      return orderObj;

    } catch (err) {
      console.log("qrCheckout error", err);
      throw err;
    }
  };

  getOrderById = async (id) => {
    try {
        const data = await OrderModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },

            {
                $lookup: {
                    from: "carts",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "items"
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "buyerId",
                    foreignField: "_id",
                    as: "buyer"
                }
            },

            {
                $unwind: {
                    path: "$buyer",
                    preserveNullAndEmptyArrays: true
                }
            },

            {
                $project: {
                    "buyer.password": 0,
                    "buyer.__v": 0,
                    "buyer.activationToken": 0,
                    "buyer.expiryTime": 0
                }
            }
        ]);

        return data[0] || null;

    } catch (err) {
        console.log("getOrderById error", err);
        throw err;
    }
};

updateOrderById = async (id, data) => {
    try {
        const updated = await OrderModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        return updated;
    } catch (err) {
        console.log("updateOrderById error", err);
        throw err;
    }
};

}

const orderSvc = new OrderService();
export default orderSvc;
