import React from 'react';
import { useParams } from 'react-router-dom';
import DayHeader from '../components/game/DayHeader';
import Loader from '../components/Loader';
import NavigateBack from '../components/NavigateBack';
import QuizResults from '../components/quiz/QuizResults';
import TournamentHeader from '../components/tournament/TournamentHeader';
import TournamentResults from '../components/tournament/TournamentResults';
import { getFormatedDate, isSameDay } from '../helpers/formatDate';
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

  const getScorePerRound = (users: IUser[], games: IGame[]): IResultsUser[] => {
    const participants: { [key: string]: IResultsUser } = {};

    games.forEach((game, idx) => {
      game.results.forEach((result, i) => {
        if (!participants[result.user_id]) {
          const user = users.find((usr) => usr._id === result.user_id);

          if (user) {
            participants[user._id] = {
              user_id: user._id,
              username: user.name,
              image: user.image,
              points: 0,
            };
          }
        }

        participants[result.user_id].points = participants[result.user_id].points + result.points;
      });
    });

    const tournamentParticipants = Object.values(participants).sort((a, b) => b.points - a.points);

    return tournamentParticipants;
  };

  const filterByDate = (array: IGame[], date: string) => {
    const filteredArray = array.filter((item) => {
      const itemDate = new Date(item.createdAt).toISOString().slice(0, 10);
      return itemDate === date;
    });
    return filteredArray;
  };

  return (
    <div className="container">
      {isLoading && <Loader />}

      {!isLoading && data && (
        <>
          <NavigateBack />
          <TournamentHeader tournament={data} />
          <TournamentResults users={getScore(data.participants, data.games)} title={'Tournament leaderboard - all rounds'} />
          {data.games
            .filter((game) => game.quiz)
            .map((game, idx) => (
              <React.Fragment key={game._id}>
                {(idx === 0 || !isSameDay(game.createdAt, data.games[idx - 1].createdAt)) && (
                  <>
                    <DayHeader date={game.createdAt} />
                    <TournamentResults
                      title={'Leaderboard - ' + getFormatedDate(game.createdAt)}
                      users={getScorePerRound(data.participants, filterByDate(data.games, game.createdAt.slice(0, 10)))}
                    />
                  </>
                )}

                <QuizResults users={game.results} title={game.title} gameId={game._id} key={idx} />
              </React.Fragment>
            ))}
        </>
      )}
    </div>
  );
};

export default TournamentPage;
