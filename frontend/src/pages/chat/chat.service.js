import { defaultLocale } from "yup";
import HttpService from "../../services/http.service";

class ChatService extends HttpService{
    listMyChatDetails = async (userId) => {
        try {
            const response = await this.getRequest("/chat/chat-with/" + userId, { auth: true });
            return response;
        } catch (exception) {}
    };

    createChat = async (data) => {
        try {
            const response = await this.postRequest("/chat/create", data, { auth: true });
            return response;
        } catch (exception) {}
    };
}

const chatService = new ChatService();
export default chatService;