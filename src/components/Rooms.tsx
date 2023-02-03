import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useGetGamesQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const StyledRooms = styled('div')`
  margin-bottom: 30px;
`;

const Rooms = () => {
  const authState = useAppSelector((root) => root.auth);

  const { data: games, isLoading, isError } = useGetGamesQuery({}, { skip: !authState.isAuth });

  return (
    <StyledRooms className="Rooms">
      <h3>Rooms</h3>

      {!isLoading &&
        games &&
        games.map((game, idx) => (
          <div className="room" key={idx}>
            <div className="room-name">
              <h2>{game.title}</h2>
            </div>

            <Link to={`/rooms/${game._id}`}>
              <button className="button-join">Join room</button>
            </Link>
          </div>
        ))}

    </StyledRooms>
  );
};

export default Rooms;
