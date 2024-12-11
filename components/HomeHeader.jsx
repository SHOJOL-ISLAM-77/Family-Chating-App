import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useAuth } from "../context/authContext";
import blurhash from "../utils/blurHash";
import CustomMenuItem from "./CustomMenuItem";

const HomeHeader = () => {
  const { user, logOut } = useAuth();
  const handleProfileAction = (value) => {
    console.log(value);
  };

  const handleLogOut = async () => {
    await logOut();
  };
  return (
    <View
      style={{ paddingTop: 40 }}
      className={"px-5 pb-2 bg-[#00DEC1] rounded-b-3xl shadow justify-between items-center flex-row"}>
      <Text className="text-3xl text-white font-medium">Chats</Text>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWraper: {
              // marginTop:20
            },
          }}>
          <Image
            style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
            source={user?.profileUrl}
            placeholder={{ blurhash }}
            transition={300}
          />
        </MenuTrigger>

        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              marginTop: 45,
              marginLeft: -30,
              borderCurve: "continuous",
              width: 160,
            },
          }}>
          <CustomMenuItem
            value={"profile"}
            action={handleProfileAction}
            text={"Profile"}
            icon={<Feather name="user" size={25} color={"gray"} />}
          />
          <View className="bg-slate-100 py-px w-full" />
          <CustomMenuItem
            action={handleLogOut}
            text={"Sing Out"}
            icon={<Feather name="log-out" size={25} color={"gray"} />}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HomeHeader;
