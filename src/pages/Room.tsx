import { useEffect, useState } from 'react';
import { IQuestion, IQuiz, IResultsUser, ISingleGame, IUserAnswer } from '../redux/apiSlice';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import QuizSlide from '../components/quiz/QuizSlide';
import { Socket } from 'socket.io-client';
import QuizResults from '../components/quiz/QuizResults';
import HostRoomHeader from '../components/game/HostRoomHeader';
import { IUser } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import EndedQuiz from '../components/quiz/EndedQuiz';
import NavigateBack from '../components/NavigateBack';
import RoomHeader from '../components/game/RoomHeader';

interface IRoomUser {
  id: string;
  name: string;
  points: number;
  answers: {
    [key: string]: IUserAnswer;
  };
}

interface IRoomGame {
  expectedAnswer: string;
  started: boolean;
  currentQuestionId: string;
  currentQuestion: IQuestion | null;
  questionIdx: number;
  questionAnsweredBy: string[];
  users: {
    [key: string]: IRoomUser;
  };
}

interface IJoinRoomPayload {
  gameId: string;
  username: string;
  userId: string;
  isHost: boolean;
  quiz: IQuiz | null;
}

interface IStartGame {
  question: IQuestion;
  questionIdx: number;
}

interface INextQuestion extends IStartGame {}

interface IOnNextQuestion {
  gameId: string;
  userId: string;
}

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
  userAnswers: IUserAnswer[];
  onRefetch?: () => void;
}

const Room = ({ socket, user, currentGame, onRefetch = () => {}, isHost = false, isConnected, userAnswers }: IPropsRoom) => {
  const [showResults, setShowResults] = useState(false);

  const [totalParticipants, setTotalParticipants] = useState(0);

  const [users, setUsers] = useState<IResultsUser[]>([]);

  const [question, setQuestion] = useState<IQuestion | null>(null);

  const [gameStarted, setGameStarted] = useState(false);

  const [answer, setAnswer] = useState('');

  const [canSubmit, setCanSubmit] = useState(false);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const hasMoreQuestions = currentGame && isHost && currentQuestionIdx + 1 < currentGame.quiz.questions.length;

  useEffect(() => {
    const joinData: IJoinRoomPayload = {
      gameId: currentGame._id,
      userId: user._id,
      username: user.name,
      isHost: isHost,
      quiz: isHost ? currentGame.quiz : null,
    };
    socket.emit('join_room', joinData);

    socket.on('QUIZ_STARTED', (data: IStartGame) => {
      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
      setCurrentQuestionIdx(data.questionIdx);
    });

    socket.on('NEXT_QUESTION', (data: INextQuestion) => {
      setGameStarted(true);
      setCanSubmit(true);
      setQuestion(data.question);
      setAnswer('');
      setCurrentQuestionIdx(data.questionIdx);
    });

    socket.on('QUIZ_ENDED', (data: IGameEndedPayload) => {
      if (!currentGame.ended) {
        setUsers(data.results);
        setShowResults(true);
        onRefetch();
      }
    });

    socket.on('USER_JOINED', ({ totalUsers }: { totalUsers: number }) => {
      setTotalParticipants(totalUsers);
    });

    socket.on('WELCOME_BACK', ({ game }: IGameRestore) => {
      const isAllowedSubmit = !game.questionAnsweredBy.includes(user._id);

      if (game.currentQuestion && game.users[user._id] && game.users[user._id].answers[game.currentQuestion._id]) {
        const userResponse = game.users[user._id].answers[game.currentQuestion._id].answer;
        setAnswer(userResponse);
      }

      const totalUsers = Object.keys(game.users);
      setTotalParticipants(totalUsers.length);

      setGameStarted(game.started);
      setCanSubmit(isAllowedSubmit);
      setQuestion(game.currentQuestion);
      setCurrentQuestionIdx(game.questionIdx);
    });

    socket.on('ANSWER_SUBMITED', (data) => {
      setCanSubmit(false);
    });

    return () => {
      socket.off('QUIZ_STARTED');
      socket.off('NEXT_QUESTION');
      socket.off('QUIZ_ENDED');
      socket.off('ANSWER_SUBMITED');

      socket.off('join_room');
    };
  }, [isConnected]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  /**
   *
   * function for game host
   */
  const startGame = () => {
    const startGameData: IOnNextQuestion = {
      gameId: currentGame._id,
      userId: user._id,
    };
    socket.emit('game_started', startGameData);
  };

  /**
   *
   * function for game host
   */
  const onNextQuestion = () => {
    const nextQuestionPayload: IOnNextQuestion = {
      gameId: currentGame._id,
      userId: user._id,
    };
    socket.emit('next_question', nextQuestionPayload);
  };

  const onSubmitAnswer = () => {
    const submitAnswerPayload: ISubmitAnswerPayload = {
      gameId: currentGame._id,
      userId: user._id,
      questionIdx: currentQuestionIdx,
      answer,
    };
    socket.emit('SUBMIT_ANSWER', submitAnswerPayload);
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
        {isHost && currentGame?.password && !currentGame?.ended && (
          <HostRoomHeader
            password={currentGame.password}
            total={totalParticipants}
            tournamentTittle={currentGame.tournament?.title || ''}
            gameTitle={currentGame.title}
          />
        )}

        {isHost && !gameStarted && !currentGame?.ended && (
          <div>
            <Button variant="contained" size="large" onClick={startGame}>
              START QUIZ
            </Button>
          </div>
        )}

        {!isHost && !gameStarted && !currentGame.ended && (
          <div>
            <Alert severity="success">
              <AlertTitle>Welcome!</AlertTitle>
              Please wait for the game to <strong>be started!</strong>
            </Alert>
          </div>
        )}

        {gameStarted && question && !showResults && (
          <div>
            <QuizSlide
              answer={answer}
              question={question}
              onPickAnswer={setAnswer}
              pickable={!isHost && canSubmit}
              isHost={isHost}
              questionIndex={currentQuestionIdx}
            />
          </div>
        )}

        {(showResults || currentGame.ended) && (
          <>
            <NavigateBack />
            <RoomHeader game={currentGame} />
            <QuizResults users={users.length > 0 ? users : currentGame?.results || []} total={currentGame.quiz.total} />
          </>
        )}

        {currentGame?.ended && currentGame?.quiz.questions && currentGame?.quiz.questions.length > 0 && (
          <EndedQuiz questions={currentGame.quiz.questions} userAnswers={userAnswers} />
        )}

        <Box className="submit-button" sx={{ marginTop: '30px', marginBottom: '50px', display: 'flex' }}>
          {isHost && gameStarted && hasMoreQuestions && (
            <Button variant="contained" size="large" onClick={onNextQuestion} sx={{ marginLeft: 'auto' }}>
              NEXT QUESTION
            </Button>
          )}

          {isHost && gameStarted && !hasMoreQuestions && !currentGame?.ended && (
            <Button variant="contained" size="large" onClick={getQuizResults} sx={{ marginLeft: 'auto' }}>
              GET QUIZ RESULTS
            </Button>
          )}

          {!isHost && gameStarted && !currentGame?.ended && (
            <Button variant="contained" size="large" onClick={onSubmitAnswer} sx={{ marginLeft: 'auto' }} disabled={!canSubmit || !answer}>
              {!canSubmit ? 'SUBMITED' : 'SUBMIT ANSWER'}
            </Button>
          )}

          {currentGame.ended && <NavigateBack />}
        </Box>
      </div>
    </div>
  );
};

export default Room;
