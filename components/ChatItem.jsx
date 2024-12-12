import { Image } from "expo-image";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/authContext";
import { db } from "../firebase.config";
import blurhash from "../utils/blurHash";
import getRoomId from "../utils/getRoomId";
import convertTimestamp from "../utils/timeConverter";

const ChatItem = ({ item, index, router, noBorder }) => {
  const [message, setMessage] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const goToChat = () => {
    router.push({ pathname: "chatRoom", params: item });
  };
  const { user } = useAuth();

  useEffect(() => {
    const roomId = getRoomId(item.userId, user?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessage(allMessages[allMessages.length - 1] === undefined ? null : allMessages[allMessages.length - 1]);
    });
  }, []);

  useEffect(() => {
    if (message?.createdAt) {
      setTime(convertTimestamp(message?.createdAt));
    }
  }, [message?.createdAt]);


  return (
    <TouchableOpacity
      onPress={goToChat}
      className="flex-row justify-between mx-4 items-center gap-4"
      style={{
        borderBottomColor: noBorder ? "#fff" : "#e5e5e5",
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 4,
      }}>
      <Image
        style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={{ blurhash }}
        transition={300}
      />
      <View className="flex-1 justify-between flex-row">
        <View>
          <Text className="text-2xl font-medium">{item?.userName}</Text>
          <View className="font-thin">
            {message === null ? (
              <Text className="font-light text-gray-500">Say hi 👋</Text>
            ) : message === undefined ? (
              <Text>message loading...</Text>
            ) : user?.userId == message?.userId ? (
              <Text className="font-bold">
                You :{" "}
                <Text className="font-light text-gray-500">
                  {message?.text.length > 15 ? `${message?.text.slice(0, 15)}...` : `${message?.text}`}
                </Text>
              </Text>
            ) : (
              <Text className="font-bold">
                {message?.senderName} :{" "}
                <Text className="font-light text-gray-500">
                  {message?.text.length > 15 ? `${message?.text.slice(0, 15)}...` : `${message?.text}`}
                </Text>
              </Text>
            )}
          </View>
        </View>
        {message !== null && <Text className="text-gray-400">{time === undefined ? "loading..." : `${time}`}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
