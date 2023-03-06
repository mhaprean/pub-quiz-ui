import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import place1 from '../../assets/1st-place-medal.svg';
import CupIcon from './CupIcon';
import { IResultsUser } from '../../redux/apiSlice';

const BASE_URL = import.meta.env.BASE_URL;

const StyledTournamentResults = styled('div')`
  .title {
    margin-top: 20px;
  }
  .player {
    display: flex;
    align-items: center;
    border: 2px solid var(--input-border-color);
    padding: 5px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);
  }

  .user-avatar {
    margin-right: 10px;
  }

  .points {
    margin-left: auto;
    margin-right: 10px;
  }
`;

interface IPropsTournamentResults {
  users: IResultsUser[];
  title?: string;
}

const TournamentResults = ({ users, title = '' }: IPropsTournamentResults) => {
  return (
    <StyledTournamentResults className="TournamentResults">
      {users.length > 0 && <Typography className="title">{title ? title : 'Leaderboard: '}</Typography>}
      {users.length === 0 && <Typography variant="subtitle2">No users played this tournament</Typography>}

      {users.map((user, idx) => (
        <Box className="player" key={idx}>
          <CupIcon place={idx + 1} />

          <Avatar sx={{ width: 30, height: 30 }} className="user-avatar">
            <img src={BASE_URL + user.image} width={'32px'} height={'32px'} />
          </Avatar>

          <Typography variant="subtitle1">{user.username}</Typography>
          <Typography variant="subtitle1" className="points">
            {user.points}
          </Typography>
        </Box>
      ))}
    </StyledTournamentResults>
  );
};

export default TournamentResults;
