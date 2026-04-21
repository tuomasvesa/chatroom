import { Box, Container, Strong, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

const WelcomePage = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box className="glass-box" d="flex" justifyContent="center" p={3}>
          <Text fontSize="4xl" fontFamily="Work sans" color="black">
            Chat App
          </Text>
        </Box>
        <Box className="glass-box" w="100%" p={4}>
          <Tabs.Root defaultValue="login" variant="enclosed">
            <Tabs.List rounded="l3" p="0" gap={"3px"} color={"white"}>
              <Tabs.Trigger value="login">Login</Tabs.Trigger>
              <Tabs.Trigger value="register">Register</Tabs.Trigger>
              <Tabs.Indicator rounded="l2" />
            </Tabs.List>
            <Tabs.Content value="login">
              <Strong>Login</Strong> {<Login />}
            </Tabs.Content>
            <Tabs.Content value="register">
              <Strong>Register</Strong> {<Register />}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Container>
    </>
  );
};

export default WelcomePage;
