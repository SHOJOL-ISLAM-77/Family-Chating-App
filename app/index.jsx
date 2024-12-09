import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="dark" />
      <ActivityIndicator size={"large"} color={"gray"} />
    </View>
  );
};

export default StartPage;
