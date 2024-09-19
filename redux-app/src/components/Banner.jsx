import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const Banner = () => {
  const { trending, loading } = useSelector((state) => state.movies);

  const movie = trending[0];

  if (loading || !movie) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      className="relative h-[450px] bg-cover bg-center"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <motion.div
        className="absolute bottom-10 left-10 text-white"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-5xl font-bold">{movie.title}</h1>
        <p className="max-w-md mt-4 text-lg">{movie.overview}</p>
        <button className="mt-4 px-6 py-3 bg-red-600 rounded-lg text-lg hover:bg-red-800 transition duration-300">
          Play Trailer
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
