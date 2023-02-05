import { Button } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import { IQuestion } from '../../redux/apiSlice';

interface IPropsQuizSlide {
  question: IQuestion;
  onPickAnswer: (answer: string) => void;
  pickable?: boolean;
  questionIndex?: number;
}

const QuizSlide = ({ question, onPickAnswer, pickable = true, questionIndex = 0 }: IPropsQuizSlide) => {
  const options = ['A.', 'B.', 'C.', 'D.'];
  const [selected, setSelected] = useState('');

  const handlePickAnswer = (answer: string) => {
    if (!pickable) {
      return false;
    }
    setSelected(answer);
    onPickAnswer(answer);
  };

  const decodeHtml = (html: string) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="quiz-slide">
      <div className="question">
        {`${questionIndex + 1}. `}
        {decodeHtml(question.question)}
      </div>

      <div className="answers">
        {question.answers.map((answer, idx) => (
          <div key={idx} className={classNames('answer', { isSelected: selected === answer })} onClick={() => handlePickAnswer(answer)}>
            {options[idx]} {decodeHtml(answer)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSlide;
