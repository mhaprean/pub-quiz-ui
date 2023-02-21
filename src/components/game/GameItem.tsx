import { Alert, Avatar, Button, Chip, Collapse, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { formatDate } from '../../helpers/formatDate';
import { IMyGame, useDeleteGameMutation } from '../../redux/apiSlice';
import { useAppSelector } from '../../redux/hooks';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IProspGameItem {
  game: IMyGame;
}

const StyledGameItem = styled('div')`
  border: 2px solid var(--input-border-color);
  padding: 10px;
  margin-top: 15px;
  border-radius: 10px;
  background: var(--background-paper);

  .game-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .room-button {
    text-transform: initial;
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    flex-shrink: 0;
    white-space: nowrap;
  }
  .game-participants {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .game-host {
    margin: 10px 0;

    .host {
      margin-right: 10px;
    }
  }
  .info {
    margin: 10px 0;

    .MuiChip-root {
      margin-right: 10px;
    }
  }

  .confirmation {
    .MuiButton-root {
      margin: 10px;
    }
  }
`;

const GameItem = ({ game }: IProspGameItem) => {
  const [open, setOpen] = useState(false);
  const authState = useAppSelector((state) => state.auth);

  const [deleteGame, {isLoading}] = useDeleteGameMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteGame({ gameId: game._id }).unwrap();
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <StyledGameItem className="GameItem">
      <div className="game-title">
        <Typography className="room-name" variant="subtitle1">
          {decodeHtml(game.title)}
        </Typography>

        {authState.user?._id === game.host._id && (
          <IconButton color="error" onClick={() => setOpen(!open)}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </div>
      <div className="game-host">
        <Typography variant="caption" className="host">
          Host:
        </Typography>
        <Chip size="small" avatar={<Avatar alt="" src={game.host.image} />} label={game.host.name} variant="outlined" />
      </div>

      <div className="info">
        <Chip label={`${game.quiz.total} questions`} size="small" variant="outlined" />
        <Chip label={formatDate(game.createdAt)} size="small" variant="outlined" />
      </div>

      <div className="game-participants">
        <Chip label={game.participants.length === 1 ? '1 participant' : `${game.participants.length} participants`} size="small" />
        <Link to={`/rooms/${game._id}`}>
          <Button variant="contained" size="small" className="room-button">
            See more
          </Button>
        </Link>
      </div>

      {authState.user?._id === game.host._id && (
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
              <Typography variant="body2">Are you sure you want to delete "{game.title}" ?</Typography>

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
    </StyledGameItem>
  );
};

export default GameItem;
