import { XMarkIcon } from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TrailerModal = ({ isOpen, movieDetails, trailer, onClose }) => {
  if (!isOpen || !movieDetails) return null;

  const { title, overview, release_date, vote_average, poster_path } =
    movieDetails;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row"
        >
          <img
            className="w-full lg:w-1/3 object-cover"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
          />
          <div className="p-6 lg:w-2/3">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-4">{overview}</p>
            <p className="text-lg mb-2">
              <strong>Release Date:</strong> {release_date}
            </p>
            <p className="text-lg mb-6">
              <strong>Rating:</strong> {vote_average}
            </p>
            {trailer ? (
              <div className="relative w-full">
                <iframe
                  className="w-full h-[315px] rounded-lg"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-red-500 mt-4">Trailer not available.</p>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-white text-3xl bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

TrailerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  movieDetails: PropTypes.object,
  trailer: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default TrailerModal;
