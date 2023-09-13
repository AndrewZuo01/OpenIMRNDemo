import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar";
import TextChatCard from "./chatCards/textChatCard";
import { GetAdvancedHistoryMessageListReverse } from "../api/openimsdk";
import { API } from "../api/typings";

const ChatRoom = ({ route }) => {
    const converstionID = route.params.conversationID
  const [messages, setMessages] = useState([]);
  const user = {
    avatarURL: "https://example.com/avatar.jpg",
    name: "John Doe",
    onlineStatus: "Online",
  };

  useEffect(() => {
    const fetchChatMessages = async () => {
      const options = {
        lastMinSeq: 0,
        count: 4,
        startClientMsgID: "",
        conversationID: converstionID,
      };
     
      try {
        const chat = await GetAdvancedHistoryMessageListReverse(options);
        const chatJSON = JSON.parse(chat.data);
        setMessages(chatJSON.messageList);
        console.log(chatJSON.messageList)
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    
    fetchChatMessages();
  }, []);
  
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Add your back button component here */}
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Avatar item={{ faceURL: user.avatarURL }} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.onlineStatus}>{user.onlineStatus}</Text>
          </View>
        </View>
      </View>
      <View style={styles.messageList}>
        {messages.map((message:API.Chat.MessageType, index) => {
          if (message.msgFrom === 100) {
            console.log(message.sendID)
            return (
              <TextChatCard
                message={message.textElem.content}
                sendID={message.sendID}
              ></TextChatCard>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#ffffff", // Set your desired background color
    },
    backButton: {
        // Define your back button styles here
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginLeft: 16,
    },
    userDetails: {
        marginLeft: 8,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    onlineStatus: {
        fontSize: 14,
        color: "#888", // Adjust the color as needed
    },
    messageList:{
        flex:1
    }
});

export default ChatRoom;
