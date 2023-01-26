import classNames from "classnames";
import { useState } from "react";

const QuizSlide = () => {

  const q1 = {
    question: 'Which of the following sports is not part of the triathlon?',
    answers: ['Horse-Riding', 'Swimming', 'Cycling', 'Running'],
    correct_answer: 'Horse-Riding',
    _id: '63c410a987357b4055fcfcc1',
  };

  const options = ['A.', 'B.', 'C.', 'D.'];

  const [selected, setSelected] = useState('');

  
  return (
    <div className="quiz-slide">
      <div className="question">Which of the following sports is not part of the triathlon?</div>

      <div className="answers">
        {q1.answers.map((answer, idx) => (
          <div className={classNames('answer', { isSelected: selected === answer })} onClick={() => setSelected(answer)}>
            {options[idx]} {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSlide;
