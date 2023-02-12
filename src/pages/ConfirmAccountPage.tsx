import { Alert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigateBack from '../components/NavigateBack';
import { useConfirmAccountMutation } from '../redux/apiSlice';
import { logout } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';

const ConfirmAccountPage = () => {
  const { id, token } = useParams();

  const dispatch = useAppDispatch();

  const [confirmAccount, response] = useConfirmAccountMutation();

  useEffect(() => {
    if (id && token) {
      confirmAccount({ userId: id, token: token });
    }
  }, [id, token]);

  useEffect(() => {
    dispatch(logout());
  }, [response.isSuccess]);

  return (
    <div className="container">
      {response && response.isSuccess && (
        <Alert severity="success">
          <AlertTitle>Welcome!</AlertTitle>
          Account confirmed!! From now on you are a host. Return to{' '}
          <Link to="/">
            <strong>homepage</strong>
          </Link>
        </Alert>
      )}
      {response && response.isError && (
        <Alert severity="error">
          <AlertTitle>Sorry!</AlertTitle>
          There was an error during account confirmation. Return to{' '}
          <Link to="/">
            <strong>homepage</strong>
          </Link>
        </Alert>
      )}

      {response && response.isLoading && (
        <Alert severity="info">
          <AlertTitle>Loading!</AlertTitle>
          Please wait.
        </Alert>
      )}
    </div>
  );
};

export default ConfirmAccountPage;
