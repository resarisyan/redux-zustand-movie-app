import { create } from 'zustand';
import axios from 'axios';

const apiKey = import.meta.env.VITE_MOVIE_DB_TOKEN;
const baseURL = 'https://api.themoviedb.org/3';

const useMoviesStore = create((set) => ({
  trending: [],
  nowPlaying: [],
  topRated: [],
  popular: [],
  loading: false,
  trailer: null,
  selectedMovie: null,
  error: null,

  fetchMovies: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/trending/movie/week`, {
        params: { api_key: apiKey },
      });
      set({ trending: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching movies:', error);
      set({ loading: false, error: 'Failed to fetch movies' });
    }
  },

  fetchNowPlaying: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/movie/now_playing`, {
        params: { api_key: apiKey },
      });
      set({ nowPlaying: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      set({ loading: false, error: 'Failed to fetch now playing movies' });
    }
  },

  fetchTopRated: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/movie/top_rated`, {
        params: { api_key: apiKey },
      });
      set({ topRated: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
      set({ loading: false, error: 'Failed to fetch top-rated movies' });
    }
  },

  fetchPopular: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/movie/popular`, {
        params: { api_key: apiKey },
      });
      set({ popular: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      set({ loading: false, error: 'Failed to fetch popular movies' });
    }
  },

  fetchMovieTrailer: async (movieId) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/movie/${movieId}/videos`, {
        params: { api_key: apiKey },
      });
      const trailer =
        data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        ) || {};
      set({ trailer, loading: false });
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      set({ loading: false, error: 'Failed to fetch movie trailer' });
    }
  },

  clearTrailer: () => set({ trailer: null }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  clearSelectedMovie: () => set({ selectedMovie: null }),
}));

export default useMoviesStore;
