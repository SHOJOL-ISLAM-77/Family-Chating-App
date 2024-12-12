import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileHeader = ({ user }) => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        title: "",

        header: () => (
          <View
            style={{ paddingTop: 40 }}
            className={"px-5 py-3 pb-2 bg-[#00DEC1] rounded-b-3xl shadow justify-between items-center flex-row"}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-3xl flex-1 text-center pt-3 text-white font-medium ">{user?.userName}</Text>
          </View>
        ),
      }}
    />
  );
};

export default ProfileHeader;
