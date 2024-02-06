const VALIDATION = {
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
