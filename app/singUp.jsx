import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/InputField";
import KeyBoardView from "../components/KeyBoardView";
import { AuthContext } from "../context/authContext";

const SingUp = () => {
  const { register } = useContext(AuthContext);
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const URL = useRef("");

  const handleSingUp = async () => {
    if (!email.current || !password.current || !name.current || !URL.current) {
      Alert.alert("Sing Up", "Email and Password are required");
      return;
    }
    const response = await register(
      email.current,
      password.current,
      name.current,
      URL.current
    );
    if (!response.success) {
      Alert.alert("Sing Up", "Invalid email");
    }
  };

  return (
    <KeyBoardView>
      <View className="flex-1 mt-10">
        <Image
          style={{ height: 200, width: "100%" }}
          resizeMode="cover"
          source={{
            uri: "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1733680926~exp=1733684526~hmac=355b8780b18e638f3cefe718bc79932fa87c11eccf808883b02df1a2d2eef1f5&w=826",
          }}
        />

        <View className="px-4 pt-4">
          <Text className="text-5xl text-center">Sign Up</Text>
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
                />
              }
            />
            <InputField
              state={name}
              placeholder={"Type your Name"}
              icon={<Entypo name="email" size={24} color="black" />}
            />
            <InputField
              state={URL}
              placeholder={"Profile URL"}
              icon={<Entypo name="link" size={24} color="black" />}
            />
            <InputField
              state={password}
              placeholder={"Type your Password"}
              secure={true}
              icon={
                <MaterialIcons name="lock-outline" size={24} color="black" />
              }
            />
          </View>

          <TouchableOpacity
            onPress={handleSingUp}
            className="bg-[#00DEC1] py-2 rounded-lg mt-5"
          >
            <Text className="text-4xl text-center text-white">Sign Up</Text>
          </TouchableOpacity>

          <Text className="text-lg py-2 text-center">
            Already have an account?{" "}
            <Link href={"singIn"} className="text-indigo-500 font-bold">
              Sign In
            </Link>
          </Text>
        </View>
      </View>
    </KeyBoardView>
  );
};

export default SingUp;
