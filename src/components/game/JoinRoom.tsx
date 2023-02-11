import { Alert, AlertTitle, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import NavigateBack from '../NavigateBack';

interface IPropsJoinRoom {
  joined?: boolean;
  error?: boolean;
  onJoin: (password: string) => void;
}

const JoinRoom = ({ joined = false, error = false, onJoin }: IPropsJoinRoom) => {
  const [password, setPassword] = useState('');

  return (
    <div className="JoinRoom">
      <NavigateBack />
      {!joined && (
        <div>
          <Typography variant="subtitle2">Enter room password: </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ flexGrow: 1 }} />

            <Button variant="contained" size="large" onClick={() => onJoin(password)} sx={{ marginLeft: '20px' }}>
              JOIN
            </Button>
          </Box>

          {error && (
            <Box sx={{ marginTop: '30px' }}>
              <Alert severity="error">Please enter the correct password</Alert>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
