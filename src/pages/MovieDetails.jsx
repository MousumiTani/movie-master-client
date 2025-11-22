import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";
import AuthContext from "../context/AuthContext";

const MovieDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch movie data.");
        navigate("/all-movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/movies/${movieId}`);
      alert("Movie deleted successfully!");
      navigate("/my-collection");
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading || deleting) return <Loader />;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  const isOwner = user?.email === movie.addedBy;

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div className="bg-gray-300 shadow-xl rounded-lg overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-red-500">{movie.title}</h1>
          <div className="text-gray-700">
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <p>
              <strong>Plot Summary:</strong> {movie.plotSummary}
            </p>
            <p>
              <strong>Release Year:</strong> {movie.releaseYear}
            </p>
            <p>
              <strong>Added By:</strong> {movie.addedBy}
            </p>
          </div>

          {isOwner && (
            <div className="flex gap-4">
              <Link to={`/movies/update/${movie._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
