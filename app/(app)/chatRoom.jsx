import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import Message from "../../components/Message";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase.config";
import createRoomIfNotExist from "../../utils/createChatRoom";
import getRoomId from "../../utils/getRoomId";
import handleSendMessage from "../../utils/handleSendMessage";
import uploadImage from "../../utils/uploadImage";
const ChatRoom = () => {
  const item = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const scrollViewRef = useRef(null);
  const { user } = useAuth();

  const router = useRouter();
  const textRef = useRef();
  const inputRef = useRef(null);
  const URL = useRef("");

  useEffect(() => {
    createRoomIfNotExist();

    const roomId = getRoomId(item.userId, user?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", updateScrollView);

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View className="flex-1 bg-white">
      <ChatRoomHeader item={item} router={router} />
      <View className="p-px bg-gray-300" />
      <StatusBar style="dark" />

      <View className="flex-1 justify-between bg-neutral-200 overflow-visible px-3 py-1">
        <Message scrollRef={scrollViewRef} messages={messages} />
        <View className="bg-white rounded-full flex-row justify-between items-center px-3 py-1.5 my-2">
          <AntDesign
            onPress={async () => {
              await uploadImage(setUploading, setUploadStatus, URL);
              await handleSendMessage(URL, item, user, inputRef);
            }}
            name="camera"
            className="px-2"
            size={24}
            color={"#43464b"}
          />
          <TextInput
            ref={inputRef}
            onChangeText={(value) => (textRef.current = value)}
            className="flex-1"
            placeholder="Type message..."
          />
          <TouchableOpacity
            onPress={() => handleSendMessage(textRef, item, user, inputRef)}
            className="bg-gray-200 p-2 rounded-full ">
            <MaterialCommunityIcons name="send" size={24} color={"#43464b"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
