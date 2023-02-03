import AddRoom from '../components/AddRoom';
import LoginRegister from '../components/LoginRegister';
import Rooms from '../components/Rooms';
import { useAppSelector } from '../redux/hooks';

const Homepage = () => {
  const authState = useAppSelector((root) => root.auth);

  const getCode = () => {
    let r = Math.floor(100000 + Math.random() * 900000);
    return r + '';
  };

  const roomPassword = getCode();

  return (
    <div>
      <div className="container">
        {authState.isAuth && (
          <>
            <Rooms />
          </>
        )}

        {authState.isAuth && authState.user?.role === 'host' && <AddRoom password={roomPassword} />}

        {!authState.isAuth && <LoginRegister />}
      </div>
    </div>
  );
};

export default Homepage;
