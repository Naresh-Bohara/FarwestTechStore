import express from "express";
import { checkLogin } from "../../middlewares/auth.middleware.js";
import chatCtrl from "./chat.controller.js";
import ChatCreateDTO from "./chat.request.js";
import { bodyValidator } from "../../middlewares/request-validator.middleware.js";


const chatRouter = express.Router();

chatRouter.get("/chat-with/:userId", checkLogin, chatCtrl.listChatDetails);
chatRouter.post("/create", checkLogin, bodyValidator(ChatCreateDTO), chatCtrl.storeChat);

export default chatRouter;