import { createSlice } from '@reduxjs/toolkit';
import { setPending, setRejected } from '../../../utils/reduxHelper';
import {
  fetchMovies,
  fetchMovieTrailer,
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
} from '../thunks/movieThunk';

const initialState = {
  trending: [],
  nowPlaying: [],
  topRated: [],
  popular: [],
  loading: false,
  trailer: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearTrailer: (state) => {
      state.trailer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, setPending)
      .addCase(fetchMovies.rejected, setRejected)
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.trending = action.payload.results;
        state.loading = false;
        state.apiRes = {
          message: 'Movies fetched successfully',
          code: 200,
          success: true,
        };
      })
      .addCase(fetchNowPlaying.pending, setPending)
      .addCase(fetchNowPlaying.rejected, setRejected)
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlaying = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchTopRated.pending, setPending)
      .addCase(fetchTopRated.rejected, setRejected)
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.topRated = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchPopular.pending, setPending)
      .addCase(fetchPopular.rejected, setRejected)
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popular = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
        state.trailer = action.payload;
        state.loading = false;
      });
  },
});

export const { clearTrailer } = moviesSlice.actions;
export default moviesSlice.reducer;
