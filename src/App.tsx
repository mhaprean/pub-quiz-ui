import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import Room from './pages/Room';
import { useAppSelector } from './redux/hooks';
import RoomPage from './pages/RoomPage';

import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

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
      console.log('Connected to the server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
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
        console.log('Attempting to reconnect to the server');
        socket!.connect();
      }, 2000);
    }
  }, [isConnected, socket]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage socket={socket} />} />
          <Route path="/rooms/:id" element={<RoomPage socket={socket} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
