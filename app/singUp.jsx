import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import axios from "axios";
import InputField from "../components/InputField";
import KeyBoardView from "../components/KeyBoardView";
import { AuthContext } from "../context/authContext";
import uploadImage from "../utils/uploadImage";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const URL = useRef("");
  const [uploading, setUploading] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleSignUp = async () => {
    if (!email.current || !password.current || !name.current || !URL.current) {
      Alert.alert("Sign Up", "All fields are required");
      return;
    }

    try {
      setSigningUp(true);
      const response = await register(
        email.current,
        password.current,
        name.current,
        URL.current
      );
      if (!response.success) {
        Alert.alert("Sign Up", "Invalid email or other issue");
      }
    } catch (error) {
      Alert.alert("Sign Up", "Something went wrong during registration.");
    } finally {
      setSigningUp(false);
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
            <TouchableOpacity
              onPress={() => uploadImage(setUploading, setUploadStatus, URL)}
              className="bg-gray-200 py-2 rounded-lg flex-row items-center"
              disabled={uploading || signingUp}
            >
              {uploading ? (
                <ActivityIndicator
                  size="small"
                  color="black"
                  className="ml-2"
                />
              ) : (
                <Entypo
                  name="link"
                  size={24}
                  color="black"
                  style={{ marginLeft: 8 }}
                />
              )}
              <Text className="text-lg ml-2">
                {uploadStatus || "Upload Profile Image"}
              </Text>
            </TouchableOpacity>
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
            onPress={handleSignUp}
            className="bg-[#00DEC1] py-2 rounded-lg mt-5 flex-row justify-center items-center"
            disabled={uploading || signingUp}
          >
            {signingUp ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-4xl text-center text-white">Sign Up</Text>
            )}
          </TouchableOpacity>

          <Text className="text-lg py-2 text-center">
            Already have an account?{" "}
            <Link href={"signIn"} className="text-indigo-500 font-bold">
              Sign In
            </Link>
          </Text>
        </View>
      </View>
    </KeyBoardView>
  );
};

export default SignUp;