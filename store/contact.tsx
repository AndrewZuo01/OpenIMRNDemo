import { create } from "zustand";
import { ContactStore, FriendApplicationItem, FriendUserItem } from "./type.d";
import { GetFriendList } from "../src/screens/api/openimsdk";
import OpenIMSDKRN from "open-im-sdk-rn";

export const useContactStore = create<ContactStore>()((set, get) => ({
    friendList: [],
    recvFriendApplicationList: [],
    sendFriendApplicationList: [],
    getFriendListByReq: async () => {
        try {
            const stringData = await OpenIMSDKRN.getFriendList("61387298");
            const data = JSON.parse(stringData)
            set(() => ({ friendList: data }));
        } catch (error) {
            console.error("getFriendListByReq ", error)
        }
    },
    pushNewFriend: (friend: FriendUserItem) => {
        const wrapFriend: FriendUserItem = {
            blackInfo: '',
            friendInfo: friend,
            publicInfo: ''
        }
        set((state) => ({ friendList: [...state.friendList, wrapFriend] }));
    },
    updateFriend: (friend: FriendUserItem, remove?: boolean) => {
        const tmpList = [...get().friendList];
        const idx = tmpList.findIndex((f) => f.friendInfo.userID === friend.friendInfo.userID);

        if (idx < 0) {
            return;
        }
        if (remove) {
            tmpList.splice(idx);
        } else {
            tmpList[idx] = { ...friend };
        }
        set(() => ({ friendList: tmpList }));
    },
    getRecvFriendApplicationListByReq: async () => {

        try {
            const data = await OpenIMSDKRN.getFriendApplicationListAsRecipient("123");
            set(() => ({ recvFriendApplicationList: JSON.parse(data) }));
        } catch (error) {
            console.error('getRecvFriendApplicationListByReq ', error);
        }
    },
    getSendFriendApplicationListByReq: async () => {
        try {
            const data = await OpenIMSDKRN.getFriendApplicationListAsApplicant("192");
            set(() => ({ sendFriendApplicationList: JSON.parse(data) }));
        } catch (error) {
            console.error('getSendFriendApplicationListByReq ', error);
        }
    },
    clearContactStore: () => {
        set(() => ({
            friendList: [],
            recvFriendApplicationList: [],
            sendFriendApplicationList: [],
        }));
    },

}));