import { api } from './Api';
import API_CONST from '@/constants/api-const';
import { USER_SERVICE_API_HOST } from '@/environments';

export default class AuthService {
    login : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.LOGIN;
        return await api.post(route, params);
    }

    logout : Function = async () => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.LOGOUT;
        return await api.post(route, {});
    }
}
