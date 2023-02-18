import AddTournament from '../components/tournament/AddTournament';
import TournamentList from '../components/tournament/TournamentList';
import { useGetMyTournamentsAsHostQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const MyTournaments = () => {
  const authState = useAppSelector((state) => state.auth);

  const { data: myTournamentsAsHost, isLoading } = useGetMyTournamentsAsHostQuery({}, { skip: authState.user?.role !== 'host' });

  return (
    <div className="container">
      {authState.isAuth && authState.user?.role === 'host' && <AddTournament />}

      <TournamentList tournaments={myTournamentsAsHost || []} asHost />
    </div>
  );
};

export default MyTournaments;
