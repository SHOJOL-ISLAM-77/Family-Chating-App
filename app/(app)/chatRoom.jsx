import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import KeyBoardView from "../../components/KeyBoardView";
import Message from "../../components/Message";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase.config";
import getRoomId from "../../utils/getRoomId";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const textRef = useRef();
  const inputRef = useRef(null);

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
  }, []);

  const createRoomIfNotExist = async () => {
    const roomId = getRoomId(item.userId, user?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) {
      return;
    }
    try {
      let roomId = getRoomId(item.userId, user?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.userName,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Message", "sending Failed");
    }
  };
  // console.log({ messages });
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader item={item} router={router} />
      <View className="p-px bg-gray-300" />
      <KeyBoardView inChat={true}>
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible px-3 py-1">
          <Message messages={messages} />
          <View className="bg-white rounded-2xl flex-row justify-between items-center px-3 py-1.5 my-2">
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              className="flex-1"
              placeholder="Type message..."
            />
            <TouchableOpacity onPress={handleSendMessage} className="bg-gray-200 p-2 rounded-full ">
              <MaterialCommunityIcons name="send" size={24} color={"#43464b"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyBoardView>
    </View>
  );
};

export default ChatRoom;
