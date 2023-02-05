import { Alert, AlertTitle, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface IPropsJoinRoom {
  joined?: boolean;
  error?: boolean;
  onJoin: (password: string) => void;
}

const JoinRoom = ({ joined = false, error = false, onJoin }: IPropsJoinRoom) => {
  const [password, setPassword] = useState('');

  return (
    <div className="JoinRoom">
      {joined && (
        <Alert severity="success">
          <AlertTitle>Welcome!</AlertTitle>
          Please wait for the game to <strong>be started!</strong>
        </Alert>
      )}

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
            <Box sx={{marginTop: '30px'}}>
              <Alert severity="error">Please enter the correct password</Alert>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinRoom;