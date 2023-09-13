import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NameCards from "../../components/nameCards";
import { GetFriendApplicationListAsRecipient } from "../api/openimsdk";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import  API  from "../api/typings";

const FriendRequestPage = () => {
    const [friends, setFriends] = useState<API.API.Friend.FriendRequest[]>([]);
    const navigator = useNavigation<NativeStackNavigationProp<any>>();
    useEffect(() => {
        const initFriends = async () => {
            const g = await GetFriendApplicationListAsRecipient();

            if (g.success) {
                setFriends(JSON.parse(g.data));
            }
        };
        initFriends();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={()=>navigator.goBack()}>
                <Image source={require("../../../assets/imgs/back.png")} />
                </TouchableOpacity>
                <Text style={styles.title}>New Friend</Text>
                <View></View>
            </View>
            {/* <NameCards item={undefined} /> */}
            <Text style={styles.friendApplicationText}>Friends Application</Text>
            <FlatList
                data={friends}
                renderItem={({ item }) => {
                    return (
                        <NameCards item={item} />
                    )
                }}
            keyExtractor={(item) => item.createTime.toString()} // Use a unique key
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    backButton: {
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 8,
    },
    friendApplicationText: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 16,
    },
});

export default FriendRequestPage;
