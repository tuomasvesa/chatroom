import { ChatState } from "../Context/ChatProvider";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import * as ScrollableFeedModule from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const ScrollableFeed = ScrollableFeedModule.default;
  console.log(messages);
  console.log("ScrollableFeed", ScrollableFeed);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m) => (
          <div style={{ display: "flex" }} key={m._id}>
            {/* <Tooltip
          label={m.sender?.name}
          placement="bottom-start"
          hasArrow
        >
          <span>{m.content}</span>
        </Tooltip> */}
            <Box
              style={{
                backgroundColor: `${m.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                borderRadius: "20px",
                padding: "5px 15px",
                margin: "1px",
                maxWidth: "75%",
                marginLeft: `${m.sender?._id === user._id ? "auto" : "0"}`,
                textAlign: "left",
              }}
            >
              <Text fontSize="sm" fontWeight="bold">
                {m.sender?.username}
              </Text>
              <Text>{m.content}</Text>
            </Box>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
