import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IResultsUser } from '../../redux/apiSlice';

interface IPropsGameResults {
  users: IResultsUser[];
  total?: number;
  title?: string;
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
`;

const QuizResults = ({ users, total = 0, title = 'QUIZ RESULTS:' }: IPropsGameResults) => {
  return (
    <StyledQuizResults className="QuizResults">
      <Typography variant="subtitle1">{title}</Typography>
      {users.map((user, idx) => (
        <Box className="quiz-player" key={user.id || idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {`${idx + 1}. `} {user.username}
          </Typography>
          <Typography variant="subtitle1">{total ? `${user.points} / ${total}`: user.points}</Typography>
        </Box>
      ))}
    </StyledQuizResults>
  );
};

export default QuizResults;
