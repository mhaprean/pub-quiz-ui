import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";

interface IPropsHostRoomHeader {
  password: string;
  total: number;
  tournamentName: string;
  gameName: string;
}

const StyledHostRoomHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .game-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HostRoomHeader = ({
  password,
  total,
  gameName,
  tournamentName,
}: IPropsHostRoomHeader) => {
  return (
    <StyledHostRoomHeader className="HostRoomHeader">
      <div>
        <Typography variant="subtitle2">Room password:</Typography>
        <Typography variant="h4">{password}</Typography>
      </div>
      <div className="game-details">
        <Typography variant="h5">{tournamentName}</Typography>
        <Typography variant="subtitle2">{gameName}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">
          {total} {total !== 1 ? " Participants" : " Participant"}
        </Typography>
      </div>
    </StyledHostRoomHeader>
  );
};

export default HostRoomHeader;
