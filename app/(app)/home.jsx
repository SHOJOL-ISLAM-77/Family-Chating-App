import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import ChatList from "../../components/ChatList";
import { getDoc, query, where } from "firebase/firestore";
import { userRef } from "../../firebase.config";

const home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([1, 2, 3, 4]);
  // console.log(user);
  useEffect(() => {
    if (user.uid) {
      // console.log({ userId: user.userId, uid: user.uider });
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    const q = query(userRef, where("userId", "!=", user.uid));
    const querySnap = await getDoc(q);
    let data;
    querySnap.forEtch((doc) => {
      data.push({ ...doc.data() });
    });
    console.log(data);
  };
  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
    </View>
  );
};

export default home;
