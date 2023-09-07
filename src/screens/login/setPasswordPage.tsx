import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { USER_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenIMSDKRN from "open-im-sdk-rn";
import md5 from 'react-native-md5';
import { LoginClient, ResetPassword, SignUpClient } from "../api/requests";

const SetPasswordPage = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [next, setNext] = useState(true);
  const navigator = useNavigation();
  const navigateBack = () => {
    navigator.navigate("SignUpPage");
}
  useEffect(() => {
    if (newPassword === repeatPassword) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [newPassword, repeatPassword]);

  const buttonStyle = next ? styles.nextButton : styles.nextButtonDisabled;
  const handleSignUp = async () => {
    console.log(props.route.params)
    try {
      if (props.route.params.type === "register") {
        await SignUpClient({
          phoneNumber: props.route.params.email,
          password: md5.hex_md5(newPassword),
          verifyCode: props.route.params.verifyCode,
        });
      }
    
      if (props.route.params.type === "resetPwd") {
        await ResetPassword({
          phoneNumber: props.route.params.email,
          password: md5.hex_md5(newPassword),
          verifyCode: props.route.params.verifyCode,
        });
      }
    
      if (await LoginClient({ password: md5.hex_md5(newPassword), phoneNumber: props.route.params.email, verifyCode: "verify", areaCode: "+86" })) {
        props.onLogin(true);
        console.log("work!");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
    
      
  }
  return (
    <LinearGradient
      colors={["#0E6CBE28", "#C6C6C621"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Image
            source={require('../../../assets/photos/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.signUpTitle}>Set password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.enterText}>New Password</Text>
          <TextInput
            style={styles.digitInput}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={styles.enterText}>Repeat Password</Text>
          <TextInput
            style={styles.digitInput}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity style={buttonStyle} disabled={!next} onPress={() => handleSignUp()}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backButton: {
    marginTop: 100,
  },
  signUpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0089FF",
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 11,
    padding: 20,
    marginTop: 20,
  },
  enterText: {
    marginTop: 30,
    fontSize: 14,
  },
  digitInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "#0089FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 60,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButtonDisabled:{
    backgroundColor: "#0089FF20",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 60,
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default SetPasswordPage;
