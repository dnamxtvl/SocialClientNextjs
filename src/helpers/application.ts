import moment from "moment";
import { clearToken } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store";
import { deleteCookie } from "cookies-next";

export const removeToken = () => {
    store.dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
}

export const calculateTimeAgo = (timestamp: string) => {
    const currentTime = moment();
    const targetTime = moment(timestamp);
    
    const diffYears = currentTime.diff(targetTime, 'years');
    if (diffYears > 0) {
        return `${diffYears} năm`;
    }
    
    const diffMonths = currentTime.diff(targetTime, 'months');
    if (diffMonths > 0) {
        return `${diffMonths} tháng`;
    }

    const diffWeeks = currentTime.diff(targetTime, 'weeks');
    if (diffWeeks > 0) {
        return `${diffWeeks} tuần`;
    }
    
    const diffDays = currentTime.diff(targetTime, 'days');
    if (diffDays > 0) {
        return `${diffDays} ngày`;
    }
    
    const diffHours = currentTime.diff(targetTime, 'hours');
    if (diffHours > 0) {
        return `${diffHours} giờ`;
    }
    
    const diffMinutes = currentTime.diff(targetTime, 'minutes');

    if (diffMinutes > 0) {
        return `${diffMinutes} phút`;
    }

    return `now`;
}