import React from "react";
import { ScrollView } from "react-native";
import ShowSingleMessage from "./ShowSingleMessage";

const Message = ({ messages, scrollRef }) => {
  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10 }}>
      {messages.map((message, index) => (
        <ShowSingleMessage message={message} key={index} />
      ))}
    </ScrollView>
  );
};

export default Message;
