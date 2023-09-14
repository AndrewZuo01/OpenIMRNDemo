
import { create } from "zustand";
import { MessageReceiveOptType } from "./types/enum";
import { AppConfig, UserStore } from "./type.d";

export interface BusinessUserInfo {
    userID: string;
    password: string;
    account: string;
    phoneNumber: string;
    areaCode: string;
    email: string;
    nickname: string;
    faceURL: string;
    gender: number;
    level: number;
    birth: number;
    allowAddFriend: BusinessAllowType;
    allowBeep: BusinessAllowType;
    allowVibration: BusinessAllowType;
    globalRecvMsgOpt: MessageReceiveOptType;
  }
  export enum BusinessAllowType {
    Allow = 1,
    NotAllow = 2,
  }
  
export const useUserStore = create<UserStore>()((set, get) => ({
  selfInfo: {} as BusinessUserInfo,
  appConfig: {} as AppConfig,
  appSettings: {
    locale: "zh-CN", //need update
    closeAction: "miniSize",
  },
//   getSelfInfoByReq: async () => {
//     try {
//       const { data } = await IMSDK.getSelfUserInfo<BusinessUserInfo>();
//       const {
//         data: { users },
//       } = await getBusinessUserInfo([data.userID], true);
//       const bussinessData = users[0];
//       set(() => ({ selfInfo: bussinessData }));
//     } catch (error) {
//       feedbackToast({ error, msg: t("toast.getSelfInfoFailed") });
//     }
//   },
//   updateSelfInfo: (info: Partial<BusinessUserInfo>) => {
//     set((state) => ({ selfInfo: { ...state.selfInfo, ...info } }));
//   },
//   getAppConfigByReq: async () => {
//     let config = {} as AppConfig;
//     try {
//       const { data } = await getAppConfig();
//       config = data.config ?? {};
//     } catch (error) {
//       console.error("get app config err");
//     }
//     set((state) => ({ appConfig: { ...state.appConfig, ...config } }));
//   },
//   updateAppSettings: (settings: Partial<AppSettings>) => {
//     if (settings.locale) {
//       setLocale(settings.locale);
//     }
//     set((state) => ({ appSettings: { ...state.appSettings, ...settings } }));
//   },
  userLogout: async () => {
    console.log("call userLogout:::");

    await IMSDK.logout();
    const userID = get().selfInfo.userID;
    clearIMProfile(userID);
    set({ selfInfo: {} as BusinessUserInfo });
    useContactStore.getState().clearContactStore();
    useConversationStore.getState().clearConversationStore();
    router.navigate("/login");
  },
}));
