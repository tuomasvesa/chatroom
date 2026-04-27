import { Box, Button, Stack, Text } from "@chakra-ui/react";
// import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router";
import ChatList from "../miscellaneous/ChatList";
import ChatBox from "../ChatBox";

const ChatPage = () => {
  // const { user } = ChatState();
  const navigation = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigation("/");
  };
  return (
    <div style={{ width: "100%" }}>
      {/* Header Bar */}
      <Box
        bg="#F2F0EF"
        color="white"
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="black">
          Chat App
        </Text>
        {/* <Text fontSize="xl" fontWeight="bold" color="black">
          Logged in as {user?.userName}
        </Text> */}
        <Button onClick={logoutHandler}>Log Out</Button>
      </Box>
      <Stack direction={"row"} h="91.5vh" spacing={0}>
        <Box w="30%" h="100%" overflowY="auto">
          <ChatList />
        </Box>
        <Box flex={1} h="100%">
          <ChatBox />
        </Box>
      </Stack>
    </div>
  );
};

export default ChatPage;
