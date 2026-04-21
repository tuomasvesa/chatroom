import { Box, Button, Container, Field, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle registration logic here
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

        <Button colorScheme="blue" onClick={handleLogin} w="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
