import { StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/avatar";
import { GetSelfInfo, GetUsersInfo } from "../../api/openimsdk";
import { useEffect, useState } from "react";

const TextChatCard = ({ message, sendID }) => {
  const [item, setItem] = useState({});
  const [selfID, setSelfID] = useState(false);

  useEffect(() => {
    const getAvatar = async () => {
      const result = await GetUsersInfo([sendID]);
      setItem({
        nickname: (JSON.parse(result.data))[0].publicInfo.nickname,
        faceURL: (JSON.parse(result.data))[0].publicInfo.faceURL,
      });
      const currentID = await GetSelfInfo();
      if (currentID === sendID) setSelfID(true);
    };
    getAvatar();
  }, []);

  if (selfID) {
    return (
      <View style={styles.chatContainerSelf}>
        <View style={styles.messageContainerSelf}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <Avatar item={item} />
      </View>
    );
  }

  return (
    <View style={styles.chatContainerOther}>
      <View style={styles.messageContainerOther}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Avatar item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainerSelf: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  chatContainerOther: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  messageContainerSelf: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageContainerOther: {
    backgroundColor: "#D5D5D5",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
});

export default TextChatCard;
