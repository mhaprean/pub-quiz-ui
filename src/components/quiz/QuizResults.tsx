import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IResultsUser } from '../../redux/apiSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IPropsGameResults {
  users: IResultsUser[];
  total?: number;
  title?: string;
  gameId?: string;
}

const StyledQuizResults = styled('div')`
  .quiz-player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid var(--input-border-color);
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);
  }
  margin-top: 20px;
  margin-bottom: 30px;

  .room-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      margin-left: 10px;
      font-weight: ${(props) => props.theme.typography.fontWeightBold};
    }

    .see-more-button {
      margin-left: auto;
    }
  }
`;

const QuizResults = ({ users, total = 0, title = 'QUIZ RESULTS:', gameId = '' }: IPropsGameResults) => {
  return (
    <StyledQuizResults className="QuizResults">
      {gameId ? (
        <Link to={`/rooms/${gameId}`} className="room-title">
          <Typography variant="subtitle1">Game: </Typography>
          <Typography variant="subtitle1" className="title">
            {title}
          </Typography>
          <IconButton size="small" color="primary" className="see-more-button">
            <ArrowForwardIcon />
          </IconButton>
        </Link>
      ) : (
        <Typography variant="subtitle1">{title}</Typography>
      )}

      {users.map((user, idx) => (
        <Box className="quiz-player" key={user.id || idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {`${idx + 1}. `} {user.username}
          </Typography>
          <Typography variant="subtitle1">{total ? `${user.points} / ${total}` : user.points}</Typography>
        </Box>
      ))}
    </StyledQuizResults>
  );
};

export default QuizResults;
