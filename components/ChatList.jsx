import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";

const ChatList = ({ users }) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        keyExtractor={(item) => Math.random()}
        contentContainerStyle={{ flex: 1, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (
          <ChatItem router={router} noBorder={index + 1 == users?.length} item={item} index={index} />
        )}
      />
    </View>
  );
};

export default ChatList;
