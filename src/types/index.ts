export interface DataUserLoginSuccess {
    data: {
        user: {
            id: number,
            first_name: string,
            last_name: string,
            avatar: string
        };
        token: string;
        expired_at: string;
    };
}

export interface ErrorResponse {
    code: number;
    message: Array<string>;
    codeEnumError: number
}