import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";
import ProfileHeader from "../../components/ProfileHeader";
import { useAuth } from "../../context/authContext";
import blurhash from "../../utils/blurHash";
import AudioSender from "../../components/Audio";
import AudioRecorderUploader from "../../components/Audio";

const profile = () => {
  const { user } = useAuth();

  return (
    <View>
      <ProfileHeader user={user} />
      <StatusBar style="dark" />
      <View className="py-4">
        <View className="justify-center items-center">
          <Image
            style={{ height: 200, aspectRatio: 1, borderRadius: 100 }}
            source={user?.profileUrl}
            placeholder={{ blurhash }}
            transition={300}
          />
        </View>
        <View className="flex-row py-5 items-center px-5">
          <Text className="w-1/3 text-3xl text-gray-500">Name: </Text>
          <Text className="w-full text-3xl">{user?.userName}</Text>
        </View>
        <View className="flex-row py-5 items-center px-5">
          <Text className="w-1/3 text-3xl text-gray-500">Email: </Text>
          <Text className="w-full text-2xl">{user?.email}</Text>
        </View>
      </View>

      <AudioRecorderUploader />
    </View>
  );
};

export default profile;
