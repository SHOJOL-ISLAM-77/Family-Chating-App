import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import blurhash from "../utils/blurHash";

const ChatItem = ({ item, index, router, noBorder }) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between mx-4 items-center gap-4"
      style={{
        borderBottomColor: noBorder ? "#fff": "#e5e5e5" ,
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 4,
      }}
    >
      <Image
        style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluPfinI6xImt163SCqV6_g_tKNA-zJMYlNw&s"
        placeholder={{ blurhash }}
        transition={300}
      />
      <View className="flex-1 justify-between items-center flex-row">
        <View>
          <Text className="text-2xl font-medium">Shojol Islam</Text>
          <Text className="font-thin" style={{ color: "gray" }}>
            last message
          </Text>
        </View>

        <Text>time</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
