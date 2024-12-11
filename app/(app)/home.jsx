import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { userRef } from "../../firebase.config";

const home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    const q = query(userRef, where("userId", "!=", user.uid));
    const querySnap = await getDocs(q);

    let data = [];
    querySnap.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
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
