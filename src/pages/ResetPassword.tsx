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
    try {
      if (token && id) {
        const res = await resetPassword({ token: token, userId: id, password }).unwrap();
        setError('');
      }
    } catch (error) {
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
        >
          Reset password
        </Button>
      </form>
      {id} {token}
      {response.isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success!</AlertTitle>
          {response.data.message}. Return to <Link to="/">Homepage</Link>
        </Alert>
      )}
    </div>
  );
};

export default ResetPassword;
