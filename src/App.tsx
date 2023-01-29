import { createTheme, ThemeProvider } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import AddRoom from './components/AddRoom';
import LoginRegister from './components/LoginRegister';
import Navigation from './components/Navigation';
import QuizSlide from './components/quiz/QuizSlide';
import Rooms from './components/Rooms';
import { useGetQuizesQuery } from './redux/apiSlice';
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
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const getCode = () => {
    let r = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    return r;
  };

  const roomPassword = getCode();

  return (
    <ThemeProvider theme={theme}>
      <div className="App dark">
        <Navigation />
        <div className="container">
          {authState.isAuth && (
            <>
              <Rooms />

              <AddRoom password={roomPassword} />
            </>
          )}

          {!authState.isAuth && <LoginRegister />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
