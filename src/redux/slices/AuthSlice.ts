import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';

interface UserProfile {
    id: number,
    userName: string,
    avatar: string | null
}

interface AuthState {
    token: string | null,
    isLogined: string | boolean,
    userProfile: UserProfile | null,
    tokenExpriredToast: boolean
}

const initialState: AuthState = {
    token: getCookie('token') ?? null,
    isLogined: getCookie('isLogined') ?? false,
    userProfile: getCookie('userProfile') ? JSON.parse(getCookie('userProfile') as string) : null,
    tokenExpriredToast: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isLogined = true;
            state.tokenExpriredToast = false;
        },
        clearToken(state) {
            state.token = null;
            state.isLogined = false;
            state.userProfile = null;
        },
        setProfile(state, action: PayloadAction<UserProfile>) {
            state.userProfile = action.payload
        },
        setTokenExpriredToast(state, action: PayloadAction<boolean>) {
            state.tokenExpriredToast = action.payload;
        }
    },
});

export const { setToken, clearToken, setProfile, setTokenExpriredToast } = authSlice.actions;
export default authSlice.reducer;