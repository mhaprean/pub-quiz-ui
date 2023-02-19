import { Avatar, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ISingleTournament } from '../../redux/apiSlice';

const BASE_URL = import.meta.env.BASE_URL;

const StyledTournamentHeader = styled('div')`
  margin-bottom: 50px;
  .host {
    margin-right: 10px;
  }
`;

interface IPropsTournamentHeader {
  tournament: ISingleTournament;
}

const TournamentHeader = ({ tournament }: IPropsTournamentHeader) => {
  return (
    <StyledTournamentHeader className="TournamentHeader">
      <Typography variant="h4">Tournament: {tournament.title}</Typography>
      <div>
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
    </StyledTournamentHeader>
  );
};

export default TournamentHeader;
