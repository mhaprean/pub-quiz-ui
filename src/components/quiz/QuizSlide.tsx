import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IQuestion } from '../../redux/apiSlice';

interface IPropsQuizSlide {
  question: IQuestion;
  onPickAnswer: (answer: string) => void;
  pickable?: boolean;
  questionIndex?: number;
  answer: string;
}

const QuizSlide = ({ question, onPickAnswer, pickable = true, questionIndex = 0, answer }: IPropsQuizSlide) => {
  const options = ['A.', 'B.', 'C.', 'D.'];

  const handlePickAnswer = (answer: string) => {
    if (!pickable) {
      return false;
    }
    onPickAnswer(answer);
  };

  return (
    <div className="quiz-slide">
      <div className="question">
        <Typography variant="h5">
          {`${questionIndex + 1}. `}
          {decodeHtml(question.question)}
        </Typography>
      </div>

      <div className="answers">
        {question.answers.map((ans, idx) => (
          <div key={idx} className={classNames('answer', { isSelected: ans === answer })} onClick={() => handlePickAnswer(ans)}>
            {options[idx]} {decodeHtml(ans)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSlide;
