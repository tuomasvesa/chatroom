import { ChatState } from "../Context/ChatProvider";
import { Box, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toaster } from "./ui/toaster";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";

const SingleChat = (selectedChatProps) => {
  const selectedChat = selectedChatProps.props;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const socketRef = useRef(null);
  const { user } = ChatState();
  axios.defaults.baseURL = "http://localhost:5000";

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
      console.log("Messages: ", messages);
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
    fetchMessages();
    // Socket io code from first prototype
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to socket server: ", socketRef.current.id);
    });
    socketRef.current.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected: ", reason);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [selectedChat]);

  const sendMessage = async (event) => {
    // // code from older prototype
    // if (!user || !message) return;
    // const payload = { message };
    // //send via socket
    // if (socketRef.current && socketRef.current.connected) {
    //   socketRef.current.emit("sendMessage", payload);
    // } else {
    //   console.warn("Socket not connected. Falling back to POST (optional).");
    // }
    // setMessage("");
    console.log("Running sendMessage function");
    if (event.key === "Enter" && message) {
      event.preventDefault();
      console.log("pressed enter and message has content");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: message,
            chatId: selectedChat._id,
          },
          config,
        );
        console.log(data);
        setMessages([...messages, data]);
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
            {loading ? (
              <Spinner
                size="xl"
                // w={20}
                // h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
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
