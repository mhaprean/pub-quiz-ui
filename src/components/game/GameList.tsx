import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IMyGame } from '../../redux/apiSlice';
import GameItem from './GameItem';

interface IPropsGameList {
  games: IMyGame[];
  asHost?: boolean;
}

const StyledGameList = styled('div')`
  margin-bottom: 30px;
`;

const GameList = ({ games, asHost = false }: IPropsGameList) => {
  return (
    <StyledGameList className="GameList">
      <Typography variant="subtitle2">{asHost ? 'Games hosted by me:' : 'My previous games:'}</Typography>
      {games.map((game, idx) => (
        <GameItem key={game._id} game={game} />
      ))}
      {games.length === 0 && <Typography>{asHost ? 'No games hosted yet.' : 'No games played yet.'}</Typography>}
    </StyledGameList>
  );
};

export default GameList;
