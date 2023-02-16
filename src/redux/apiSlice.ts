import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from './authSlice';
import { RootState } from './store';

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
  username: string;
  points: string;
}

interface IGame {
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
  host: {
    name: string;
    email: string;
    _id: string;
    image: string;
  };
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
  tagTypes: ['Quiz', 'Game', 'Result'],

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

    createGame: builder.mutation<ICreateGameResponse, { quiz_id: string; title: string; password: string }>({
      query: (data) => ({
        url: 'games/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz', 'Game'],
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
} = backendApi;

export default backendApi;
