import { View, Text } from "react-native";
import React from "react";
import { MenuOption, MenuOptions } from "react-native-popup-menu";

const CustomMenuItem = ({ action, icon, text, value = null }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="flex-row justify-between items-center px-4 py-1">
        <Text className="text-xl">{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
};

export default CustomMenuItem;
