import { Box, Button, Field, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pic, setPic] = useState();

  const handleRegister = () => {
    // Handle registration logic here
    console.log({ username, password, pic });
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

        <Field.Root id="confirmPassword">
          <Field.Label>
            Confirm password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="password"
            placeholder="Enter password again"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Field.Root>

        <Field.Root id="pic">
          <Field.Label>
            Profile picture
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="file"
            value={pic}
            p={1.5}
            accept="image/*"
            onChange={(e) => setPic(e.target.value)}
          />
        </Field.Root>

        <Button colorScheme="blue" onClick={handleRegister} w="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
