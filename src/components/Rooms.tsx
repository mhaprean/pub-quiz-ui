import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useGetGamesQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const StyledRooms = styled('div')`
  margin-bottom: 30px;
`;

interface IPropsRooms {
  socket: Socket;
}

const Rooms = ({ socket }: IPropsRooms) => {
  const authState = useAppSelector((root) => root.auth);

  const { data: games, isLoading, isError, refetch } = useGetGamesQuery({}, { skip: !authState.isAuth });

  useEffect(() => {
    socket.on('SHOULD_REFETCH_ROOMS', () => {
      refetch();
    });

    return () => {
      socket.off('SHOULD_REFETCH_ROOMS');
    };
  }, [refetch]);

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
              <button className="button-join"> {authState.user?._id === game.host ? 'Host room' : 'Join room'}</button>
            </Link>
          </div>
        ))}

        {!isLoading && (!games || games.length === 0) && <div>
          No game rooms available yet. Please wait.
          </div>}
    </StyledRooms>
  );
};

export default Rooms;
