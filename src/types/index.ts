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
    first_name: string,
    last_name: string,
    avatar: string
}

export interface ItemMessage {
    id: number,
    type: number,
    content: string,
    userlatestSeen?: Array<ProfileMessagePartner> | ProfileMessagePartner | null,
    userSender?: ProfileMessagePartner | null,
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
    avatar: Url | Array<Url> | null,
    name: string,
    message: ItemMessage | null
}