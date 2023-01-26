import { styled } from "@mui/material/styles";



const StyledRooms = styled('div')`
  margin-bottom: 30px;
`;

const Rooms = () => {
  return (
    <StyledRooms className="Rooms">
      <h3>Rooms</h3>

      <div className="room">
        <div className="room-name">
          <h2>Room 1</h2>
        </div>

        <button className="button-join">Join room</button>
      </div>

      <div className="room">
        <div className="room-name">
          <h2>Room 2</h2>
        </div>

        <button className="button-join">Join room</button>
      </div>

      <div className="room">
        <div className="room-name">
          <h2>Room 3</h2>
        </div>

        <button className="button-join">Join room</button>
      </div>
    </StyledRooms>
  );
};

export default Rooms;
