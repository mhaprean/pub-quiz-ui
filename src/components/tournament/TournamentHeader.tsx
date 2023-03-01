import { Avatar, Chip, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ISingleTournament } from '../../redux/apiSlice';

const BASE_URL = import.meta.env.BASE_URL;

const StyledTournamentHeader = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .tournament-host {
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

interface IPropsTournamentHeader {
  tournament: ISingleTournament;
}

const TournamentHeader = ({ tournament }: IPropsTournamentHeader) => {
  return (
    <StyledTournamentHeader className="TournamentHeader" variant="outlined">
      <div className="title">
        <Typography variant="caption" className="game-title">
          Tournament:
        </Typography>
        <Typography variant="h4" className="game-title">
          {tournament.title}
        </Typography>
      </div>

      <div className="tournament-host">
        <Typography variant="caption" className="host">
          Hosted by:
        </Typography>
        <Chip
          size="small"
          avatar={<Avatar alt="" src={BASE_URL + tournament.host.image} />}
          label={tournament.host.name}
          variant="outlined"
        />
      </div>

      <div className="info">
        <Chip label={`${tournament.games.length} games`} size="small" variant="outlined" />
        <Chip label={`${tournament.participants.length} participants`} size="small" variant="outlined" />
      </div>
    </StyledTournamentHeader>
  );
};

export default TournamentHeader;
