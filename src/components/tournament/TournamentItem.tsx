import { Alert, Avatar, Button, Chip, Collapse, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IMyTournament, useDeleteTournamentMutation } from '../../redux/apiSlice';
import { useAppSelector } from '../../redux/hooks';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

const StyledTournament = styled('div')`
  border: 2px solid var(--input-border-color);
  padding: 10px;
  margin-top: 15px;
  border-radius: 10px;
  background: var(--background-paper);

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tournament-host {
    margin: 10px 0;

    .host {
      margin-right: 10px;
    }
    .games-count {
      margin-left: 10px;
    }
  }

  .participants {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .confirmation {
    .MuiButton-root {
      margin: 10px;
    }
  }
`;

interface IPropsTournamentItem {
  tournament: IMyTournament;
}

const TournamentItem = ({ tournament }: IPropsTournamentItem) => {
  const [open, setOpen] = useState(false);
  const [deleteTournament, { isLoading }] = useDeleteTournamentMutation();

  const authState = useAppSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      const result = await deleteTournament({ tournamentId: tournament._id }).unwrap();
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <StyledTournament key={tournament._id} className="TournamentItem">
      <div className="title">
        <Typography variant="subtitle1">{decodeHtml(tournament.title)}</Typography>

        {authState.user?._id === tournament.host._id && (
          <IconButton color="error" onClick={() => setOpen(!open)}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </div>
      <div className="tournament-host">
        <Typography variant="caption" className="host">
          Host:
        </Typography>
        <Chip size="small" avatar={<Avatar alt="" src={tournament.host.image} />} label={tournament.host.name} variant="outlined" />

        <Chip
          className="games-count"
          label={tournament.games.length === 1 ? '1 game' : `${tournament.games.length} games`}
          size="small"
          variant="outlined"
        />
      </div>

      <div className="participants">
        <Chip
          label={tournament.participants.length === 1 ? '1 participant' : `${tournament.participants.length} participants`}
          size="small"
        />
        <Link to={`/tournaments/${tournament._id}`}>
          <Button variant="contained" size="small" className="tournament-button">
            See details
          </Button>
        </Link>
      </div>

      {authState.user?._id === tournament.host._id && (
        <div className="confirmation">
          <Collapse in={open}>
            <Alert
              severity="error"
              sx={{ marginTop: '20px' }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <Typography variant="body2">Are you sure you want to delete "{tournament.title}" ?</Typography>

              <Button variant="contained" color="error" onClick={handleDelete}>
                {isLoading ? 'Loading...' : 'Yes'}
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => setOpen(false)}>
                No
              </Button>
            </Alert>
          </Collapse>
        </div>
      )}
    </StyledTournament>
  );
};

export default TournamentItem;
