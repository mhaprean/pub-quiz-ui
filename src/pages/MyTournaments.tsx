import Loader from '../components/Loader';
import AddTournament from '../components/tournament/AddTournament';
import TournamentList from '../components/tournament/TournamentList';
import { useGetMyTournamentsAsHostQuery, useGetMyTournamentsQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const MyTournaments = () => {
  const authState = useAppSelector((state) => state.auth);

  const { data: myTournamentsAsHost, isLoading } = useGetMyTournamentsAsHostQuery({}, { skip: authState.user?.role !== 'host' });
  const { data: myTournaments, isFetching: isTournamentsFetching } = useGetMyTournamentsQuery({});

  return (
    <div className="container">
      {authState.isAuth && authState.user?.role === 'host' && <AddTournament />}

      {(isTournamentsFetching || isLoading) && <Loader />}

      {!isTournamentsFetching && <TournamentList tournaments={myTournaments || []} />}

      <TournamentList tournaments={myTournamentsAsHost || []} asHost />
    </div>
  );
};

export default MyTournaments;
