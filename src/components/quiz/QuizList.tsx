import { List } from '@mui/material';
import { IQuiz } from '../../redux/apiSlice';
import QuizItem from './QuizItem';

interface IPropsQuizList {
  quizes: IQuiz[];
  selectedQuiz: string;
  onSelectQuiz: (newQuiz: string) => void;
}

const QuizList = ({ quizes, selectedQuiz, onSelectQuiz }: IPropsQuizList) => {
  return (
    <List dense={true} sx={{ maxHeight: '480px', overflow: 'auto' }}>
      {quizes.map((quiz, idx) => (
        <QuizItem quiz={quiz} key={quiz._id} selected={quiz._id === selectedQuiz} onSelect={onSelectQuiz} />
      ))}
    </List>
  );
};

export default QuizList;
