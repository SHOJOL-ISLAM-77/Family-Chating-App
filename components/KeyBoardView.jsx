import { KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";

const KeyBoardView = ({ children, inChat = false }) => {
  let kbConfig = {};
  if (inChat) {
    kbConfig = { keyboardVerticalOffset: 90 };
  }
  return (
    <KeyboardAvoidingView {...kbConfig} style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!inChat) Keyboard.dismiss();
        }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardView;
