import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import RoomPage from './pages/RoomPage';

import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import MyGames from './pages/MyGames';
import CreateQuiz from './pages/CreateQuiz';
import FaqPage from './pages/FaqPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const defaultSocket: Socket = io.connect(SERVER_URL, {
  withCredentials: true,
});

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#262a33',
        paper: '#2e323c',
      },
      primary: {
        main: '#b0bfff',
      },
      secondary: {
        main: '#8fffad',
      },
      success: {
        main: '#8fffad'
      }
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const [socket, setSocket] = useState<Socket>(defaultSocket);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io.connect(SERVER_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setTimeout(() => {
        socket!.connect();
      }, 2000);
    }
  }, [isConnected, socket]);

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <div className="App dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage socket={socket} />} />
          <Route path="/games" element={<MyGames />} />
          <Route path="/quiz/create" element={<CreateQuiz />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/confirm/:id/:token" element={<ConfirmAccountPage />} />

          <Route path="/rooms/:id" element={<RoomPage socket={socket} isConnected={isConnected} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
