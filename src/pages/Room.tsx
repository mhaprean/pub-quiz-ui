import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigateBack from '../components/NavigateBack';

import { useAppSelector } from '../redux/hooks';
import { IQuestion, useGetCurrentGameQuery } from '../redux/apiSlice';
import { Box, Button, Typography } from '@mui/material';
import QuizSlide from '../components/quiz/QuizSlide';

import { Socket } from 'socket.io-client';


interface IJoinRoomPayload {
  gameId: string;
  username: string;
  userId: string;
}

interface IStartGamePayload {
  gameId: string;
  userId: string;
  question: IQuestion;
  questionIdx: number;
}

interface INextQuestionPayload extends IStartGamePayload {}

interface ISubmitAnswerPayload {
  gameId: string;
  userId: string;
  questionIdx: number;
  answer: string;
}

interface IGetGameResultsPayload {
  gameId: string;
}

interface IPropsRoom {
  socket: Socket;
}

const Room = ({ socket }: IPropsRoom) => {
  // game id
  const { id } = useParams();

  const [gameStarted, setGameStarted] = useState(false);

  const [question, setQuestion] = useState<IQuestion | null>(null);

  const [answer, setAnswer] = useState('');

  const [canSubmit, setCanSubmit] = useState(false);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const authState = useAppSelector((state) => state.auth);

  const { data: currentGame, isLoading } = useGetCurrentGameQuery({ gameId: id || '' }, { skip: !id });

  useEffect(() => {
    if (authState.user && id) {
      const joinData: IJoinRoomPayload = {
        gameId: id,
        userId: authState.user._id,
        username: authState.user.name
      };
      socket.emit('join_room', joinData);
    }
  }, [id, authState.user]);

  useEffect(() => {
    socket.on('QUIZ_STARTED', (data) => {
      console.log('!!!!! on QUIZ_STARTED ', data);
      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
    });

    socket.on('NEXT_QUESTION', (data) => {
      console.log('!!!!! on NEXT_QUESTION ', data);
      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
      setAnswer('');
    });

    return () => {
      socket.off('QUIZ_STARTED');
      socket.off('NEXT_QUESTION');
    };
  }, []);

  /**
   *
   * function for game host
   */
  const startGame = () => {
    const question = currentGame?.quiz.questions[0];

    if (question && id && authState.user?._id) {
      const startGameData: IStartGamePayload = {
        gameId: id,
        userId: authState.user._id,
        question: question,
        questionIdx: 0,
      };
      socket.emit('game_started', startGameData);

      setQuestion(question);
      setGameStarted(true);
    }
  };

  /**
   *
   * function for game host
   */
  const onNextQuestion = () => {

    const newQuestion = currentGame?.quiz.questions[currentQuestionIdx + 1];

    if (newQuestion && id && authState.user) {
      const nextQuestionPayload: INextQuestionPayload = {
        gameId: id,
        userId: authState.user._id,
        question: newQuestion,
        questionIdx: currentQuestionIdx + 1,
      };
      socket.emit('next_question', nextQuestionPayload);

      setQuestion(newQuestion);
      setGameStarted(true);

      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handleChooseAnswer = (ans: string) => {
    setAnswer(ans);
  };

  const onSubmitAnswer = () => {

    if (id && authState.user) {
      const submitAnswerPayload: ISubmitAnswerPayload = {
        gameId: id,
        userId: authState.user?._id,
        questionIdx: currentQuestionIdx,
        answer,
      };

      socket.emit('SUBMIT_ANSWER', submitAnswerPayload);

      setCanSubmit(false);
    }
  };

  const getQuizResults = () => {
    if (id) {
      const getResults: IGetGameResultsPayload = {
        gameId: id,
      };
      socket.emit('GET_RESULTS', getResults);
    }
  };

  const isGameHost = currentGame && currentGame.host._id === authState.user?._id;

  const hasMoreQuestions = currentGame && currentQuestionIdx + 1 < currentGame.quiz.questions.length;

  return (
    <div className="RoomPage">
      <div className="container">
        <NavigateBack />

        {/* <div>Room {id}</div>
        
        <div>{joined ? 'joined' : 'not joined'}</div> */}
        <div>
          {isGameHost && (
            <div>
              <Typography variant="subtitle2">Room password:</Typography>
              <Typography variant="h4">{currentGame?.password}</Typography>
            </div>
          )}
        </div>
        <div>
          {isGameHost && !gameStarted && (
            <Button variant="contained" size="large" onClick={startGame}>
              START QUIZ
            </Button>
          )}
        </div>
        <div>{gameStarted && question && <QuizSlide question={question} onPickAnswer={handleChooseAnswer} pickable={!isGameHost && canSubmit} />}</div>
        <Box className="submit-button" sx={{ marginTop: '30px', display: 'flex' }}>
          {isGameHost && gameStarted && hasMoreQuestions && (
            <Button variant="contained" size="large" onClick={onNextQuestion} sx={{ marginLeft: 'auto' }}>
              NEXT QUESTION
            </Button>
          )}

          {isGameHost && gameStarted && !hasMoreQuestions && (
            <Button variant="contained" size="large" onClick={getQuizResults} sx={{ marginLeft: 'auto' }}>
              GET QUIZ RESULTS
            </Button>
          )}

          {!isGameHost && gameStarted && (
            <Button variant="contained" size="large" onClick={onSubmitAnswer} sx={{ marginLeft: 'auto' }} disabled={!canSubmit || !answer}>
              SUBMIT ANSWER
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Room;
