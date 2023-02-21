import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';
import { RootState } from './store';

export interface ITournament {
  _id: string;
  title: string;
  host: string;
  participants: string[];
  games: string[];

  createdAt: string;
  updatedAt: string;
}

export interface IMyTournament extends Omit<ITournament, 'host'> {
  host: IUser;
}

export interface ISingleTournament {
  _id: string;
  title: string;
  games: IGame[];
  host: IUser;
  participants: IUser[];

  createdAt: string;
  updatedAt: string;
}

interface ILoginResponse {
  user: IUser;
  access_token: string;
}

interface IRegisterResponse {
  user: IUser;
  access_token: string;
}

export interface IQuestion {
  question: string;
  answers: string[];
  correct_answer: string;
  _id: string;
}

export interface IQuiz {
  _id: string;
  title: string;
  difficulty: string;
  type: string;
  creator: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  total: number;

  questions: IQuestion[];
}

interface ICreateGameResponse extends IGame {
  password: string;
}

export interface IResultsUser {
  id?: string;
  user_id: string;
  username: string;
  points: number;
  image?: string;
}

export interface IGame {
  _id: string;
  title: string;
  active: true;
  ended: boolean;
  participants: string[];
  // quiz: string;
  host: string;

  results: IResultsUser[];
  quiz: {
    _id: string;
    total: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IMyGame extends Omit<IGame, 'host'> {
  host: IUser;
  tournament: ITournament;
}

export interface ISingleGame extends Omit<IGame, 'host'> {
  password: string;
  quiz: IQuiz;
  host: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface IJoinGameResponse {}

export interface IQuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correct_answer: string;
}

interface ICreateQuizResponse {}

interface IConfirmAccountResponse {}

export interface IUserAnswer {
  question_id: string;
  answer: string;
}

interface IGameResult {
  game: string;
  user: string;
  results: IUserAnswer[];
}

interface IDeleteQuizResponse {}

interface ICreateTournamentResponse {}

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const backendApi = createApi({
  reducerPath: 'backendapi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Quiz', 'Game', 'Result', 'Tournament'],

  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, {}>({
      query: () => 'auth/profile',
    }),
    getQuizes: builder.query<IQuiz[], {}>({
      query: () => 'quiz/all',
      providesTags: ['Quiz'],
    }),

    getMyQuizes: builder.query<IQuiz[], {}>({
      query: () => 'quiz/myquizes',
      providesTags: ['Quiz'],
    }),

    getGames: builder.query<IGame[], {}>({
      query: () => 'games',
      providesTags: ['Game'],
    }),

    getMyGames: builder.query<IMyGame[], {}>({
      query: () => 'games/mygames',
      providesTags: ['Game'],
    }),

    getMyGamesAsHost: builder.query<IMyGame[], {}>({
      query: () => 'games/hostedbyme',
      providesTags: ['Game'],
    }),

    getCurrentGame: builder.query<ISingleGame, { gameId: string }>({
      query: ({ gameId }) => `games/${gameId}`,
      providesTags: ['Game'],
    }),

    deleteGame: builder.mutation<{}, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `games/${gameId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Game'],
    }),

    getCurrentGameResults: builder.query<IGameResult, { gameId: string }>({
      query: ({ gameId }) => `results/game/${gameId}`,
      providesTags: ['Result'],
    }),

    loginUser: builder.mutation<ILoginResponse, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation<IRegisterResponse, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    confirmAccount: builder.mutation<IConfirmAccountResponse, { userId: string; token: string }>({
      query: (data) => ({
        url: 'auth/confirm',
        method: 'POST',
        body: data,
      }),
    }),

    createQuiz: builder.mutation<ICreateQuizResponse, { title: string; category: string; difficulty: string; questions: IQuizQuestion[] }>({
      query: (data) => ({
        url: 'quiz/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),

    deleteQuiz: builder.mutation<IDeleteQuizResponse, { quizId: string }>({
      query: ({ quizId }) => ({
        url: `quiz/${quizId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),

    createGame: builder.mutation<ICreateGameResponse, { quiz: string; title: string; password: string; tournament: string }>({
      query: (data) => ({
        url: 'games/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz', 'Game', 'Tournament'],
    }),

    createTournament: builder.mutation<ICreateTournamentResponse, { title: string }>({
      query: (data) => ({
        url: 'tournaments/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tournament'],
    }),

    getMyTournaments: builder.query<IMyTournament[], {}>({
      query: () => 'tournaments/mytournaments',
      providesTags: ['Tournament'],
    }),

    getMyTournamentsAsHost: builder.query<IMyTournament[], {}>({
      query: () => 'tournaments/hostedbyme',
      providesTags: ['Tournament'],
    }),

    getTournament: builder.query<ISingleTournament, { tournamentId: string }>({
      query: ({ tournamentId }) => `tournaments/${tournamentId}`,
      providesTags: ['Tournament'],
    }),

    joinGame: builder.mutation<IJoinGameResponse, { gameId: string; password: string }>({
      query: (data) => ({
        url: `games/join/${data.gameId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useCreateGameMutation,
  useGetGamesQuery,
  useGetCurrentGameQuery,
  useJoinGameMutation,
  useCreateQuizMutation,
  useGetMyGamesQuery,
  useGetQuizesQuery,
  useGetMyQuizesQuery,
  useConfirmAccountMutation,
  useGetMyGamesAsHostQuery,
  useGetCurrentGameResultsQuery,
  useDeleteQuizMutation,
  useCreateTournamentMutation,
  useGetMyTournamentsAsHostQuery,
  useGetMyTournamentsQuery,
  useGetTournamentQuery,
  useDeleteGameMutation,
} = backendApi;

export default backendApi;
