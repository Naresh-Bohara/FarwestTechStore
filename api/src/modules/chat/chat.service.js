import { chatModel } from "./chat.model.js";


class ChatService {
    listChatByFilter = async (filter) => {
        try {
            const data = await chatModel.find(filter).populate("sender", ["_id", "name", "role", "email", "image"]).populate("receiver", ["_id", "name", "role", "email", "image"]);

            return data;
        } catch (exception) {
            throw exception;
        }
    };

    createChat = async (data) => {
        try {
            const chat = new chatModel(data);
            return await chat.save();
        } catch (exception) {
            throw exception;
        }
    };
}

export const chatSvc = new ChatService();