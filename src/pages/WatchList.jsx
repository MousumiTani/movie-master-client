import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import Button from "../components/Button";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies");
        const watchlistMovies = res.data.filter(
          (m) => m.watchlist && m.watchlist.includes(user.email)
        );
        setMovies(watchlistMovies);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your watchlist.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchWatchlist();
  }, [user]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  const handleRemove = async () => {
    if (!selectedMovie) return;
    setDeleting(true);
    try {
      await axios.patch(
        `http://localhost:3000/movies/${selectedMovie._id}/watchlist`,
        { userEmail: user.email }
      );

      setMovies((prev) => prev.filter((m) => m._id !== selectedMovie._id));
      toast.success("Removed from watchlist!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove movie.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;

  if (movies.length === 0)
    return (
      <h1 className="text-2xl font-bold my-6 text-center">
        Your WatchList is Empty
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-purple-600">
                {movie.title}
              </h2>
              <button
                onClick={() => openModal(movie)}
                className="text-red-600 hover:text-red-800"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-auto"></div>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full z-50 pointer-events-auto shadow-lg">
            <p className="mb-4 text-gray-700">
              Are you sure you want to remove this movie from your watchlist?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={closeModal}
                variant="secondary"
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemove}
                variant="danger"
                disabled={deleting}
              >
                {deleting ? "Removing..." : "Remove"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
