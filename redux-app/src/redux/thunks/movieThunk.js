import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';

const apiKey = import.meta.env.VITE_MOVIE_DB_TOKEN;

export const fetchMovies = createAsyncThunk(
  'movie/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data: res } = await axiosInstance.get(
        `/trending/movie/week?api_key=${apiKey}`
      );
      return res;
    } catch (error) {
      const res = error.response.data;
      return rejectWithValue(res);
    }
  }
);

export const fetchNowPlaying = createAsyncThunk(
  'movie/fetchNowPlaying',
  async (_, { rejectWithValue }) => {
    try {
      const { data: res } = await axiosInstance.get(
        `/movie/now_playing?api_key=${apiKey}`
      );
      return res;
    } catch (error) {
      const res = error.response.data;
      return rejectWithValue(res);
    }
  }
);

export const fetchTopRated = createAsyncThunk(
  'movie/fetchTopRated',
  async (_, { rejectWithValue }) => {
    try {
      const { data: res } = await axiosInstance.get(
        `/movie/top_rated?api_key=${apiKey}`
      );
      return res;
    } catch (error) {
      const res = error.response.data;
      return rejectWithValue(res);
    }
  }
);

export const fetchPopular = createAsyncThunk(
  'movie/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      const { data: res } = await axiosInstance.get(
        `/movie/popular?api_key=${apiKey}`
      );
      return res;
    } catch (error) {
      const res = error.response.data;
      return rejectWithValue(res);
    }
  }
);

export const fetchMovieTrailer = createAsyncThunk(
  'movie/fetchMovieTrailer',
  async (movieId, { rejectWithValue }) => {
    try {
      const { data: res } = await axiosInstance.get(
        `/movie/${movieId}/videos?api_key=${apiKey}`
      );
      return (
        res.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        ) || {}
      );
    } catch (error) {
      const res = error.response.data;
      return rejectWithValue(res);
    }
  }
);
