import { ChatState } from "../Context/ChatProvider";
import { Box, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toaster } from "./ui/toaster";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
axios.defaults.baseURL = "http://localhost:5000";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = (selectedChatProps) => {
  const selectedChat = selectedChatProps.props;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { user } = ChatState();
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config,
      );
      setMessages(data);
      setLoading(false);

      // socket io code: join to the chatroom
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster.create({
        title: "Error occurred!",
        description: "Failed to load the messages",
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();

      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification if the message belongs to chat that isnt currently viewed (optional)
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
    // console.log("Running sendMessage function");
    if (event.key === "Enter" && message) {
      event.preventDefault();
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        //setMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: message,
            chatId: selectedChat._id,
          },
          config,
        );

        socket.emit("new message", data);

        setMessages([...messages, data]);
        // socket.io code from older prototype

        // const payload = {
        //   sender: user._id,
        //   content: data.content,
        //   chat: selectedChat._id,
        // };
        // //send via socket
        // if (socketRef.current && socketRef.current.connected) {
        //   socketRef.current.emit("sendMessage", payload);
        // } else {
        //   console.warn(
        //     "Socket not connected. Falling back to POST (optional).",
        //   );
        // }
        setMessage("");
        //socket.io code ends here
      } catch (error) {
        toaster.create({
          title: "Error occurred!",
          description: "Failed to send the message",
          type: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);

    // Typing Indicator Logic
  };

  return (
    <>
      {selectedChat ? (
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          h="100%"
          bg="#E8E8E8"
          borderRadius="lg"
          overflow="hidden"
        >
          <Text fontSize="xl" fontWeight="bold" color="black" p={3} pb={2}>
            {selectedChat.chatName}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            flex={1}
            w="100%"
            overflowY="auto"
            p={3}
            bg="#E8E8E8"
          >
            {loading ? (
              <Spinner
                size="xl"
                // w={20}
                // h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box className="messages">
                <ScrollableChat messages={messages} />
              </Box>
            )}
          </Box>
          <form mt={3}>
            <Input
              variant="filled"
              bg="#E8E8E8"
              placeholder="Enter a message"
              onChange={typingHandler}
              onKeyDown={sendMessage}
              value={message}
            ></Input>
          </form>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text>Click on a chat to start chatting!</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
