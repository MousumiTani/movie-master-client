import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../components/Button";

const AllMovies = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [genresFilter, setGenresFilter] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const availableGenres = [
    "Biography",
    "Animation",
    "Drama",
    "Documentary",
    "Sci-Fi",
  ];

  const fetchMovies = async () => {
    try {
      const params = {};
      if (genresFilter.length > 0) params.genres = genresFilter.join(",");
      if (minRating) params.minRating = minRating;
      if (maxRating) params.maxRating = maxRating;

      const res = await axios.get("http://localhost:3000/movies", { params });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genresFilter, minRating, maxRating]);

  const toggleWatchlist = async (movieId) => {
    if (!user) return alert("Login to manage watchlist");

    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );

    try {
      await axios.patch(`http://localhost:3000/movies/${movieId}/watchlist`, {
        userEmail: user.email,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update watchlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6 text-center">All Movies</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div>
          <label className="font-semibold mr-2">Genres:</label>
          {availableGenres.map((g) => (
            <label key={g} className="mr-2">
              <input
                type="checkbox"
                value={g}
                checked={genresFilter.includes(g)}
                onChange={(e) => {
                  const val = e.target.value;
                  setGenresFilter((prev) =>
                    prev.includes(val)
                      ? prev.filter((x) => x !== val)
                      : [...prev, val]
                  );
                }}
              />{" "}
              {g}
            </label>
          ))}
        </div>
        <div>
          <label>Min Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="ml-2 w-16 border rounded px-1"
          />
        </div>
        <div>
          <label>Max Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            className="ml-2 w-16 border rounded px-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => {
          const isInWatchlist = watchlist.includes(movie._id);
          return (
            <div
              key={movie._id}
              className="bg-gray-300 shadow-lg rounded-lg overflow-hidden transform transition duration-300 ease-out hover:-translate-y-2"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-red-800 text-lg font-semibold">
                    {movie.title}
                  </h4>

                  {user && (
                    <button
                      onClick={() => toggleWatchlist(movie._id)}
                      className="text-2xl transition"
                      title={
                        isInWatchlist
                          ? "Remove from Watchlist"
                          : "Add to Watchlist"
                      }
                    >
                      {isInWatchlist ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-500" />
                      )}
                    </button>
                  )}
                </div>

                <div className="text-gray-600 my-2">
                  <p>⭐ Rating: {movie.rating}</p>
                  <p>🎭 Genre: {movie.genre}</p>
                  <p>📅 Release Year: {movie.releaseYear}</p>
                </div>

                <Link to={`/movie-details/${movie._id}`}>
                  <Button variant="primary" size="md" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllMovies;
