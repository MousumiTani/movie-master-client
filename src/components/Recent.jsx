import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Button from "./Button";

const Recent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies");
        const sorted = res.data
          .sort(
            (a, b) =>
              parseInt(b._id.toString().substring(0, 8), 16) -
              parseInt(a._id.toString().substring(0, 8), 16)
          )
          .slice(0, 6);

        setMovies(sorted);
      } catch (error) {
        console.error("Error fetching recent movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMovies();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (movies.length === 0)
    return <p className="text-center mt-10">No recent movies.</p>;

  return (
    <div className="bg-gradient-to-r from-indigo-900  to-teal-800 p-6">
      <h1 className="text-2xl font-bold text-white text-center p-8">
        Recently Added Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h4 className=" text-red-800 text-lg font-semibold">
                {movie.title}
              </h4>
              <p className="text-sm text-gray-600">
                ⭐ {movie.rating || "N/A"} • {movie.genre || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 my-2">
                Added By:{" "}
                <span className="font-semibold">
                  {movie.addedBy || "Unknown"}
                </span>
              </p>
              <Link to={`/movie-details/${movie._id}`}>
                <Button variant="primary" size="md" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
