import { Alert, AlertTitle, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const errorEmail = validateEmail(email);

    if (errorEmail) {
      setError(errorEmail);
      return false;
    }

    if (response.isLoading) {
      return false;
    }

    try {
      console.log('!!!!!! call forgot pass mutation');

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
          disabled={response.isSuccess}
        >
          {response.isSuccess ? 'Submited' : 'Submit'}
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ marginTop: '20px' }}>
          <AlertTitle>Error!</AlertTitle>
          {error}
        </Alert>
      )}

      {response.isSuccess && (
        <Alert severity="success" sx={{ marginTop: '20px' }}>
          <AlertTitle>Success!</AlertTitle>
          {response.data.message}. Return to{' '}
          <Link to="/">
            <strong> Homepage</strong>
          </Link>
        </Alert>
      )}
    </div>
  );
};

export default ForgotPassword;
