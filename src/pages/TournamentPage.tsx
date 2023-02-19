import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import QuizResults from '../components/quiz/QuizResults';
import TournamentResults from '../components/tournament/TournamentResults';
import { IGame, IResultsUser, useGetTournamentQuery } from '../redux/apiSlice';
import { IUser } from '../redux/authSlice';

const TournamentPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetTournamentQuery({ tournamentId: id || '' }, { skip: !id });

  const getScore = (users: IUser[], games: IGame[]): IResultsUser[] => {
    const participants: { [key: string]: IResultsUser } = {};

    users.forEach((user) => {
      participants[user._id] = {
        user_id: user._id,
        username: user.name,
        image: user.image,
        points: 0,
      };
    });

    games.forEach((game, idx) => {
      game.results.forEach((result, i) => {
        participants[result.user_id].points = participants[result.user_id].points + result.points;
      });
    });

    const tournamentParticipants = Object.values(participants).sort((a, b) => b.points - a.points);

    return tournamentParticipants;
  };
  return (
    <div className="container">
      {isLoading && <Loader />}

      {!isLoading && data && <TournamentResults users={getScore(data.participants, data.games)} />}

      {!isLoading && data && data.games.map((game, idx) => <QuizResults users={game.results} title={game.title} key={idx} />)}
    </div>
  );
};

export default TournamentPage;
