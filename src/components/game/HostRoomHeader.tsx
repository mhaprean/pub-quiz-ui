import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';

interface IPropsHostRoomHeader {
  password: string;
  total: number;
}

const StyledHostRoomHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HostRoomHeader = ({ password, total }: IPropsHostRoomHeader) => {
  return (
    <StyledHostRoomHeader className="HostRoomHeader">
      <div>
        <Typography variant="subtitle2">Room password:</Typography>
        <Typography variant="h4">{password}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">
          Online: {total} {total > 1 ? ' Users' : ' User'}
        </Typography>
      </div>
    </StyledHostRoomHeader>
  );
};

export default HostRoomHeader;
