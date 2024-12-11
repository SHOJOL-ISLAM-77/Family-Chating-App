import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import blurhash from "../utils/blurHash";

const ChatItem = ({ item, index, router, noBorder }) => {
  const goToChat = () => {
    router.push({ pathname: "chatRoom", params: item });
  };
  return (
    <TouchableOpacity
      onPress={goToChat}
      className="flex-row justify-between mx-4 items-center gap-4"
      style={{
        borderBottomColor: noBorder ? "#fff" : "#e5e5e5",
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 4,
      }}>
      <Image
        style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={{ blurhash }}
        transition={300}
      />
      <View className="flex-1 justify-between flex-row">
        <View>
          <Text className="text-2xl font-medium">{item?.userName}</Text>
          <Text className="font-thin text-gray-400">last message</Text>
        </View>

        <Text className="text-gray-400">time</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
