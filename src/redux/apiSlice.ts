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

export interface IQuiz {
  _id: string;
  title: string;
  difficulty: string;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateGameResponse {}

interface IGame {
  _id: string;
  title: string;
  active: true;
  participats: [];
  quiz: string;
}

export const backendApi = createApi({
  reducerPath: 'backendapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
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
    }),

    getGames: builder.query<IGame[], {}>({
      query: () => 'games',
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
} = backendApi;

export default backendApi;
