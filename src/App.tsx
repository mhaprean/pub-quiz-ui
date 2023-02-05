import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import Room from './pages/Room';
import { useAppSelector } from './redux/hooks';

import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const socket: Socket = io.connect(SERVER_URL);

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

  return (
    <ThemeProvider theme={theme}>
      <div className="App dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage socket={socket} />} />
          <Route path="/rooms/:id" element={<Room socket={socket} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
