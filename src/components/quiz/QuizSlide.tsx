import { Button, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IQuestion } from '../../redux/apiSlice';

import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';

interface IPropsQuizSlide {
  question: IQuestion;
  onPickAnswer: (answer: string) => void;
  pickable?: boolean;
  questionIndex?: number;
  answer: string;
  ended?: boolean;
  userPick?: string;
}

const StyledQuizSlide = styled('div')`
  .question {
    text-align: center;
    padding: 20px 10px;
  }

  .answers {
    display: flex;
    flex-wrap: wrap;
  }

  .answer {
    border-radius: 10px;
    border: 2px solid var(--input-border-color);
    margin: 5px;
    padding: 10px;
    cursor: pointer;
    background: var(--background-paper);
    flex-grow: 1;
    flex-basis: 100%;
    display: flex;

    &.pickable {
      &:hover {
        border-color: var(--primary-color);
      }
    }

    &.isSelected {
      background: var(--border-color);
      border-color: var(--primary-color);
    }

    &.isCorrect {
      background: ${(props) => alpha(props.theme.palette.success.main, 0.3)};
    }

    &.isWrong {
      background: ${(props) => alpha(props.theme.palette.error.main, 0.6)};
    }

    .result {
      margin-left: auto;

      .correct {
        color: ${(props) => props.theme.palette.success.main};
      }
      .wrong {
        color: ${(props) => props.theme.palette.error.contrastText};
      }
    }

    @media screen and (min-width: 800px) {
      flex-basis: 45%;
    }
  }
`;

const QuizSlide = ({ question, onPickAnswer, pickable = true, questionIndex = 0, answer, ended = false, userPick }: IPropsQuizSlide) => {
  const options = ['A.', 'B.', 'C.', 'D.'];

  const handlePickAnswer = (answer: string) => {
    if (!pickable) {
      return false;
    }
    onPickAnswer(answer);
  };

  return (
    <StyledQuizSlide className="QuizSlide">
      <div className="question">
        <Typography variant="h4">
          {`${questionIndex + 1}. `}
          {decodeHtml(question.question)}
        </Typography>
      </div>

      <div className="answers">
        {question.answers.map((ans, idx) => (
          <div
            key={idx}
            className={classNames('answer', {
              isSelected: ans === answer && !ended,
              isCorrect: ended && ans === answer,
              isWrong: userPick === ans && userPick !== answer,
              pickable: pickable,
            })}
            onClick={() => handlePickAnswer(ans)}
          >
            <Typography variant="h5">
              {options[idx]} {decodeHtml(ans)}
            </Typography>
            {ended && (
              <div className="result">
                {userPick === ans && ans === answer && <CheckCircleIcon className="correct" fontSize="small" />}
                {userPick === ans && userPick !== answer && <CancelIcon className="wrong" fontSize="small" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </StyledQuizSlide>
  );
};

export default QuizSlide;
