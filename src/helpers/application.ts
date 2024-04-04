import { useDispatch } from "react-redux";
import { clearToken } from "@/redux/slices/AuthSlice";
import { deleteCookie } from "cookies-next";
import moment from "moment";

export const removeToken = () => {
    const dispatch = useDispatch();

    dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
}

export const calculateTimeAgo = (timestamp: string) => {
    const currentTime = moment();
    const targetTime = moment(timestamp);
    
    const diffYears = currentTime.diff(targetTime, 'years');
    if (diffYears > 0) {
        return `${diffYears} năm trước`;
    }
    
    const diffMonths = currentTime.diff(targetTime, 'months');
    if (diffMonths > 0) {
        return `${diffMonths} tháng trước`;
    }

    const diffWeeks = currentTime.diff(targetTime, 'weeks');
    if (diffWeeks > 0) {
        return `${diffWeeks} tuần trước`;
    }
    
    const diffDays = currentTime.diff(targetTime, 'days');
    if (diffDays > 0) {
        return `${diffDays} ngày trước`;
    }
    
    const diffHours = currentTime.diff(targetTime, 'hours');
    if (diffHours > 0) {
        return `${diffHours} giờ trước`;
    }
    
    const diffMinutes = currentTime.diff(targetTime, 'minutes');

    if (diffMinutes > 0) {
        return `${diffMinutes} phút trước`;
    }

    return `now`;
}