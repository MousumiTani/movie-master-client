import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies/featured");
        const hero = res.data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          image: movie.posterUrl,
        }));
        setMovies(hero);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (loading) return <Loader />;

  if (movies.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">No movies found.</div>
    );

  return (
    <div className="relative w-full h-64 md:h-[480px] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full transition-transform duration-1000"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-full h-full bg-contain bg-center relative"
            style={{ backgroundImage: `url(${movie.image})` }}
          >
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-300 px-4">
              <h2 className="text-2xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h2>
              <Link to="/all-movies">
                <Button variant="primary" size="md">
                  Watch Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-red-400" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;
