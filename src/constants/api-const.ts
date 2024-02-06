const API_CONST = {
    AUTH: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        REGISTER: 'register-user',
        VERIFY_EMAIL_AFTER_REGISTER: 'email/verify-register',
        RESEND_VERIFY_EMAIL_AFTER_REGISTER: 'email/verification-notification/',
        RESEND_VERIFY_EMAIL_AFTER_LOGIN: 'email/verify-login',
        FORGOT_PASSWORD: 'forgot-password',
        VERIFY_OTP_FORGOT_PASSWORD: 'forgot-password/verify-otp',
        RESEND_VERIFY_EMAIL_FORGOT_PASSWORD: 'forgot-password/resend-otp/',
        SET_NEW_PASSWORD_AFTER_FORGOT: 'forgot-password/set-new-password',
    },
};

export default API_CONST;
