import { Box, Button, Field, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "../ui/toaster";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (!username || !password) {
      toaster.create({
        title: "Please fill both fields",
        type: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { username, password },
        config,
      );
      toaster.create({
        title: "Login Succesful",
        type: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data)); // store the users token in local memory
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toaster.create({
        title: "Error occured",
        description: error?.response?.data?.message || error.message, // In case of network error/CORS/server down and response is undefined
        type: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" py={8}>
      <VStack spacing={6} align="stretch">
        <Field.Root id="username">
          <Field.Label>
            Username
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field.Root>
        <Field.Root id="password">
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field.Root>

        <Button
          colorScheme="blue"
          onClick={handleLogin}
          w="full"
          color="white"
          style={{ marginTop: 15 }}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
