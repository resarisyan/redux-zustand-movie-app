import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
