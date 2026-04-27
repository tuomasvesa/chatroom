import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import React from "react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "63%" }}
      h="91.5vh"
      borderRadius="1lg"
      borderWidth={"1px"}
    >
      <SingleChat props={selectedChat} />
    </Box>
  );
};

export default ChatBox;
