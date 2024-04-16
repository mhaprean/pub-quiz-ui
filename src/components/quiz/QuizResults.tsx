import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IResultsUser } from '../../redux/apiSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const winners = ['Seekers'];

interface IPropsGameResults {
  users: IResultsUser[];
  total?: number;
  title?: string;
  gameId?: string;
}

const StyledQuizResults = styled('div')`
  margin-top: 20px;

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

  .game-title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .title {
      margin-left: 10px;
      font-weight: ${(props) => props.theme.typography.fontWeightBold};
    }
  }

  .user-list {
    background: ${(props) => props.theme.palette.background.default};
  }

  .accordion-header {
    border: 2px solid var(--input-border-color);
  }
`;

const QuizResults = ({ users, total = 0, title = 'QUIZ RESULTS:', gameId = '' }: IPropsGameResults) => {
  return (
    <StyledQuizResults className="QuizResults">
      {!gameId && (
        <>
          <Typography variant="subtitle1">{title}</Typography>
          {users.map((user, idx) => (
            <Box
              className="quiz-player"
              key={user.id || idx}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="subtitle1" sx={{ color: winners.includes(user.username) ? '#FFD700' : '#fff'}}>
                {`${idx + 1}. `} {user.username}
              </Typography>
              <Typography variant="subtitle1">{total ? `${user.points} / ${total}` : user.points}</Typography>
            </Box>
          ))}
        </>
      )}

      {gameId && (
        <Accordion disableGutters elevation={0} square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-header">
            <Link to={`/rooms/${gameId}`} className="game-title">
              <Typography variant="subtitle1">Game: </Typography>
              <Typography variant="subtitle1" className="title">
                {title}
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails className="user-list">
            {users.map((user, idx) => (
              <Box
                className="quiz-player"
                key={user.id || idx}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography variant="subtitle1" sx={{ color: winners.includes(user.username) ? '#FFD700' : '#fff'}}>
                  {`${idx + 1}. `} {user.username}
                </Typography>
                <Typography variant="subtitle1">{total ? `${user.points} / ${total}` : user.points}</Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </StyledQuizResults>
  );
};

export default QuizResults;
