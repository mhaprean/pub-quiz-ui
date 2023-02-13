import GameList from '../components/game/GameList';
import { useGetMyGamesAsHostQuery, useGetMyGamesQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const MyGames = () => {
  const authState = useAppSelector((state) => state.auth);

  const { data: games, isLoading } = useGetMyGamesQuery({});

  const { data: gamesAsHost, isLoading: isGamesAsHostLoading } = useGetMyGamesAsHostQuery({}, { skip: authState.user?.role !== 'host' });

  return (
    <div className="container">
      {!isLoading && games && <GameList games={games} />}
      {!isGamesAsHostLoading && gamesAsHost && <GameList games={gamesAsHost} asHost />}
    </div>
  );
};

export default MyGames;
