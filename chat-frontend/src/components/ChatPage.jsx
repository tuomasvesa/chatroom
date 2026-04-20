import { Container } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {

    const [chats, setChats] = useState([]);


    const fetchChats = async () => {
        await axios.get("/api/chat").then(
            (response) => {
                const result = response.data;
                setChats(result);
            },
            (error) => {
                console.log("Error when getting data: " + error);
            }
        )
    }

    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <>
            <Container>
                {chats.map((chat) =>
                    <div key={chat._id}>{chat.chatName}</div>)}
            </Container>
        </>
    )
};

export default ChatPage;