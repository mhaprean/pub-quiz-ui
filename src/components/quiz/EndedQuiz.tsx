import { styled } from '@mui/material/styles';
import { IQuestion } from '../../redux/apiSlice';
import QuizSlide from './QuizSlide';

interface IPropsEndedQuiz {
  questions: IQuestion[];
}

const StyledEndedQuiz = styled('div')`
  .QuizSlide {
    margin-top: 30px;
  }

`;

const EndedQuiz = ({ questions }: IPropsEndedQuiz) => {
  return (
    <StyledEndedQuiz className="EndedQuiz">
      {questions.map((question, idx) => (
        <QuizSlide
          key={idx}
          question={question}
          onPickAnswer={() => {}}
          pickable={false}
          answer={question.correct_answer}
          questionIndex={idx}
        />
      ))}
    </StyledEndedQuiz>
  );
};

export default EndedQuiz;
