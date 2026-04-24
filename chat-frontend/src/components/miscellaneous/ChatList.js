import { ChatState } from "../../Context/ChatProvider";
import React, { useEffect } from "react";
import { toaster } from "../ui/toaster";
import axios from "axios";
import { Box, VStack, Button, Stack } from "@chakra-ui/react";

const ChatList = () => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      } catch (error) {
        toaster.create({
          title: "Error occurred!",
          description: "Failed to load the chats",
          type: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <div>
      <Stack direction={"row"}>
        <Box w="30%" h="100%" p={4}>
          <VStack spacing={2} align="stretch">
            {chats &&
              chats.map((chat) => (
                <Button
                  key={chat._id}
                  onClick={() => {
                    console.log("setting selectedChat:", chat);
                    setSelectedChat(chat);
                  }}
                  bg={selectedChat?._id === chat._id ? "blue.500" : "gray.100"}
                  color={selectedChat?._id === chat._id ? "white" : "black"}
                  justifyContent="flex-start"
                  h="auto"
                  p={3}
                  _hover={{ bg: "blue.400", color: "white" }}
                >
                  {chat.chatName}
                </Button>
              ))}
          </VStack>
        </Box>
      </Stack>
    </div>
  );
};

export default ChatList;
