import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import useMoviesStore from '../hooks/useMoviesStore';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const { fetchMovies, fetchNowPlaying, fetchTopRated, fetchPopular } =
    useMoviesStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchMovies(),
          fetchNowPlaying(),
          fetchTopRated(),
          fetchPopular(),
        ]);

        // Set loading to false
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchMovies, fetchNowPlaying, fetchTopRated, fetchPopular]);

  const state = useMoviesStore.getState();

  const { trending, nowPlaying, topRated, popular } = state;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
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

export default HomePage;
