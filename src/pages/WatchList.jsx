import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRemove = async (movieId) => {
    try {
      await axios.patch(`http://localhost:3000/movies/${movieId}/watchlist`, {
        userEmail: user.email,
      });

      setMovies((prev) => prev.filter((m) => m._id !== movieId));
      toast.success("Removed from watchlist!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove movie.");
    }
  };

  if (loading) return <Loader />;

  if (movies.length === 0)
    return <p className="text-center mt-10">Your watchlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Watchlist</h1>
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
              <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
              <button
                onClick={() => handleRemove(movie._id)}
                className="text-red-600 hover:text-red-800"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
