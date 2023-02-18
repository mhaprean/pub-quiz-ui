import { Alert, AlertTitle, Avatar, Button, Collapse, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { IQuiz, useDeleteQuizMutation } from '../../redux/apiSlice';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

import { green, orange, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

interface IPropsQuizItem {
  quiz: IQuiz;
  selected?: boolean;
  onSelect?: (quizId: string) => void;
}

const StyledQuizItem = styled('div')`
  border: 2px solid ${(props) => props.theme.palette.background.paper};
  border-radius: 10px;
  transition: all ease-in-out 0.2s;
  &.selected {
    border: 2px solid ${(props) => props.theme.palette.primary.main};
    background: ${(props) => props.theme.palette.background.paper};
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.palette.text.secondary};
    cursor: pointer;
  }

  .confirmation {
    padding: 10px;
    .MuiButton-root {
      margin: 10px;
    }
  }
`;

const QuizItem = ({ quiz, selected = false, onSelect = () => {} }: IPropsQuizItem) => {
  const quizColor = quiz.difficulty === 'easy' ? green[200] : quiz.difficulty === 'hard' ? red[200] : orange[200];

  const [open, setOpen] = useState(false);
  const [deleteQuiz, response] = useDeleteQuizMutation();

  const authState = useAppSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      const result = await deleteQuiz({ quizId: quiz._id }).unwrap();
    } catch (error) {
      console.log('error');
    }
  };

  const handleSelect = () => {
    onSelect(quiz._id);
  };
  return (
    <StyledQuizItem className={classNames('QuizItem', { selected })} onClick={handleSelect}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: quizColor }}>
            <OfflineBoltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={quiz.title} secondary={'difficulty: ' + quiz.difficulty + ' / ' + quiz.total + ' questions'} />

        {authState.user?._id === quiz.creator && (
          <IconButton color="error" onClick={() => setOpen(!open)}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </ListItem>

      {authState.user?._id === quiz.creator && (
        <div className="confirmation">
          <Collapse in={open}>
            <Alert
              severity="error"
              sx={{ marginTop: '20px' }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <Typography variant="body2">Are you sure you want to delete "{quiz.title}" ?</Typography>

              <Button variant="contained" color="error" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => setOpen(false)}>
                No
              </Button>
            </Alert>
          </Collapse>
        </div>
      )}
    </StyledQuizItem>
  );
};

export default QuizItem;
