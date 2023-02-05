import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigateBack from '../components/NavigateBack';

import { useAppSelector } from '../redux/hooks';
import { IQuestion, IResultsUser, useGetCurrentGameQuery } from '../redux/apiSlice';
import { Box, Button, TextField, Typography } from '@mui/material';
import QuizSlide from '../components/quiz/QuizSlide';

import { Socket } from 'socket.io-client';
import QuizResults from '../components/quiz/QuizResults';
import JoinRoom from '../components/game/JoinRoom';

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

interface IGameEndedPayload {
  results: IResultsUser[];
}

const Room = ({ socket }: IPropsRoom) => {
  // game id
  const { id } = useParams();

  const [gameStarted, setGameStarted] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [users, setUsers] = useState<IResultsUser[]>([]);

  const [question, setQuestion] = useState<IQuestion | null>(null);

  const [errorPass, setErrorPass] = useState(false);

  const [joined, setJoined] = useState(false);

  const [answer, setAnswer] = useState('');

  const [canSubmit, setCanSubmit] = useState(false);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const authState = useAppSelector((state) => state.auth);

  const { data: currentGame, isLoading, refetch } = useGetCurrentGameQuery({ gameId: id || '' }, { skip: !id });

  const isGameHost = currentGame && currentGame.host._id === authState.user?._id;

  const hasMoreQuestions = currentGame && currentQuestionIdx + 1 < currentGame.quiz.questions.length;

  useEffect(() => {
    const isHost = currentGame && currentGame.host._id === authState.user?._id;

    if (authState.user && id && isHost) {
      const joinData: IJoinRoomPayload = {
        gameId: id,
        userId: authState.user._id,
        username: authState.user.name,
      };
      socket.emit('join_room', joinData);

      setJoined(true);

      console.log('join_room emited by host');
    }
  }, [id, authState.user, currentGame]);

  useEffect(() => {
    socket.on('QUIZ_STARTED', (data: IStartGamePayload) => {
      console.log('!!!!! on QUIZ_STARTED ', data);

      if (joined) {
        setGameStarted(true);
        setCanSubmit(true);
        setQuestion(data.question);
        setCurrentQuestionIdx(data.questionIdx);
      }
    });

    socket.on('NEXT_QUESTION', (data: INextQuestionPayload) => {
      console.log('!!!!! on NEXT_QUESTION ', data);

      if (joined) {
        setGameStarted(true);
        setCanSubmit(true);
        setQuestion(data.question);
        setAnswer('');
        setCurrentQuestionIdx(data.questionIdx);
      }
    });

    socket.on('QUIZ_ENDED', (data: IGameEndedPayload) => {
      console.log('!!! on QUIZ_ENDED ', data);
      setUsers(data.results);
      setShowResults(true);
    });

    return () => {
      socket.off('QUIZ_STARTED');
      socket.off('NEXT_QUESTION');
      socket.off('QUIZ_ENDED');
    };
  }, [joined]);

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

  const handleJoinRoom = (pass: string) => {
    if (authState.user && id) {
      if (pass === currentGame?.password) {
        const joinData: IJoinRoomPayload = {
          gameId: id,
          userId: authState.user._id,
          username: authState.user.name,
        };
        socket.emit('join_room', joinData);

        console.log('join_room emited by user');
        setJoined(true);
        setErrorPass(false);
      } else {
        setErrorPass(true);
      }
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
      setShowResults(true);

      setTimeout(() => {
        refetch();
      }, 1000);
    }
  };

  return (
    <div className="RoomPage">
      <div className="container">
        <NavigateBack />

        <div>
          {isGameHost && (
            <div>
              <Typography variant="subtitle2">Room password:</Typography>
              <Typography variant="h4">{currentGame?.password}</Typography>
            </div>
          )}
        </div>

        {/* This is for the regular user. When user wants to join, the room password is required.
          Display an error message if the password is wrong, and success message when is correct. 
        */}
        {currentGame && !gameStarted && !isGameHost && <JoinRoom onJoin={handleJoinRoom} error={errorPass} joined={joined} />}

        <div>
          {isGameHost && !gameStarted && (
            <Button variant="contained" size="large" onClick={startGame}>
              START QUIZ
            </Button>
          )}
        </div>
        <div>
          {gameStarted && question && !showResults && (
            <QuizSlide
              question={question}
              onPickAnswer={handleChooseAnswer}
              pickable={!isGameHost && canSubmit}
              questionIndex={currentQuestionIdx}
            />
          )}
        </div>

        <div>{showResults && <QuizResults users={users.length > 0 ? users : currentGame?.results || []} />}</div>

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
