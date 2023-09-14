import { StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/avatar";
import { GetSelfInfo, GetUsersInfo } from "../../api/openimsdk";
import { useEffect, useState } from "react";

const TextChatCard = ({ message }) => {
  const [item, setItem] = useState({});
  const [selfID, setSelfID] = useState(false);

  if (message.contentType !== 101) return null;

  useEffect(() => {
    
    const getAvatar = async () => {
      setItem({
        nickname: message.senderNickname ?? "",
        faceURL: message.senderFaceUrl ?? "",
      });
      const currentID = await GetSelfInfo();
      if (JSON.parse(currentID.data).userID === message.sendID) setSelfID(true);
    };
    getAvatar();
  }, []);

  if (selfID) {
    return (
      <View style={styles.chatContainerSelf}>
        
        <View style={styles.messageContainerSelf}>
          <Text style={styles.messageText}> </Text>
          <Text style={styles.messageText}>{message.textElem.content}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Avatar item={item} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.chatContainerOther}>
      <View style={styles.avatarContainer}>
        <Avatar item={item} />
      </View>
      <View style={styles.messageContainerOther}>
        <Text style={styles.messageText}>{message.senderNickname}</Text>
        <Text style={styles.messageText}>{message.textElem.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainerSelf: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  chatContainerOther: {
    flexDirection: "row",
    marginVertical: 5,
  },
  avatarContainer: {
    marginHorizontal: 10,
  },
  messageContainerSelf: {
    maxWidth: "80%",
  },
  messageContainerOther: {
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
});

export default TextChatCard;
