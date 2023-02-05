import { Box, Typography } from '@mui/material';
import { IResultsUser } from '../../redux/apiSlice';


interface IPropsGameResults {
  users: IResultsUser[];
}

const QuizResults = ({ users }: IPropsGameResults) => {
  return (
    <div>
      {users.map((user, idx) => (
        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">{`${idx+1}. `} {user.username}</Typography>
          <Typography variant="subtitle1">{user.points}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default QuizResults;
