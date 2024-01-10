import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/slices/AuthSlice";
import { deleteCookie } from "cookies-next";

export const removeToken = () => {
    const dispatch = useDispatch();

    dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
}