import { Alert, AlertTitle, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForgotPasswordMutation } from '../redux/apiSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [forgotPassword, response] = useForgotPasswordMutation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  const handleForgotPassword = async () => {
    try {
      const errorEmail = validateEmail(email);

      if (errorEmail) {
        setError(errorEmail);
        return null;
      }

      const res = await forgotPassword({ email: email }).unwrap();

      setError('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleForgotPassword();
  };

  return (
    <div className="container">
      <Typography variant="subtitle1">Forgot your password? Enter your email and we'll send you a reset link.</Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Box>
          <TextField
            label="Email"
            variant="outlined"
            type={'email'}
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%', marginTop: '30px' }}
          />
        </Box>

        <Button
          sx={{ height: '50px', marginTop: '30px' }}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={handleForgotPassword}
        >
          Submit
        </Button>
      </form>

      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}

      {response.isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success!</AlertTitle>
          {response.data.message}
        </Alert>
      )}
    </div>
  );
};

export default ForgotPassword;
