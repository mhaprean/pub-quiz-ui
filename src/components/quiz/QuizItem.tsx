import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { IQuiz } from '../../redux/apiSlice';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { green, orange, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';

interface IPropsQuizItem {
  quiz: IQuiz;
  selected?: boolean;
  onSelect?: (quizId: string) => void;
}

const StyledQuizItem = styled(ListItem)`
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
`;

const QuizItem = ({ quiz, selected = false, onSelect = () => {} }: IPropsQuizItem) => {
  const quizColor = quiz.difficulty === 'easy' ? green[200] : quiz.difficulty === 'hard' ? red[200] : orange[200];

  const handleSelect = () => {
    onSelect(quiz._id);
  };
  return (
    <StyledQuizItem className={classNames('QuizItem', { selected })} onClick={handleSelect}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: quizColor }}>
          <OfflineBoltIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={quiz.title} secondary={'difficulty: ' + quiz.difficulty} />
    </StyledQuizItem>
  );
};

export default QuizItem;
