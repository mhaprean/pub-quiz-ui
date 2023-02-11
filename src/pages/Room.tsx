import { useEffect, useState } from 'react';
import NavigateBack from '../components/NavigateBack';

import { IQuestion, IResultsUser, ISingleGame } from '../redux/apiSlice';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import QuizSlide from '../components/quiz/QuizSlide';

import { Socket } from 'socket.io-client';
import QuizResults from '../components/quiz/QuizResults';
import HostRoomHeader from '../components/game/HostRoomHeader';
import { IUser } from '../redux/authSlice';

interface IRoomUser {
  id: string;
  name: string;
  points: number;
}

interface IRoomGame {
  expectedAnswer: string;
  started: boolean;
  currentQuestion: IQuestion | null;
  questionIdx: number;
  questionAnsweredBy: string[];
  onlineUsers: string[];
  users: {
    [key: string]: IRoomUser;
  };
}

interface IJoinRoomPayload {
  gameId: string;
  username: string;
  userId: string;
  isHost: boolean;
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

interface IGameEndedPayload {
  results: IResultsUser[];
}

interface IGameRestore {
  game: IRoomGame;
}

interface IPropsRoom {
  socket: Socket;
  isConnected: boolean;
  user: IUser;
  currentGame: ISingleGame;
  isHost?: boolean;
  onRefetch?: () => void;
}

const Room = ({ socket, user, currentGame, onRefetch = () => {}, isHost = false, isConnected }: IPropsRoom) => {
  const [showResults, setShowResults] = useState(false);

  const [users, setUsers] = useState<IResultsUser[]>([]);

  const [question, setQuestion] = useState<IQuestion | null>(null);

  const [gameStarted, setGameStarted] = useState(false);

  const [answer, setAnswer] = useState('');

  const [canSubmit, setCanSubmit] = useState(false);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const [participantsCount, setParticipantsCount] = useState(1);

  const isGameHost = isHost;

  const hasMoreQuestions = currentGame && isHost && currentQuestionIdx + 1 < currentGame.quiz.questions.length;

  useEffect(() => {
    console.log('socket from room: ', socket.id);

    const joinData: IJoinRoomPayload = {
      gameId: currentGame._id,
      userId: user._id,
      username: user.name,
      isHost: isHost,
    };
    socket.emit('join_room', joinData);

    console.log('join_room emited');

    socket.on('QUIZ_STARTED', (data: IStartGamePayload) => {
      console.log('!!!!! on QUIZ_STARTED ', data);

      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
      setCurrentQuestionIdx(data.questionIdx);
    });

    socket.on('NEXT_QUESTION', (data: INextQuestionPayload) => {
      console.log('!!!!! on NEXT_QUESTION ', data);

      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
      setAnswer('');
      setCurrentQuestionIdx(data.questionIdx);
    });

    socket.on('QUIZ_ENDED', (data: IGameEndedPayload) => {
      console.log('!!! on QUIZ_ENDED ', data);
      setUsers(data.results);
      setShowResults(true);
      onRefetch();
    });

    socket.on('USER_JOINED', ({ game }: { game: IRoomGame }) => {
      console.log('!!!!! on USER_JOINED ', game);
      setParticipantsCount(game.onlineUsers.length);
    });

    socket.on('WELCOME_BACK', ({ game }: IGameRestore) => {
      console.log('!!!!! on WELCOME_BACK ', game);
      const isAllowedSubmit = !game.questionAnsweredBy.includes(user._id);

      setGameStarted(game.started);
      setCanSubmit(isAllowedSubmit);
      setQuestion(game.currentQuestion);
      setAnswer('');
      setCurrentQuestionIdx(game.questionIdx);
      setParticipantsCount(game.onlineUsers.length);
    });

    socket.on('USER_LEFT', (data: { countUsers: number }) => {
      console.log('!!!!! on USER_LEFT ', data);
      setParticipantsCount(data.countUsers);
    });

    return () => {
      socket.off('QUIZ_STARTED');
      socket.off('NEXT_QUESTION');
      socket.off('QUIZ_ENDED');
      socket.off('USER_JOINED');

      socket.off('join_room');

      socket.emit('leave_room', joinData);
      console.log('leave room emited');
    };
  }, [isConnected]);

  /**
   *
   * function for game host
   */
  const startGame = () => {
    const question = currentGame?.quiz.questions[0];

    if (question && user._id) {
      const startGameData: IStartGamePayload = {
        gameId: currentGame._id,
        userId: user._id,
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

    if (newQuestion && user) {
      const nextQuestionPayload: INextQuestionPayload = {
        gameId: currentGame._id,
        userId: user._id,
        question: newQuestion,
        questionIdx: currentQuestionIdx + 1,
      };
      socket.emit('next_question', nextQuestionPayload);

      setQuestion(newQuestion);
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const onSubmitAnswer = () => {
    if (user) {
      const submitAnswerPayload: ISubmitAnswerPayload = {
        gameId: currentGame._id,
        userId: user?._id,
        questionIdx: currentQuestionIdx,
        answer,
      };

      socket.emit('SUBMIT_ANSWER', submitAnswerPayload);

      setCanSubmit(false);
    }
  };

  const getQuizResults = () => {
    const getResults: IGetGameResultsPayload = {
      gameId: currentGame._id,
    };
    socket.emit('GET_RESULTS', getResults);
    setShowResults(true);

    setTimeout(() => {
      onRefetch();
    }, 1000);
  };

  return (
    <div className="RoomPage">
      <div className="container">
        {/* This is for the room host.
          Alaways display the room password and the total number of users. 
        */}
        {isGameHost && currentGame?.password && <HostRoomHeader password={currentGame.password} total={participantsCount} />}

        {!isGameHost && <Typography variant="subtitle2">Online: {participantsCount} users</Typography>}

        <div>
          {isGameHost && !gameStarted && (
            <Button variant="contained" size="large" onClick={startGame}>
              START QUIZ
            </Button>
          )}
        </div>
        <div>
          {!isGameHost && !gameStarted && !currentGame.ended && (
            <Alert severity="success">
              <AlertTitle>Welcome!</AlertTitle>
              Please wait for the game to <strong>be started!</strong>
            </Alert>
          )}
        </div>
        <div>
          {gameStarted && question && !showResults && (
            <QuizSlide
              answer={answer}
              question={question}
              onPickAnswer={setAnswer}
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
