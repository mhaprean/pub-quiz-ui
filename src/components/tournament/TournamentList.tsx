import { Avatar, Button, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IMyTournament, ITournament } from '../../redux/apiSlice';

const StyledTournamentList = styled('div')`
  .tournament {
    border: 2px solid var(--input-border-color);
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);
  }

  .tournament-host {
    margin: 10px 0;

    .host {
      margin-right: 10px;
    }
    .games-count {
      margin-left: 10px;
    }
  }

  .participants {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
        <div key={tournament._id} className="tournament">
          <div className="title">
            <Typography variant="subtitle1">{decodeHtml(tournament.title)}</Typography>
          </div>
          <div className="tournament-host">
            <Typography variant="caption" className="host">
              Host:
            </Typography>
            <Chip size="small" avatar={<Avatar alt="" src={tournament.host.image} />} label={tournament.host.name} variant="outlined" />

            <Chip
              className="games-count"
              label={tournament.games.length === 1 ? '1 game' : `${tournament.games.length} games`}
              size="small"
              variant="outlined"
            />
          </div>

          <div className="participants">
            <Chip
              label={tournament.participants.length === 1 ? '1 participant' : `${tournament.participants.length} participants`}
              size="small"
            />
            <Link to={`/tournaments/${tournament._id}`}>
              <Button variant="contained" size="small" className="tournament-button">
                See details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </StyledTournamentList>
  );
};

export default TournamentList;
