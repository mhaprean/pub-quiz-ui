import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useCreateTournamentMutation } from '../../redux/apiSlice';

const StyledAddTournaments = styled('div')`
  .title {
    margin-bottom: 15px;
  }

  margin-bottom: 30px;
`;

const AddTournament = () => {
  const [name, setName] = useState('');

  const [createTournament, response] = useCreateTournamentMutation();

  const handleCreateTournament = async () => {
    try {
      const addedTournament = await createTournament({ title: name }).unwrap();

      setName('');
    } catch (error) {
      console.log('error creating tournament', error);
    }
  };

  return (
    <StyledAddTournaments className="AddTournament">
      <Typography variant="subtitle2" className="title">
        Add new tournament:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField label="Tournament name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} sx={{ flexGrow: 1 }} />

        <Button variant="contained" size="large" onClick={handleCreateTournament} sx={{ marginLeft: '20px' }} disabled={name.length < 3}>
          {response.isLoading ? 'Loading...' : 'Create'}

        </Button>
      </Box>
    </StyledAddTournaments>
  );
};

export default AddTournament;
