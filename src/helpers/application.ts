import moment from "moment";
import { clearToken } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store";
import { deleteCookie } from "cookies-next";
import { TYPE } from "@/constants/message";

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

export const getTypeMessageForFile = (fileMime: string) => {
    if (fileMime.includes('image')) {
        return TYPE.IMAGE
    }
    if (fileMime.includes('video')) {
        return TYPE.VIDEO
    }
    if (fileMime.includes('audio')) {
        return TYPE.AUDIO
    }

    return TYPE.FILE
}

export const formatBytes = (bytes: number) => {
    const kb = bytes / 1024;
    if (kb > 1000) {
      const mb = kb / 1024;
      return `${mb.toFixed(2)} MB`;
    } else {
      return `${kb.toFixed(2)} KB`;
    }
}

export const addNewItemToListMessages = (newMessages: any, newMessage: any) => {
    let low = 0;
    let high = newMessages.length;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        const midCreatedAt = new Date(newMessages[mid].message.createdAt);
        const newCreatedAt = new Date(newMessage.message.createdAt);
        if (midCreatedAt > newCreatedAt ||(midCreatedAt.getTime() === newCreatedAt.getTime() && newMessages[mid].message.id > newMessage.message.id)) {
        low = mid + 1;
        } else {
        high = mid;
        }
    }
    newMessages.splice(low, 0, newMessage);

    return newMessages;
}

export const fileSorted = (files: Array<File>) => files.sort((a: any, b: any) => {
    const isImageA = a.type.startsWith('image/');
    const isImageB = b.type.startsWith('image/');
  
    if (isImageA && !isImageB) {
      return -1;
    } else if (!isImageA && isImageB) {
      return 1;
    } else {
      return 0;
    }
});
