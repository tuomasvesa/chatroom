import { ChatState } from "../../Context/ChatProvider";
import {
  Avatar,
  Button,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Portal,
} from "@chakra-ui/react";
import React from "react";

const SideDrawer = () => {
  const { user } = ChatState();

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <button>
          <Avatar size="sm" name={user?.userName} src={user?.pic} />
          Open
        </button>
      </MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItem>Log Out</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuRoot>
  );
};

export default SideDrawer;
