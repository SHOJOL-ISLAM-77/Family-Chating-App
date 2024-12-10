import React from "react";
import { TextInput, View } from "react-native";

const InputField = ({
  icon,
  state,
  placeholder,
  kbType = "default",
  secure = false,
}) => {
  return (
    <View className="bg-neutral-100 rounded-md px-3 py-1  flex-row justify-start items-center gap-4">
      {icon}
      <TextInput
        onChangeText={(value) => (state.current = value)}
        className="flex-1 text-xl"
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        keyboardType={kbType}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default InputField;
