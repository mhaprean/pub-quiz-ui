import { Button, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { decodeHtml } from '../../helpers/decodeHTML';
import { IQuestion } from '../../redux/apiSlice';

import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';

import AudioPlayerOrig from 'react-audio-player';

const ENV = import.meta.env.VITE_ENV || 'dev';
const ReactAudioPlayer = ENV === 'production' ? (AudioPlayerOrig as any).default : AudioPlayerOrig;

interface IPropsQuizSlide {
  question: IQuestion;
  onPickAnswer: (answer: string) => void;
  pickable?: boolean;
  questionIndex?: number;
  answer: string;
  ended?: boolean;
  userPick?: string;
  isHost?: boolean;
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
      border-color: ${(props) => props.theme.palette.error.main};
    }

    &.correctAnswer {
      border-color: ${(props) => props.theme.palette.success.main};
    }

    .result {
      margin-left: auto;
      display: flex;
      align-items: center;

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

  .player {
    width: 100%;
    padding: 10px 50px;
  }

  .image-box {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .image {
      display: block;
      max-width: 100%;
      max-height: 400px;
      margin: auto;
    }
  }
`;

const QuizSlide = ({
  question,
  onPickAnswer,
  pickable = true,
  questionIndex = 0,
  answer,
  ended = false,
  isHost = false,
  userPick,
}: IPropsQuizSlide) => {
  const options = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.'];

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

      {question.image && (
        <div className="image-box">
          <img className="image" src={question.image} alt="" />
        </div>
      )}

      {question.song && (isHost || ended) && <ReactAudioPlayer className="player" src={question.song} controls />}

      <div className="answers">
        {question.answers.map((ans, idx) => (
          <div
            key={idx}
            className={classNames('answer', {
              isSelected: ans === answer && !ended,
              isCorrect: ended && ans === answer,
              isWrong: userPick === ans && userPick !== answer,
              pickable: pickable,
              correctAnswer: userPick === ans && ans === answer,
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
