import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { decodeHtml } from '../helpers/decodeHTML';
import { useGetGamesQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const StyledRooms = styled('div')`
  margin-bottom: 30px;

  .room {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid var(--input-border-color);
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    background: var(--background-paper);
  }

  .room-button {
    text-transform: initial;
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    flex-shrink: 0;
  }
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
          <div className="room" key={game._id}>
            <div className="room-name">
              <Typography className="room-name" variant="h6">
                {decodeHtml(game.title)}
              </Typography>
            </div>

            <Link to={`/rooms/${game._id}`}>
              {authState.user?._id === game.host ? (
                <Button variant="contained" size="large" className="room-button" color="secondary">
                  Host room
                </Button>
              ) : (
                <Button variant="contained" size="large" className="room-button">
                  Join room
                </Button>
              )}
            </Link>
          </div>
        ))}

      {!isLoading && (!games || games.length === 0) && <div>No game rooms available yet. Please wait.</div>}
    </StyledRooms>
  );
};

export default Rooms;
