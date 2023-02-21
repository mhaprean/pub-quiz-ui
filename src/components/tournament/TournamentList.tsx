import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IMyTournament } from '../../redux/apiSlice';
import TournamentItem from './TournamentItem';

const StyledTournamentList = styled('div')`
  margin-bottom: 50px;
`;

interface IPropsTournamentList {
  tournaments: IMyTournament[];
  asHost?: boolean;
}

const TournamentList = ({ tournaments, asHost = false }: IPropsTournamentList) => {
  return (
    <StyledTournamentList className="TournamentList">
      {tournaments.length > 0 && <Typography variant="subtitle2">{asHost ? 'Tournaments hosted by me:' : 'My tournaments:'}</Typography>}

      {tournaments.map((tournament, idx) => (
        <TournamentItem key={tournament._id} tournament={tournament} />
      ))}

      {tournaments.length === 0 && (
        <Typography variant="subtitle2">
          {asHost ? 'No tournaments hosted by me.' : 'You have not participated in any tournaments yet'}
        </Typography>
      )}
    </StyledTournamentList>
  );
};

export default TournamentList;
