import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies");
        const userMovies = res.data.filter((m) => m.addedBy === user.email);
        setMovies(userMovies);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your collection.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMovies();
  }, [user]);

  // Open confirmation modal
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedMovie(null);
    setModalOpen(false);
  };

  // Delete movie
  const handleDelete = async () => {
    if (!selectedMovie) return;
    setDeleting(true);

    try {
      await axios.delete(
        `http://localhost:3000/movies/delete/${selectedMovie._id}`,
        { data: { userId: user.email } }
      );

      setMovies((prev) => prev.filter((m) => m._id !== selectedMovie._id));
      toast.success("Movie deleted successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete movie.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;

  if (movies.length === 0)
    return <p className="text-center mt-10">Your collection is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p>⭐ Rating: {movie.rating}</p>
              <p>🎭 Genre: {movie.genre}</p>
              <p>📅 Release Year: {movie.releaseYear}</p>

              <div className="mt-2 flex gap-2">
                <Link to={`/movies/update/${movie._id}`}>
                  <button className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => openModal(movie)}
                  className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Confirmation Modal */}
      {modalOpen && selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-auto"></div>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full z-50 pointer-events-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Delete "{selectedMovie.title}"?
            </h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to permanently delete this movie from your
              collection?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;
