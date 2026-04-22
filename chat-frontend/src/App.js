import "./App.css";
import { Route, Routes } from "react-router";
import WelcomePage from "./components/WelcomePage";
import ChatPage from "./components/ChatPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
