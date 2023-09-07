import { Platform } from "react-native";
import { USER_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginIM } from "./openimsdk";
import { criticallyDampedSpringCalculations } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

export const LoginClient = async (params) => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '123',
        },
        body: JSON.stringify({
          ...params,
          platform:platform,
          areaCode: "+86",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return false
        }
        else{
            const { chatToken, imToken, userID } = data.data;
            console.log(data)

            try {
            // Set key-value pairs
            await AsyncStorage.setItem('chatToken', chatToken);
            await AsyncStorage.setItem('imToken', imToken);
            await AsyncStorage.setItem('userID', userID);
                
            console.log('User Data chatToken, imToken, userID saved successfully');
           
            await LoginIM()
            return true
            } catch (error) {
            console.error('Error saving chatToken, imToken, userID:', error);
            }
            return false
        }
      } else {
        // Handle errors or non-200 responses here
        console.error("Login failed");
        return false
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
    }
}

export const SignUpClient = async (params) =>  {
    
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/register";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '123',
        },
        body: JSON.stringify({
          ...params,
          user: {
            "nickname": "testname",
            "faceURL": "",
            "birth": 0,
            "gender": 1,
            "email": "",
            "account": "",
            "areaCode": "+86",
            "phoneNumber": params.phoneNumber,
            "password": params.password
          },
          platform:platform,
          areaCode: "+86",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
        }
        else{
            const { chatToken, imToken, userID } = data.data;
            try {
            // Set key-value pairs
            await AsyncStorage.setItem('chatToken', chatToken);
            await AsyncStorage.setItem('imToken', imToken);
            await AsyncStorage.setItem('userID', userID);
                
            console.log('User Data chatToken, imToken, userID saved successfully');
            await LoginIM()
            } catch (error) {
            console.error('Error saving chatToken, imToken, userID:', error);
            }
        }
      } else {
        // Handle errors or non-200 responses here
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
    }
}
export const SendVerifyClient = async (params) => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/code/send";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '123',
        },
        body: JSON.stringify({
          ...params,
          platform:platform,
          areaCode: "+86",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return false
        }
        else{
            console.log(data)
            console.log("Code sent successfully");
            return true
        }
      } else {
        // Handle errors or non-200 responses here
        console.error("Code sent failed");
        return false
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
    }
}
export const CheckVerifyClient = async (params) => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
  
    try {
      const url = USER_URL + "/account/code/verify";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'operationID': '121233',
        },
        body: JSON.stringify({
          ...params,
          areaCode: "+86",
        }),
      })

      
      if (response.ok) {
        const data = await response.json();
        if(data.errCode!=0){
            console.error('Data ', data.errDlt);
            return false
        }
        else{
            console.log(data)
            console.log("Code verify successfully");
            return true
        }
        
      } else {
        // Handle errors or non-200 responses here
        console.error("Code verify failed");
        return false;
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("An error occurred:", error);
    }
}
export const ResetPassword = async (params) => {
  let platform = 1;
  if (Platform.OS === 'android') {
    platform = 2; // Android
  } else if (Platform.OS === 'ios') {
    platform = 1;
  }

  try {
    const url = USER_URL + "/account/password/reset";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'operationID': '121233',
      },
      body: JSON.stringify({
        ...params,
        areaCode: "+86",
      }),
    })

    
    if (response.ok) {
      const data = await response.json();
      if(data.errCode!=0){
          console.error('Data ', data.errDlt);
          return false
      }
      else{
          console.log(data)
          console.log("Code verify successfully");
          return true
      }
      
    } else {
      // Handle errors or non-200 responses here
      console.error("Code verify failed");
      return false;
    }
  } catch (error) {
    // Handle network or other errors here
    console.error("An error occurred:", error);
  }
}