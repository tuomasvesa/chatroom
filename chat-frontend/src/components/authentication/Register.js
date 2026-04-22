import { Box, Button, Field, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    if (!username || !password || !confirmPassword) {
      toaster.create({
        title: "Please fill all the fields",
        type: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toaster.create({
        title: "Passwords do not match",
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
        "/api/user",
        { username, password, pic },
        config,
      );
      toaster.create({
        title: "Registration Succesful",
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

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toaster.create({
        title: "Please select an image!",
        type: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dcbtst9g8");
      fetch("https://api.cloudinary.com/v1_1/dcbtst9g8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toaster.create({
        title: "Please select an image!",
        type: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
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

        <Field.Root id="confirmPassword">
          <Field.Label>
            Confirm password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field.Root>

        <Field.Root id="pic">
          <Field.Label>
            Profile picture
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Field.Root>

        <Button
          colorScheme="blue"
          onClick={handleRegister}
          w="full"
          color="white"
          style={{ marginTop: 15 }}
          isLoading={loading}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
