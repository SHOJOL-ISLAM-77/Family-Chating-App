import React from "react";
import { ScrollView } from "react-native";
import ShowSingleMessage from "./ShowSingleMessage";

const Message = ({ messages }) => {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 10 }} showsHorizontalScrollIndicator={false}>
      {messages.map((message, index) => (
        <ShowSingleMessage message={message} key={index} />
      ))}
    </ScrollView>
  );
};

export default Message;
