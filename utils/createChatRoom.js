import { doc, setDoc, Timestamp } from "firebase/firestore";
import getRoomId from "./getRoomId";
import { db } from "../firebase.config";

const createRoomIfNotExist = async () => {
  const roomId = getRoomId(item.userId, user?.userId);
  await setDoc(doc(db, "rooms", roomId), {
    roomId,
    createdAt: Timestamp.fromDate(new Date()),
  });
};

export default createRoomIfNotExist;
