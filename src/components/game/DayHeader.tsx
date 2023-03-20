import { Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { getFormatedDate } from '../../helpers/formatDate';

const StyledDayHeader = styled(Paper)`
  padding: 10px;
  margin-top: 20px;

  background: ${props => alpha(props.theme.palette.primary.main, 0.4)};
`;

const DayHeader = ({ date }: { date: string }) => {
  return (
    <StyledDayHeader className="DayHeader" variant="outlined">
      {getFormatedDate(date)}
    </StyledDayHeader>
  );
};

export default DayHeader;
