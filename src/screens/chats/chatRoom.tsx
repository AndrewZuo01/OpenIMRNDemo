import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar";
import TextChatCard from "./chatCards/textChatCard";
import { GetAdvancedHistoryMessageListReverse, SendMessage } from "../api/openimsdk";
import { API } from "../api/typings";
import { useMessageStore } from "../../../store/message";
import { useConversationStore } from "../../../store/conversation";
import { ConversationItem } from "../../../store/types/entity";
import { FlatList } from "react-native-gesture-handler";

const ChatRoom = (conversation) => {
  const { updateCurrentConversation } = useConversationStore.getState();
  updateCurrentConversation(conversation.route.params.item);

  const { getHistoryMessageListByReq } = useMessageStore.getState();
  useEffect(() => {
    getHistoryMessageListByReq();
  }, []);

  const messages = useMessageStore((state) => state.historyMessageList);
  const user = {
    avatarURL: "https://example.com/avatar.jpg",
    name: "John Doe",
    onlineStatus: "Online",
  };

  const [inputMessage, setInputMessage] = useState(""); // State to hold the input message

  // Function to handle sending a message
  const sendMessage = () => {
    // Add your logic to send the message here
    const options = {}
    SendMessage(options)
    console.log("Sending message:", inputMessage);
    setInputMessage(""); // Clear the input field after sending
  };

  return (
    <View style={{ flex: 1 }}>
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
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={({ item: message }) => {
          return <TextChatCard message={message}></TextChatCard>;
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
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
  messageList: {
    flex: 1, // Allow the message list to take up the remaining space
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff", // Set your desired background color
  },
  input: {
    flex: 1, // Allow the input field to grow
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF", // Set your desired button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "#fff", // Set your desired button text color
  },
});

export default ChatRoom;
