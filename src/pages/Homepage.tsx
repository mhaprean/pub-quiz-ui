import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import AddRoom from '../components/AddRoom';
import LoginRegister from '../components/LoginRegister';
import Rooms from '../components/Rooms';
import { useAppSelector } from '../redux/hooks';

interface IPropsHompage {
  socket: Socket;
}

const Homepage = ({ socket }: IPropsHompage) => {
  const authState = useAppSelector((root) => root.auth);

  const getCode = () => {
    let r = Math.floor(100000 + Math.random() * 900000);
    return r + '';
  };

  const roomPassword = getCode();

  const handleRoomCreated = () => {
    socket.emit('ROOM_CREATED', { message: 'room created' });
  };

  return (
    <div>
      <div className="container">
        {authState.isAuth && (
          <>
            <Rooms socket={socket} />
          </>
        )}

        {authState.isAuth && authState.user?.role === 'host' && <AddRoom password={roomPassword} onRoomCreated={handleRoomCreated} />}

        {!authState.isAuth && <LoginRegister />}
      </div>
    </div>
  );
};

export default Homepage;
