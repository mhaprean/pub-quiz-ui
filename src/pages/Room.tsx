import { useParams } from "react-router-dom";

const Room = () => {

  // game id
  const {id} = useParams();

  return <div className="RoomPage">
    <div className="container">
      Room {id}
    </div>
  </div>;
};

export default Room;
