import { Alert, AlertTitle, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/apiSlice';

const ResetPassword = () => {
  const { id, token } = useParams();

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [resetPassword, response] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (password.length < 4) {
      setError('Password must have at least 4 characters.');

      return false;
    }
    if (response.isLoading) {
      return false;
    }

    try {
      if (token && id) {
        const res = await resetPassword({ token: token, userId: id, password }).unwrap();
        setError('');
      }
    } catch (error: any) {
      if (error && error.data && error.data.message) {
        setError(error.data.message);
      }
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleResetPassword();
  };

  return (
    <div className="container">
      <Typography variant="subtitle1">Enter the new password: </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Password"
          variant="outlined"
          type={'password'}
          autoComplete="off"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: '100%', marginTop: '30px' }}
        />

        <Button
          sx={{ height: '50px', marginTop: '30px' }}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={handleResetPassword}
          disabled={response.isSuccess}
        >
          {response.isSuccess ? 'Password reseted' : 'Reset password'}
        </Button>
      </form>

      {!response.isSuccess && error.length > 0 && (
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
            <strong>Homepage</strong>
          </Link>
        </Alert>
      )}
    </div>
  );
};

export default ResetPassword;
