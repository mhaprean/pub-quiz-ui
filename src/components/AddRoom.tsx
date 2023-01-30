import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useGetQuizesQuery } from '../redux/apiSlice';
import QuizList from './quiz/QuizList';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPropsAddRoom {
  password?: string;
}

const StyledDialog = styled(Dialog)`
  background: ${(props) => props.theme.palette.background.paper};

  .dialog-content {
    background: ${(props) => props.theme.palette.background.paper};
  }
  .dialog-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .rocket {
    margin-left: auto;
  }

  .host-quiz-button {
    margin-top: 30px;
  }
`;

const AddRoom = ({ password }: IPropsAddRoom) => {
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState('myquizes');

  const [roomName, setRoomName] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const { data: quizes, isFetching } = useGetQuizesQuery({});

  return (
    <div className="AddRoom">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ textTransform: 'inherit', fontSize: '18px', fontWeight: 'bold' }}
        size="large"
      >
        Create Room
      </Button>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialog-content">
          <div className="dialog-header">
            <Typography variant="h4">Host a quiz </Typography>
            <span className="rocket">🚀</span>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="subtitle2">Room name</Typography>
          <TextField variant="outlined" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <Typography variant="subtitle2">Room password:</Typography>
          <Typography variant="h4">{password}</Typography>

          <div className="quizes">
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Select the quiz that you want to host
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={changeTab} aria-label="basic tabs example">
                <Tab label="Created by me" value={'myquizes'} />
                <Tab label="Default quizes" value={'default'} />
              </Tabs>
            </Box>

            <QuizList quizes={quizes || []} selectedQuiz={selectedQuiz} onSelectQuiz={setSelectedQuiz} />
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="host-quiz-button"
              disabled={selectedQuiz === '' || roomName === ''}
            >
              HOST QUIZ
            </Button>
          </div>
        </DialogContent>
      </StyledDialog>
    </div>
  );
};

export default AddRoom;
