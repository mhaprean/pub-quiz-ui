import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import Room from './pages/Room';
import { useAppSelector } from './redux/hooks';

function App() {
  const authState = useAppSelector((root) => root.auth);

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
          <Route path="/" element={<Homepage />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
