import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import getRoomId from "./getRoomId";

const handleSendMessage = async (textRef, item, user, inputRef) => {
  let message = textRef.current.trim();
  if (!message) {
    return;
  }
  try {
    let roomId = getRoomId(item?.userId, user?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");

    textRef.current = "";
    if (inputRef) inputRef?.current?.clear();
    await addDoc(messageRef, {
      userId: user?.userId,
      text: message,
      profileUrl: user?.profileUrl,
      senderName: user?.userName,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    Alert.alert("Message", "sending Failed");
  }
};

export default handleSendMessage;
