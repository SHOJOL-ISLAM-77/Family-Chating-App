import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const SingIn = () => {
  const email = useRef("");
  const password = useRef("");

  const handleLogin = async () => {
    if (!email.current || !password.current) {
      Alert.alert("Sing In", "Email and Password is requeired");
      return;
    }
    console.log({ email, password });
  };
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        gap: 20,
      }}
    >
      <Image
        className="h-2/6 w-auto"
        source={{
          uri: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1733680926~exp=1733684526~hmac=355b8780b18e638f3cefe718bc79932fa87c11eccf808883b02df1a2d2eef1f5&w=826",
        }}
      />
      <View className="mx-4 ">
        <Text className="text-5xl text-center"> Sing In Now</Text>
        <View className="pt-4 gap-6">
          <View className="bg-neutral-100 rounded-md px-3 flex-row justify-start items-center gap-4">
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
              className="text-3xl"
            />
            <TextInput
              onChangeText={(value) => (email.current = value)}
              className="flex-1 text-xl"
              placeholder="Type your Email"
              placeholderTextColor={"gray"}
              keyboardType="email-address"
            />
          </View>
          <View className="bg-neutral-100 rounded-md px-3 flex-row justify-start items-center gap-4">
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="black"
              className="text-3xl"
            />
            <TextInput
              onChangeText={(value) => (password.current = value)}
              className="flex-1 text-xl"
              placeholder="Type your Password"
              placeholderTextColor={"gray"}
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </View>
        <Text className="text-lg text-right font-semibold">
          Forget password ?
        </Text>
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-[#00DEC1] py-2 rounded-lg mt-5"
        >
          <Text className="text-4xl text-center text-white">Login</Text>
        </TouchableOpacity>
        <Text className="text-lg py-2 text-center">
          Don't have account?{" "}
          <Link href={"singUp"} className="text-indigo-500 underline">
            Please Sing Up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SingIn;
