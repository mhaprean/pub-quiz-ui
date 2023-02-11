import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IMyGame } from '../../redux/apiSlice';

interface IPropsGameList {
  games: IMyGame[];
}

const StyledGameList = styled('div')`
  .game {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  }
`;

const GameList = ({ games }: IPropsGameList) => {
  return (
    <StyledGameList className="GameList">
      <Typography variant="subtitle2">My previous games:</Typography>
      {games.map((game, idx) => (
        <div className="game" key={game._id}>
          <div className="room-name">
            <Typography className="room-name" variant="h6">
              {decodeHtml(game.title)}
            </Typography>
          </div>

          <Link to={`/rooms/${game._id}`}>
            <Button variant="contained" size="large" className="room-button">
              See more
            </Button>
          </Link>
        </div>
      ))}
      {games.length === 0 && <Typography>No games played yet.</Typography>}
    </StyledGameList>
  );
};

export default GameList;
