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

    verifyEmail : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.VERIFY_EMAIL_AFTER_REGISTER;
        return await api.post(route, params);
    }

    resendVerifyEmail : Function = async (userId: string) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.RESEND_VERIFY_EMAIL_AFTER_REGISTER + userId;
        return await api.get(route);
    }

    resendVerifyEmailForgotPassword : Function = async (userId: string) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.RESEND_VERIFY_EMAIL_FORGOT_PASSWORD + userId;
        return await api.get(route);
    }

    verifyEmailAfterLogin : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.RESEND_VERIFY_EMAIL_AFTER_LOGIN;
        return await api.post(route, params);
    }

    registerUser : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.REGISTER;
        return await api.post(route, params);
    }

    forgotPassword : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.FORGOT_PASSWORD;
        return await api.post(route, params);
    }

    verifyOtpForgotPassword : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.VERIFY_OTP_FORGOT_PASSWORD;
        return await api.post(route, params);
    }

    setNewPasswordAfterForgot : Function = async (params: Object) => {
        let route = USER_SERVICE_API_HOST + API_CONST.AUTH.SET_NEW_PASSWORD_AFTER_FORGOT;
        return await api.post(route, params);
    }
}
