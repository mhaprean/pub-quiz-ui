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

  questions: IQuestion[];
}

interface ICreateGameResponse extends IGame {
  password: string;
}

export interface IResultsUser {
  username: string;
  points: string;
}

interface IGame {
  _id: string;
  title: string;
  active: true;
  participats: [];
  // quiz: string;
  host: string;
  results: IResultsUser[];
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


const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:5000';


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
  tagTypes: ['Quiz'],

  endpoints: (builder) => ({
    getMyProfile: builder.query<IUser, {}>({
      query: () => 'auth/profile',
    }),
    getQuizes: builder.query<IQuiz[], {}>({
      query: () => 'quiz',
      providesTags: ['Quiz'],
    }),

    getGames: builder.query<IGame[], {}>({
      query: () => 'games',
    }),

    getCurrentGame: builder.query<ISingleGame, { gameId: string }>({
      query: ({ gameId }) => `games/${gameId}`,
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

    createGame: builder.mutation<ICreateGameResponse, { quiz_id: string; title: string; password: string }>({
      query: (data) => ({
        url: 'games/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quiz'],
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useGetQuizesQuery,
  useCreateGameMutation,
  useGetGamesQuery,
  useGetCurrentGameQuery,
} = backendApi;

export default backendApi;
