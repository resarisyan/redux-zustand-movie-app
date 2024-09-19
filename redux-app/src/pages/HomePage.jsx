import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovies,
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
} from '../redux/thunks/movieThunk';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { trending, nowPlaying, topRated, popular, loading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchNowPlaying());
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-black text-white">
      <Banner />
      <div className="mx-auto px-4 py-8">
        <MovieList title="Now Playing" movies={nowPlaying} />
        <MovieList title="Trending" movies={trending} />
        <MovieList title="Top Rated" movies={topRated} />
        <MovieList title="Popular" movies={popular} />
      </div>
    </div>
  );
};

export default Home;
