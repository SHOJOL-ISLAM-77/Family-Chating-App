import { AntDesign, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import blurhash from "../utils/blurHash";

const ChatRoomHeader = ({ item, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Image
              style={{ height: 35, aspectRatio: 1, borderRadius: 100 }}
              source={item?.profileUrl}
              placeholder={{ blurhash }}
              transition={300}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.userName}</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row gap-3 items-center text-slate-400">
            <TouchableOpacity>
              <FontAwesome6 name="phone" size={20} color="#555b63" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="video-camera" size={24} color="#555b63" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;
