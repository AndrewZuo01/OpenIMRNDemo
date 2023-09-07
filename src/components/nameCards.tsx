import { Image, StyleSheet, Text, View } from "react-native";

const NameCards = ({ item }) => {
  if (!item || !item.friendInfo) {
    return null; // Return null or a placeholder component if data is undefined
  }

  return (
    <View style={styles.contactItem}>
      <Image style={styles.avatar} source={require("./ic_avatar_01.png")} />
      <Text>{item.friendInfo.nickname}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    backgroundColor: "white",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default NameCards;
