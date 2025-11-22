import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { FaStar, FaFilm, FaUser } from "react-icons/fa";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const genres = ["Biography", "Drama", "Comedy", "Animation", "Sci-Fi"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allMoviesRes, topRatedRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/movies"),
          axios.get("http://localhost:3000/movies/top-rated"),
          axios.get("http://localhost:3000/users"),
        ]);

        setMovies(allMoviesRes.data);
        const sortedTopRated = [...topRatedRes.data]
          .filter((m) => m.rating)
          .sort((a, b) => Number(b.rating) - Number(a.rating));

        setTopRated(sortedTopRated);

        setTotalUsers(usersRes.data[0].totalUsers);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="bg-gradient-to-r from-purple-900 via-black to-gray-900 flex flex-col md:flex-row gap-6 p-6 rounded shadow">
      <div className="w-full md:w-1/2 flex flex-col gap-6 mt-6">
        <h1 className="text-2xl font-bold text-white text-center">
          Statistics
        </h1>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-700 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition">
            <FaFilm className="text-yellow-400 text-4xl mb-2" />
            <h2 className="text-white text-3xl font-bold">{movies.length}</h2>
            <p className="text-gray-300">Total Movies</p>
          </div>

          <div className="bg-gray-700 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition">
            <FaUser className="text-green-400 text-4xl mb-2" />
            <h2 className="text-white text-3xl font-bold">{totalUsers}</h2>
            <p className="text-gray-300">Total Users</p>
          </div>
        </div>

        <div className="p-12">
          <h1 className="text-2xl font-bold text-white mb-3 text-center">
            Popular Genres
          </h1>
          <div className="flex flex-col gap-4">
            {genres.map((genre, idx) => (
              <span
                key={idx}
                className="bg-red-200 text-red-800 py-2 rounded-full text-center text-lg font-medium hover:bg-red-300 hover:scale-105 transition cursor-pointer"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      <aside className="w-full md:w-1/2 flex flex-col gap-6 mt-6">
        <h1 className="text-2xl font-bold text-white text-center">
          Top Rated Movies
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {topRated.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-700 p-3 rounded-xl shadow hover:scale-105 transition"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-36 object-cover rounded mb-3"
              />
              <h4 className="font-semibold text-white text-sm truncate">
                {movie.title}
              </h4>
              <div className="flex items-center gap-1 text-yellow-400 text-xs mt-1">
                <FaStar />
                <span>{movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default TopRated;
