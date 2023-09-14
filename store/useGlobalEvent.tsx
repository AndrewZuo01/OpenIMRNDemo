import { useEffect } from "react";
import { OpenIMEmitter } from 'open-im-sdk-rn';
import { useContactStore } from "./contact";
import { FriendUserItem, WSEvent } from "./type.d";
import { useConversationStore } from "./conversation";
export const initStore = () => {
    // const { getSelfInfoByReq } = useUserStore.getState();
    const {
        getFriendListByReq,
        //   getBlackListByReq,
        //   getGroupListByReq,
        getRecvFriendApplicationListByReq,
        //   getRecvGroupApplicationListByReq,
        getSendFriendApplicationListByReq,
        //   getSendGroupApplicationListByReq,
    } = useContactStore.getState();
    const { getConversationListByReq, getUnReadCountByReq } =
        useConversationStore.getState();

    getConversationListByReq();
    getUnReadCountByReq();
    // getSelfInfoByReq();
    getFriendListByReq();
    // getBlackListByReq();
    // getGroupListByReq();
    getRecvFriendApplicationListByReq();
    // getRecvGroupApplicationListByReq();
    getSendFriendApplicationListByReq();
    // getSendGroupApplicationListByReq();
};
export function useGlobalEvent() {
    useEffect(() => {
        
        setIMListener();
        // initStore();
        return () => {
            disposeIMListener();
        };
    }, []);

    const eventNames = ['OnSelfInfoUpdated', 'OnConnecting', 'OnConnectFailed', 'OnConnectSuccess', 'OnKickedOffline', 'OnUserTokenExpired', 'OnSyncServerStart', 'OnSyncServerFinish', 'OnSyncServerFailed', 'OnRecvNewMessage', 'OnRecvNewMessages', 'OnNewRecvMessageRevoked', 'OnConversationChanged', 'OnNewConversation', 'OnTotalUnreadMessageCountChanged', 'OnFriendInfoChanged', 'OnFriendAdded', 'OnFriendDeleted', 'OnBlackAdded', 'OnBlackDeleted', 'OnJoinedGroupAdded', 'OnJoinedGroupDeleted', 'OnGroupInfoChanged', 'OnGroupMemberAdded', 'OnGroupMemberDeleted', 'OnGroupMemberInfoChanged', 'OnFriendApplicationAdded', 'OnFriendApplicationAccepted', 'OnFriendApplicationRejected', 'OnGroupApplicationAdded', 'OnGroupApplicationAccepted', 'OnGroupApplicationRejected'];

    // const updateSelfInfo = useUserStore((state) => state.updateSelfInfo);
    // const userLogout = useUserStore((state) => state.userLogout);
    // const updateConversationList = useConversationStore((state) => state.updateConversationList);
    // const updateUnReadCount = useConversationStore((state) => state.updateUnReadCount);
    // const updateCurrentGroupInfo = useConversationStore((state) => state.updateCurrentGroupInfo);
    // const getCurrentGroupInfoByReq = useConversationStore((state) => state.getCurrentGroupInfoByReq);
    // const getCurrentMemberInGroupByReq = useConversationStore((state) => state.getCurrentMemberInGroupByReq);
    // const tryUpdateCurrentMemberInGroup = useConversationStore((state) => state.tryUpdateCurrentMemberInGroup);
    // const pushNewMessage = useMessageStore((state) => state.pushNewMessage);
    // const updateOneMessage = useMessageStore((state) => state.updateOneMessage);
    const updateFriend = useContactStore((state) => state.updateFriend);
    const pushNewFriend = useContactStore((state) => state.pushNewFriend);
    // const updateBlack = useContactStore((state) => state.updateBlack);
    // const pushNewBlack = useContactStore((state) => state.pushNewBlack);
    // const updateGroup = useContactStore((state) => state.updateGroup);
    // const pushNewGroup = useContactStore((state) => state.pushNewGroup);
    // const updateRecvFriendApplication = useContactStore((state) => state.updateRecvFriendApplication);
    // const updateSendFriendApplication = useContactStore((state) => state.updateSendFriendApplication);
    // const updateRecvGroupApplication = useContactStore((state) => state.updateRecvGroupApplication);
    // const updateSendGroupApplication = useContactStore((state) => state.updateSendGroupApplication);


    // const selfUpdateHandler = ({ data }: WSEvent<SelfUserInfo>) => updateSelfInfo(data);
    const connectingHandler = () => console.log("connecting...");
    const connectFailedHandler = ({ errCode, errMsg }: WSEvent) => console.log(errCode, errMsg);
    const connectSuccessHandler = () => console.log("connect success...");
    // const kickHandler = () => tryOut("您的账号已在其他设备登录,请重新登录");
    // const expiredHandler = () => tryOut("当前登录已过期,请重新登录");

    // const tryOut = (msg: string) => feedbackToast({
    //     msg,
    //     error: msg,
    //     onClose: () => userLogout(),
    // });
    // const syncStartHandler = () => setConnectState((state) => ({ ...state, isSyncing: true }));
    // const syncFinishHandler = () => setConnectState((state) => ({ ...state, isSyncing: false }));
    // const syncFailedHandler = () => {
    //     feedbackToast({ msg: "同步失败！", error: "同步失败！" });
    //     setConnectState((state) => ({ ...state, isSyncing: false }));
    // };

    // const newMessageHandler = ({ data }: WSEvent<ExMessageItem | ExMessageItem[]>) => {
    //     if (connectState.isSyncing) return;
    //     if (Array.isArray(data)) data.forEach(handleNewMessage);
    //     else handleNewMessage(data);
    // };

    // const revokedMessageHandler = ({ data }: WSEvent<RevokedInfo>) => updateOneMessage({
    //     clientMsgID: data.clientMsgID,
    //     contentType: MessageType.RevokeMessage,
    //     notificationElem: {
    //         detail: JSON.stringify(data),
    //     },
    // } as ExMessageItem);

    // const notPushType = [MessageType.TypingMessage, MessageType.RevokeMessage];

    // const handleNewMessage = (newServerMsg: ExMessageItem) => {
    //     if (!notPushType.includes(newServerMsg.contentType)) {
    //         pushNewMessage(newServerMsg);
    //         emitter.emit("CHAT_LIST_SCROLL_TO_BOTTOM", true);
    //     }
    // };

    // const conversationChnageHandler = ({ data }: WSEvent<ConversationItem[]>) => updateConversationList(data, "filter");
    // const newConversationHandler = ({ data }: WSEvent<ConversationItem[]>) => updateConversationList(data, "push");
    // const totalUnreadChangeHandler = ({ data }: WSEvent<number>) => updateUnReadCount(data);

    const friendInfoChangeHandler = ({ data }: WSEvent<FriendUserItem>) => updateFriend(data);
    const friendAddedHandler = ({ data }: WSEvent<FriendUserItem>) => pushNewFriend(data);
    // const friendDeletedHandler = ({ data }: WSEvent<FriendUserItem>) => updateFriend(data, true);

    // const blackAddedHandler = ({ data }: WSEvent<BlackUserItem>) => pushNewBlack(data);
    // const blackDeletedHandler = ({ data }: WSEvent<BlackUserItem>) => updateBlack(data, true);

    // const joinedGroupAddedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) updateCurrentGroupInfo(data);
    //     pushNewGroup(data);
    // };

    // const joinedGroupDeletedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
    //         getCurrentGroupInfoByReq(data.groupID);
    //         getCurrentMemberInGroupByReq(data.groupID);
    //     }
    //     updateGroup(data, true);
    // };

    // const groupInfoChangedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     updateGroup(data);
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) updateCurrentGroupInfo(data);
    // };

    // const groupMemberAddedHandler = ({ data }: WSEvent<GroupMemberItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID &&
    //         data.userID === useUserStore.getState().selfInfo.userID) getCurrentMemberInGroupByReq(data.groupID);
    //     console.log("groupMemberAddedHandler");
    // };

    // const groupMemberDeletedHandler = () => console.log("groupMemberDeletedHandler");

    // const groupMemberInfoChangedHandler = ({ data }: WSEvent<GroupMemberItem>) => tryUpdateCurrentMemberInGroup(data);

    // const friendApplicationProcessedHandler = ({ data }: WSEvent<FriendApplicationItem>) => {
    //     const isRecv = data.toUserID === useUserStore.getState().selfInfo.userID;
    //     isRecv ? updateRecvFriendApplication(data) : updateSendFriendApplication(data);
    // };

    // const groupApplicationProcessedHandler = ({ data }: WSEvent<GroupApplicationItem>) => {
    //     const isRecv = data.userID !== useUserStore.getState().selfInfo.userID;
    //     isRecv ? updateRecvGroupApplication(data) : updateSendGroupApplication(data);
    // };


    const setIMListener = () => {
        
        // account
        // OpenIMEmitter.addListener('OnSelfInfoUpdated', (v) => { selfUpdateHandler });
        OpenIMEmitter.addListener('onConnecting', connectingHandler);
        OpenIMEmitter.addListener('onConnectFailed', connectFailedHandler);
        OpenIMEmitter.addListener('onConnectSuccess', connectSuccessHandler);
        // OpenIMEmitter.addListener('OnKickedOffline', (v) => { kickHandler });
        // OpenIMEmitter.addListener('OnUserTokenExpired', (v) => { expiredHandler });
        // // sync
        // OpenIMEmitter.addListener('onSyncServerStart', syncStartHandler );
        // OpenIMEmitter.addListener('OnSyncServerFinish', (v) => { syncFinishHandler });
        // OpenIMEmitter.addListener('OnSyncServerFailed', (v) => { syncFailedHandler });
        // // message
        // OpenIMEmitter.addListener('OnRecvNewMessage', (v) => { newMessageHandler });
        // OpenIMEmitter.addListener('OnRecvNewMessages', (v) => { newMessageHandler });
        // OpenIMEmitter.addListener('OnNewRecvMessageRevoked', (v) => { revokedMessageHandler });
        // // conversation
        // OpenIMEmitter.addListener('OnConversationChanged', (v) => { conversationChnageHandler });
        // OpenIMEmitter.addListener('OnNewConversation', (v) => { newConversationHandler });
        // OpenIMEmitter.addListener('OnTotalUnreadMessageCountChanged', (v) => { totalUnreadChangeHandler });
        // // friend
        OpenIMEmitter.addListener('onFriendInfoChanged',  friendInfoChangeHandler );
        OpenIMEmitter.addListener('onFriendAdded', friendAddedHandler );
        // OpenIMEmitter.addListener('OnFriendDeleted', (v) => { friendDeletedHandler });
        // // blacklist
        // OpenIMEmitter.addListener('OnBlackAdded', (v) => { blackAddedHandler });
        // OpenIMEmitter.addListener('OnBlackDeleted', (v) => { blackDeletedHandler });
        // // group
        // OpenIMEmitter.addListener('OnJoinedGroupAdded', (v) => { joinedGroupAddedHandler });
        // OpenIMEmitter.addListener('OnJoinedGroupDeleted', (v) => { joinedGroupDeletedHandler });
        // OpenIMEmitter.addListener('OnGroupInfoChanged', (v) => { groupInfoChangedHandler });
        // OpenIMEmitter.addListener('OnGroupMemberAdded', (v) => { groupMemberAddedHandler });
        // OpenIMEmitter.addListener('OnGroupMemberDeleted', (v) => { groupMemberDeletedHandler });
        // OpenIMEmitter.addListener('OnGroupMemberInfoChanged', (v) => { groupMemberInfoChangedHandler });
        // // application
        // OpenIMEmitter.addListener('OnFriendApplicationAdded', (v) => { friendApplicationProcessedHandler });
        // OpenIMEmitter.addListener('OnFriendApplicationAccepted', (v) => { friendApplicationProcessedHandler });
        // OpenIMEmitter.addListener('OnFriendApplicationRejected', (v) => { friendApplicationProcessedHandler });
        // OpenIMEmitter.addListener('OnGroupApplicationAdded', (v) => { groupApplicationProcessedHandler });
        // OpenIMEmitter.addListener('OnGroupApplicationAccepted', (v) => { groupApplicationProcessedHandler });
        // OpenIMEmitter.addListener('OnGroupApplicationRejected', (v) => { groupApplicationProcessedHandler });
    };

    const disposeIMListener = () => {
        eventNames.forEach((eventName) => {
            OpenIMEmitter.removeAllListeners(eventName);
        });
    };
}