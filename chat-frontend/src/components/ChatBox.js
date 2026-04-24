import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import React from "react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "63%" }}
      borderRadius="1lg"
      borderWidth={"1px"}
    >
      <SingleChat props={selectedChat} />
    </Box>
  );
};

export default ChatBox;
