import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
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
import { useCreateGameMutation, useGetMyQuizesQuery, useGetMyTournamentsAsHostQuery, useGetQuizesQuery } from '../../redux/apiSlice';
import QuizList from '../quiz/QuizList';
import { useNavigate } from 'react-router-dom';

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
  onRoomCreated?: () => void;
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

const AddRoom = ({ password = '', onRoomCreated = () => {} }: IPropsAddRoom) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('myquizes');
  const [tournament, setTournament] = useState('');
  const [roomName, setRoomName] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [createGame, response] = useCreateGameMutation();
  
  const { data: quizes, isFetching } = useGetQuizesQuery({}, { skip: tab === 'myquizes' });
  const { data: myQuizes, isFetching: isMyQuizesFetching } = useGetMyQuizesQuery({});
  const { data: myTournamentsAsHost, isLoading } = useGetMyTournamentsAsHostQuery({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleCreateGame = async () => {
    try {
      const res = await createGame({ quiz: selectedQuiz, title: roomName, password, tournament }).unwrap();

      onRoomCreated();
      navigate(`/rooms/${res._id}`);
    } catch (error) {}
  };


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

          <div>
            <Typography variant="subtitle2">Room name</Typography>
            <TextField variant="outlined" value={roomName} onChange={(e) => setRoomName(e.target.value)} sx={{ width: '100%' }} />
            <Typography variant="subtitle2">Tournament</Typography>
            <Select value={tournament} onChange={(e) => setTournament(e.target.value)} sx={{ width: '100%' }}>
              {myTournamentsAsHost &&
                myTournamentsAsHost.map((tour, idx) => (
                  <MenuItem key={tour._id} value={tour._id}>
                    {tour.title}
                  </MenuItem>
                ))}
            </Select>
          </div>

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
            {tab === 'myquizes' && <QuizList quizes={myQuizes || []} selectedQuiz={selectedQuiz} onSelectQuiz={setSelectedQuiz} />}
            {tab === 'default' && <QuizList quizes={quizes || []} selectedQuiz={selectedQuiz} onSelectQuiz={setSelectedQuiz} />}
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="host-quiz-button"
              disabled={selectedQuiz === '' || roomName === ''}
              onClick={handleCreateGame}
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
