
import './App.css';
import { Route, Routes } from 'react-router';
import WelcomePage from './components/WelcomePage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/chatpage' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
