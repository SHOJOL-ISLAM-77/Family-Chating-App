import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { userRef } from "../../firebase.config";

const home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading]=useState(true)

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
    setLoading(false)
  };
  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      {
        loading ?  <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"gray"} />
      </View>
      : users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
         <Text>Sorry.... No user found for chat</Text>
        </View>
      )}
    </View>
  );
};

export default home;
