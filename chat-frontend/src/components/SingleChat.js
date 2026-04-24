import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import React from "react";

const SingleChat = (selectedChatProps) => {
  const selectedChat = selectedChatProps.props;
  return (
    <>
      {selectedChat ? (
        <>
          <Text fontSize="xl" fontWeight="bold" color="black">
            {selectedChat.chatName}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Messages here */}
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text>Click on a chat to start chatting!</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
