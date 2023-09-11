import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenIMSDKRN from "open-im-sdk-rn";

export const LoginIM = async () => {
    const tk = await AsyncStorage.getItem('imToken');
    const id = await AsyncStorage.getItem('userID');
    const options = {
        userID: id,
        token: tk,
    };
    console.log(options)
    try {
        const data = await OpenIMSDKRN.login(options, "12322111137");
        console.log("login",data);
        return { success: true, errorMsg: "" };
    }
    catch (error) {
        console.error('Error login:', error); // Log the error
        return { success: false, errorMsg: "Login failed" };
    }
};
export const LogoutIM= async () => {
    try {
        const data = await OpenIMSDKRN.login("1232211737");
        console.log("logout",data);
        return { success: true, errorMsg: "" };
    }
    catch (error) {
        console.error('Error login:', error); // Log the error
        return { success: false, errorMsg: "Logout failed" };
    }
}
export const GetLoginStatus = async () => {
    try {
        const data = await OpenIMSDKRN.getLoginStatus("12321737");
        console.log("getLoginStatus",data);
        return { success: true, errorMsg: "",status:data };
    }
    catch (error) {
        console.error('Error getLoginStatus:', error); // Log the error
        return { success: false, errorMsg: "getLoginStatus failed",status:""};
    }
}
export const GetAllConversationList = async () => {
    try {
        const data = await OpenIMSDKRN.getAllConversationList("12737");
        console.log("getAllConversationList",data);
        return { success: true, errorMsg: "", data:data};
    }
    catch (error) {
        console.error('Error getLoginStatus:', error); // Log the error
        return { success: false, errorMsg: "getAllConversationList  failed",data:[]};
    }
}
export const GetFriendList = async () => {
    try {
        const data = await OpenIMSDKRN.getFriendList("12837");
        console.log("GetFriendList",data);
        return { success: true, errorMsg: "", data:data};
    }
    catch (error) {
        console.error('Error GetFriendList:', error); // Log the error
        return { success: false, errorMsg: "GetFriendList  failed",data:[]};
    }
}