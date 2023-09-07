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
    }
    catch (error) {
        console.error('Error login:', error); // Log the error
    }
};