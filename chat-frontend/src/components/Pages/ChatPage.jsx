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
      <Stack direction={"row"}>
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <ChatList />
          {/* {user && <ChatBox />*/}
        </Box>
        <ChatBox />
      </Stack>
    </div>
  );
};

export default ChatPage;
