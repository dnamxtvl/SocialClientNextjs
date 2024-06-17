import { api } from './Api';
import API_CONST from '@/constants/api-const';
import { CHAT_SERVICE_API_HOST } from '@/environments';

export default class ConversationService {
    listConversation : Function = async (page: number) => {
        let route = CHAT_SERVICE_API_HOST + API_CONST.CONVERSATION.LIST + '?page=' + page;
        return await api.get(route);
    }

    viewConversation : Function = async (id: string) => {
        let route = CHAT_SERVICE_API_HOST + API_CONST.CONVERSATION.VIEW + id;
        return await api.get(route);
    }
}
