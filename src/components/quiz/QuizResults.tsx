import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IResultsUser } from '../../redux/apiSlice';

interface IPropsGameResults {
  users: IResultsUser[];
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
`;

const QuizResults = ({ users }: IPropsGameResults) => {
  return (
    <StyledQuizResults className="QuizResults">
      <Typography variant="h6">QUIZ RESULTS:</Typography>
      {users.map((user, idx) => (
        <Box className="quiz-player" key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {`${idx + 1}. `} {user.username}
          </Typography>
          <Typography variant="subtitle1">{user.points}</Typography>
        </Box>
      ))}
    </StyledQuizResults>
  );
};

export default QuizResults;
