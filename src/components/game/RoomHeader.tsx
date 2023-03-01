import { Avatar, Chip, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatDate } from '../../helpers/formatDate';
import { ISingleGame } from '../../redux/apiSlice';

const BASE_URL = import.meta.env.BASE_URL;

const StyledRoomHeader = styled(Paper)`
  padding: 20px;
  margin-top: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
`;

interface IPropsRoomHeader {
  game: ISingleGame;
}

const RoomHeader = ({ game }: IPropsRoomHeader) => {
  return (
    <StyledRoomHeader className="RoomHeader" variant="outlined">
      <div className="title">
        <Typography variant="caption" className="game-title">
          Game:
        </Typography>
        <Typography variant="h4" className="game-title">
          {game.title}
        </Typography>
      </div>

      <div className="game-host">
        <Typography variant="caption" className="host">
          Hosted by:
        </Typography>
        <Chip size="small" avatar={<Avatar alt="" src={BASE_URL + game.host.image} />} label={game.host.name} variant="outlined" />
      </div>
      <div className="info">
        <Chip label={`${game.quiz.total} questions`} size="small" variant="outlined" />
        <Chip label={formatDate(game.createdAt)} size="small" variant="outlined" />
      </div>
    </StyledRoomHeader>
  );
};

export default RoomHeader;
