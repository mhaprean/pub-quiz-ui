import { Alert, AlertTitle, Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginUserMutation, useRegisterUserMutation } from '../../redux/apiSlice';
import { IUser, login, setUser } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import Avatars from './Avatars';

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
  const [image, setImage] = useState('avatars/64_1.png');

  const [error, setError] = useState('');

  const [loginBackend, { isLoading: isLoginLoading, isSuccess: isSuccessLogin }] = useLoginUserMutation();

  const [registerBackend, { isLoading: isRegisterLoading, isSuccess: isSuccessRegister }] = useRegisterUserMutation();

  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setError('');
  };

  const validateUsername = (name: string) => {
    const alphanumericRegex = /^[a-zA-Z][a-zA-Z0-9 ]*[a-zA-Z0-9]$/;
    if (!alphanumericRegex.test(name)) {
      return 'Username must start with a letter and can only contain alphanumeric characters.';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  const handleLogin = async () => {
    if (isLoginLoading || isSuccessLogin) {
      return null;
    }

    try {
      const res = await loginBackend({
        data: {
          name: username.trim(),
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
    const errorUsername = validateUsername(username);

    if (errorUsername) {
      setError(errorUsername);
      return null;
    }

    const errorEmail = validateEmail(email);

    if (errorEmail) {
      setError(errorEmail);
      return null;
    }

    if (isRegisterLoading || isSuccessRegister) {
      return null;
    }

    const newUser: Partial<IUser> = {
      name: username.trim(),
      email,
      password,
      image,
    };

    try {
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
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {tab === 'register' && (
            <TextField
              label="Email"
              variant="outlined"
              type={'email'}
              autoComplete="off"
              required
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
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {tab === 'register' && <Avatars selected={image} onSelect={setImage} />}

          {error && (
            <Alert severity="error" sx={{ marginTop: '20px' }}>
              <AlertTitle>Error!</AlertTitle>
              {error}
            </Alert>
          )}

          {tab === 'login' && (
            <Box sx={{ marginTop: '25px' }}>
              <Link to={'/forgot-password'}>
                <Typography color={'primary'} variant="body2">
                  Forgot password
                </Typography>
              </Link>
            </Box>
          )}

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
