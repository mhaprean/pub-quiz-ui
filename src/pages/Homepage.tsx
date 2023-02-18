import { useEffect, useMemo } from 'react';
import { Socket } from 'socket.io-client';
import AddRoom from '../components/room/AddRoom';
import LoginRegister from '../components/auth/LoginRegister';
import { useAppSelector } from '../redux/hooks';
import Rooms from '../components/room/Rooms';

interface IPropsHompage {
  socket: Socket;
}

const Homepage = ({ socket }: IPropsHompage) => {
  const authState = useAppSelector((root) => root.auth);

  const getCode = () => {
    let r = Math.floor(1000 + Math.random() * 9000);
    return r + '';
  };

  const roomPassword = useMemo(() => {
    return getCode();
  }, []);

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
