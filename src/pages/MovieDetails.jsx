import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import Button from "../components/Button";

const MovieDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movie data.");
        navigate("/all-movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId, navigate]);

  const handleDelete = async () => {
    if (!selectedMovie) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/movies/${selectedMovie._id}`);
      toast.success("Movie deleted successfully!");
      setModalOpen(false);
      navigate("/my-collection");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete movie.");
    } finally {
      setDeleting(false);
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  if (loading || deleting) return <Loader />;
  if (!movie)
    return <p className="text-center mt-10 text-gray-300">Movie not found.</p>;

  const isOwner = user?.email === movie.addedBy;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Movie Card */}
      <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="md:flex gap-6 p-4">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full md:w-1/3 h-60 md:h-auto object-cover rounded"
          />
          <div className="flex-1 flex flex-col gap-3 text-gray-200">
            <h1 className="text-3xl font-bold text-red-500">{movie.title}</h1>

            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} min
            </p>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.cast}
            </p>
            <p>
              <strong>Plot Summary:</strong> {movie.plotSummary}
            </p>
            <p>
              <strong>Added By:</strong> {movie.addedBy}
            </p>

            {isOwner && (
              <div className="flex gap-4 mt-3">
                <Link to={`/movies/update/${movie._id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button onClick={() => openModal(movie)} variant="danger">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-auto"></div>
          <div className="bg-gray-800 text-gray-200 rounded-lg p-6 max-w-sm w-full z-50 pointer-events-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Delete "{selectedMovie.title}"?
            </h2>
            <p className="mb-4">
              Are you sure you want to permanently delete this movie from your
              collection?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={closeModal}
                variant="outline"
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="danger"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
