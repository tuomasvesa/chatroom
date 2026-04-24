import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  });
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  //   const navigate = useNavigate();

  //   useEffect(
  //     () => {
  //       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //       setUser(userInfo);

  //   if (!userInfo) {
  //     // if not logged in:
  //     navigate("/");
  //   }
  // },
  // [
  //   /*navigate*/
  // ],
  //   );

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
