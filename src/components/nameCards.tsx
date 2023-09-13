import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "./avatar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const NameCards = ({ item }:{item:any}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  if (!item)
    return null
  if (item.fromUserID) {
    const friendInfoWrapper = {
      nickname: item.fromNickname,
      faceURL: item.fromFaceURL
    }
    let result = <Text>accepted</Text>
    if (item.handleResult == -1)
      result = <Text>rejected</Text>
    if (item.handleResult == 0) {
      const handleViewPress = () => {
        navigation.navigate("FriendRequests",{item})
      }
      return (
        <View style={[styles.contactItem, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar item={friendInfoWrapper} />
            <View style={{marginBottom:30}}>
              <Text>{item.fromNickname}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ backgroundColor: "blue", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }} onPress={handleViewPress}>
            <Text style={{ color: "white" }}>View</Text>
          </TouchableOpacity>
        </View>


      );
    }

    return (

      <View style={styles.contactItem}>
        <Avatar item={friendInfoWrapper} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{item.fromNickname}</Text>
            <Text>{result}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>

          </View>

        </View>
      </View>
    )
  }
  if (!item || !item.friendInfo) {
    return null; // Return null or a placeholder component if data is undefined
  }
  if (item.friendInfo.userID === "newFriend") {

    const onhandlePressNewFriend = () => {

      navigation.navigate("Friends")
    }
    return (
      <TouchableOpacity style={styles.contactItem} onPress={onhandlePressNewFriend}>
        <Avatar item={item.friendInfo} />
        <Text>{item.friendInfo.nickname}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.contactItem}>
      <Avatar item={item.friendInfo} />
      <Text>{item.friendInfo.nickname}</Text>
    </TouchableOpacity>
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
