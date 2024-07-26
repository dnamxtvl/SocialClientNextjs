import { Url } from "url";

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

export interface ProfileMessagePartner {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string
}

export interface ItemMessage {
    id: number,
    type: number,
    content: string | Array<string> ,
    firstOfAvgTime: boolean,
    userlatestSeen?: Array<ProfileMessagePartner> | ProfileMessagePartner | null,
    userSender?: ProfileMessagePartner | null,
    status?: number,
    percentUpload?: number,
    createdAt: string,
}

export interface ListMessageDetail {
    profile: ProfileMessagePartner,
    listMessages: {
        messages: Array<ItemMessage>,
        firstOfAvgFourHour: boolean
    }
}

export interface ItemConversation {
    id: string,
    avatar: string | null,
    name: string,
    noUnredMessage: number,
    message: ItemMessage | null,
    userSendLatestMessage?: ProfileMessagePartner | null
}

export interface SendMessageParams {
    message?: string,
    messageUUId?: string,
    files?: Array<File>,
    fileUUIds?: Array<string>
}