import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/authContext";

const ShowSingleMessage = ({ message }) => {
  const { user } = useAuth();
  if (user?.userId == message?.userId) {
    return (
      <View className="flex-row justify-end">
        <View className="w-3/4 flex-row justify-end">
          <View className=" flex-row items-end justify-end bg-white m-2 p-3 px-4 rounded-2xl border border-neutral-200">
            <Text>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="w-3/4 flex-row justify-start">
        <View className="flex-row items-start justify-start bg-[#00dec067] m-2 p-3 px-4 rounded-2xl border border-neutral-200">
          <Text>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

export default ShowSingleMessage;
