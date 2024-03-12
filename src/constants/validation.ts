const VALIDATION = {
    EMAIL_FORMAT: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    PHONE_FORMAT: /^[0-9-]{12,13}$|^[0-9-]{12}$/,
    ZIP_CODE: /^[0-9]{3}-?[0-9]{4}$/,
    VALID_TIME: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g,
    ERROR_CODE: {
        VALIDATE_FAILED: 422
    },
    OTP: {
        MIN_VALUE: 100000,
        MAX_VALUE: 999999
    },
    EMAIL: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 255
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 255
    }
};

export default VALIDATION;
