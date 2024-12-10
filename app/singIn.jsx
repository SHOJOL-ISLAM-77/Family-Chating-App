import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/InputField";
import { useAuth } from "../context/authContext";

const SingIn = () => {
  const password = useRef("");
  const email = useRef("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.current || !password.current) {
      Alert.alert("Sing In", "Email and Password is requeired");
      return;
    }
    const response = await login(email.current, password.current);
    if (!response.success) {
      Alert.alert("Sing In", "Invalid Email or Password");
      return;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        marginTop: 40,
      }}
    >
      <Image
        className="h-2/6 w-auto"
        source={{
          uri: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1733680926~exp=1733684526~hmac=355b8780b18e638f3cefe718bc79932fa87c11eccf808883b02df1a2d2eef1f5&w=826",
        }}
      />
      <View className="mx-4 ">
        <Text className="text-5xl text-center"> Sing In</Text>
        <View className="pt-4 gap-6">
          <InputField
            state={email}
            kbType="email-address"
            placeholder={"Type your email"}
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
                className="text-3xl"
              />
            }
          />
          <InputField
            state={password}
            placeholder={"Type your Password"}
            secure={true}
            icon={
              <MaterialIcons
                name="lock-outline"
                size={24}
                color="black"
                className="text-3xl"
              />
            }
          />
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
          <Link href={"singUp"} className="text-indigo-500 font-bold">
            Sing Up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SingIn;
