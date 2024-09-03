import { api } from './Api';
import API_CONST from '@/constants/api-const';
import { CHAT_SERVICE_API_HOST } from '@/environments';
import axios from 'axios';

export default class MessageService {
    sendMessage : Function = async (conversationId: string, formData: FormData, authToken: string) => {
        let route = CHAT_SERVICE_API_HOST + API_CONST.MESSAGE.SEND_MESSAGE + conversationId;
        return await axios.post(route, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${authToken}`
            }
        })
    }

    seenMessageConversation : Function = async (conversationId: string, params: Object) => {
        let route = CHAT_SERVICE_API_HOST + API_CONST.MESSAGE.SEEN_MESSAGE + conversationId;
        return await api.post(route, params);
    }
}