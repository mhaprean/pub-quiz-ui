import { styled } from '@mui/material/styles';
import { IQuestion, IUserAnswer } from '../../redux/apiSlice';
import QuizSlide from './QuizSlide';

interface IPropsEndedQuiz {
  questions: IQuestion[];
  userAnswers: IUserAnswer[];
}

const StyledEndedQuiz = styled('div')`
  .QuizSlide {
    margin-top: 30px;
  }
`;

const EndedQuiz = ({ questions, userAnswers }: IPropsEndedQuiz) => {
  const answers: { [key: string]: string } = userAnswers.reduce((obj, item) => ({ ...obj, [item.question_id]: item.answer }), {});

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
          ended={true}
          userPick={answers[question._id]}
        />
      ))}
    </StyledEndedQuiz>
  );
};

export default EndedQuiz;
