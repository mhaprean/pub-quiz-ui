import { Button, Tab, Tabs, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useLoginUserMutation, useRegisterUserMutation } from '../redux/apiSlice';
import { login, setUser } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

const StyledLoginRegister = styled('div')`
  .login-tabs {
    border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  }

  .MuiFormControl-root {
    margin-top: 30px;
    width: 100%;
  }

  .MuiButtonBase-root {
    margin-top: 30px;
    height: 50px;
  }
`;

const LoginRegister = () => {
  const [tab, setTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [loginBackend, { isLoading: isLoginLoading, isSuccess: isSuccessLogin }] = useLoginUserMutation();

  const [registerBackend, { isLoading: isRegisterLoading, isSuccess: isSuccessRegister }] = useRegisterUserMutation();

  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleLogin = async () => {
    if (isLoginLoading || isSuccessLogin) {
      return null;
    }

    try {
      const res = await loginBackend({
        data: {
          name: username, // identifier can be username or email
          password: password,
        },
      }).unwrap();

      if (res && res.access_token && res.user) {
        dispatch(login(res.access_token));
        dispatch(setUser(res.user));
      }
    } catch (error: any) {
      setError(error.data.message ? error.data.message : 'there is an error');
    }
  };

  const handleRegister = async () => {
    if (isRegisterLoading || isSuccessRegister) {
      return null;
    }

    try {
      const newUser = {
        name: username,
        email,
        password,
      };

      const res = await registerBackend({ data: newUser }).unwrap();

      if (res && res.user && res.access_token) {
        dispatch(login(res.access_token));
        dispatch(setUser(res.user));
      }
    } catch (error: any) {
      setError(error.data.message ? error.data.message : 'there is an error. try again later');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tab === 'login') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <StyledLoginRegister className="LoginRegister">
      <Tabs className="login-tabs" value={tab} onChange={handleTabChange}>
        <Tab label="Login" value={'login'} />
        <Tab label="Register" value={'register'} />
      </Tabs>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <TextField
            label="Username"
            variant="outlined"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {tab === 'register' && (
            <TextField
              label="Email"
              variant="outlined"
              type={'email'}
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <TextField
            label="Password"
            variant="outlined"
            type={'password'}
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>{error}</div>

          <div>
            {tab === 'login' && (
              <Button type="submit" variant="contained" fullWidth size="large" onClick={handleLogin}>
                Login
              </Button>
            )}

            {tab === 'register' && (
              <Button type="submit" variant="contained" fullWidth size="large" onClick={handleRegister}>
                Register
              </Button>
            )}
          </div>
        </div>
      </form>
    </StyledLoginRegister>
  );
};

export default LoginRegister;
