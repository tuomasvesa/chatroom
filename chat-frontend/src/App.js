import "./App.css";
import { Route, Routes } from "react-router";
import WelcomePage from "./components/Pages/WelcomePage";
import ChatPage from "./components/Pages/ChatPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
