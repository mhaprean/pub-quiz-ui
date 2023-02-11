import GameList from '../components/game/GameList';
import { useGetMyGamesQuery } from '../redux/apiSlice';

const MyGames = () => {
  const { data: games, isLoading } = useGetMyGamesQuery({});

  return <div className="container">{!isLoading && games && <GameList games={games} />}</div>;
};

export default MyGames;
