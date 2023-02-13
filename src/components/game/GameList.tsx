import { Avatar, Button, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IMyGame } from '../../redux/apiSlice';

interface IPropsGameList {
  games: IMyGame[];
  asHost?: boolean;
}

const StyledGameList = styled('div')`
  margin-bottom: 30px;
  .game {
    border: 2px solid var(--input-border-color);
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);
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
`;

const GameList = ({ games, asHost = false }: IPropsGameList) => {
  return (
    <StyledGameList className="GameList">
      <Typography variant="subtitle2">{asHost ? 'Games hosted by me:' : 'My previous games:'}</Typography>
      {games.map((game, idx) => (
        <div className="game" key={game._id}>
          <div className="game-title">
            <Typography className="room-name" variant="subtitle1">
              {decodeHtml(game.title)}
            </Typography>
          </div>
          <div className="game-host">
            <Typography variant="caption" className="host">
              Host:
            </Typography>
            <Chip size="small" avatar={<Avatar alt="" src={game.host.image} />} label={game.host.name} variant="outlined" />
          </div>

          <div className="game-participants">
            <Chip label={game.participants.length === 1 ? '1 participant' : `${game.participants.length} participants`} size="small" />
            <Link to={`/rooms/${game._id}`}>
              <Button variant="contained" size="small" className="room-button">
                See more
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {games.length === 0 && <Typography>No games played yet.</Typography>}
    </StyledGameList>
  );
};

export default GameList;
