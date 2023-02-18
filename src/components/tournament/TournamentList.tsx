import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { ITournament } from '../../redux/apiSlice';

const StyledTournamentList = styled('div')`
  .tournament {
    border: 2px solid var(--input-border-color);
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

interface IPropsTournamentList {
  tournaments: ITournament[];
  asHost?: boolean;
}

const TournamentList = ({ tournaments, asHost = false }: IPropsTournamentList) => {
  return (
    <StyledTournamentList className="TournamentList">
      {tournaments.length > 0 && <Typography variant="subtitle2">{asHost ? 'Tournaments hosted by me:' : 'My tournaments:'}</Typography>}

      {tournaments.map((tournament, idx) => (
        <div key={tournament._id} className="tournament">
          <Typography variant="subtitle1">{decodeHtml(tournament.title)}</Typography>

          <Link to={`/tournaments/${tournament._id}`}>
            <Button variant="contained" size="small" className="tournament-button">
              See details
            </Button>
          </Link>
        </div>
      ))}
    </StyledTournamentList>
  );
};

export default TournamentList;
