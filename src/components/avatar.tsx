import { Image, StyleSheet, Text, View } from "react-native";
import images from "./defaultAvatarHelper";

const Avatar = ({ item }) => {
  if (!item) {
    return null; // Return null or a placeholder component if data is undefined
  }
  if(item.faceURL==="" && item.nickname){
    
    return(
        <View >
            <View style = {styles.textImage}>
                <Text style = {styles.textImageText}>{item.nickname.charAt(0).toUpperCase()}</Text>
            </View>
        </View>
    );
  }else if(item.faceURL==="" && item.showName){
    return(<View >
        <View style = {styles.textImage}>
            <Text style = {styles.textImageText}>{item.showName.charAt(0).toUpperCase()}</Text>
        </View>
    </View>);
  } 
  else if(item.faceURL==="ic_avatar_01"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_01} />
    );
  }else if(item.faceURL==="ic_avatar_02"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_02} />
    );
  }else if(item.faceURL==="ic_avatar_03"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_03} />
    );
  }else if(item.faceURL==="ic_avatar_04"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_04} />
    );
  }else if(item.faceURL==="ic_avatar_05"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_05} />
    );
  }else if(item.faceURL==="ic_avatar_06"){
    return(
        <Image style={styles.avatar} source={images.ic_avatar_06} />
    );
  }else if(item.faceURL==="New Friend"){
    return(
        <Image style={styles.avatar} source={images.newFriend} />
    );
  }else if(item.faceURL==="New Group"){
    return(
        <Image style={styles.avatar} source={images.newGroup} />
    );
  }else if(item.faceURL==="My Groups"){
    return(
        <Image style={styles.avatar} source={images.myGroups} />
    );
  }
  return (
      <Image style={styles.avatar} source={{uri: item.faceURL}} />
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
  textImage:{
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"blue"
  },
  textImageText:{
    color:"white",
    textAlign:'center'
  }
});

export default Avatar;