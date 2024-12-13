// import { Image, useImage } from "expo-image";
import React from "react";
import { Image, Text, View } from "react-native";
import { useAuth } from "../context/authContext";

const ShowSingleMessage = ({ message }) => {
  console.log(message);
  const { user } = useAuth();
  const imageLinkRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload\/v\d+\/[a-zA-Z0-9_-]+\.jpg$/;

  if (user?.userId == message?.userId) {
    return (
      <View className="flex-row justify-end">
        <View className="w-3/4 flex-row justify-end">
          <View className="flex-row items-end justify-end bg-white m-2 p-3 px-4 rounded-2xl border border-neutral-200">
            {imageLinkRegex.test(message?.text) ? renderImage(message?.text) : <Text>{message?.text}</Text>}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="w-3/4 flex-row justify-start">
        <View className="flex-row items-start justify-start bg-[#00dec067] m-2 p-3 px-4 rounded-2xl border border-neutral-200">
          {imageLinkRegex.test(message?.text) ? renderImage(message?.text) : <Text>{message?.text}</Text>}
        </View>
      </View>
    );
  }
};

export default ShowSingleMessage;

const renderImage = (uri) => {
  console.log(uri);
  return (
    <View style={{ width: 100, height: 100, justifyContent: "center" }}>
      <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri }} />
    </View>
  );
};
