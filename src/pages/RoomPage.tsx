import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoinRoom from '../components/game/JoinRoom';
import { useGetCurrentGameQuery, useGetCurrentGameResultsQuery, useJoinGameMutation } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';
import Room from './Room';
import { Socket } from 'socket.io-client';
import { CircularProgress } from '@mui/material';
import Loader from '../components/Loader';

interface IPropsRoomPage {
  socket: Socket;
  isConnected: boolean;
}

const RoomPage = ({ socket, isConnected }: IPropsRoomPage) => {
  // game id
  const { id } = useParams();

  const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  const [joined, setJoined] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const [joinGame, response] = useJoinGameMutation();

  const { data: currentGame, isLoading, refetch } = useGetCurrentGameQuery({ gameId: id || '' }, { skip: !id });

  const { data: gameResults } = useGetCurrentGameResultsQuery({ gameId: id || '' }, { skip: !currentGame?.ended });

  console.log('!!!!!!!!!!!! gameResults ', gameResults);

  const handleJoinRoom = (pass: string) => {
    if (authState.user && id) {
      if (pass === currentGame?.password) {
        setJoined(true);
        setErrorPass(false);

        joinGame({ gameId: id, password: pass });
      } else {
        setErrorPass(true);
      }
    }
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
      {currentGame &&
        authState.user &&
        !currentGame.participants.includes(authState.user._id) &&
        currentGame.host._id !== authState.user._id && <JoinRoom onJoin={handleJoinRoom} error={errorPass} joined={joined} />}

      {currentGame &&
        authState.user &&
        (currentGame.participants.includes(authState.user._id) || currentGame.host._id === authState.user._id) && (
          <Room
            isConnected={isConnected}
            socket={socket}
            user={authState.user}
            isHost={currentGame.host._id === authState.user._id}
            currentGame={currentGame}
            onRefetch={refetch}
            userAnswers={gameResults?.results || []}
          />
        )}
    </div>
  );
};

export default RoomPage;
