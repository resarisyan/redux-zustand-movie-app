import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import TrailerModal from './TrailerModal';
import useMoviesStore from '../hooks/useMoviesStore';

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    trailer,
    fetchMovieTrailer,
    clearTrailer,
    setSelectedMovie: setSelectedMovieInStore,
    clearSelectedMovie,
  } = useMoviesStore.getState();

  const handleWatchTrailer = async (movie) => {
    await fetchMovieTrailer(movie.id);
    setSelectedMovie(movie);
    setSelectedMovieInStore(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    clearTrailer();
    clearSelectedMovie();
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl text-white font-bold mb-5">{title}</h2>
      <motion.div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="min-w-[200px] cursor-pointer relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleWatchTrailer(movie)}
          >
            <img
              className="rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 text-white flex items-center justify-center">
              <span className="px-4 py-2 bg-red-600 rounded-lg">
                Watch Trailer
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <TrailerModal
        isOpen={!!selectedMovie}
        movieDetails={selectedMovie}
        trailer={trailer}
        onClose={closeModal}
      />
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default MovieList;
