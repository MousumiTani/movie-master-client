import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { user } = useContext(AuthContext);
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    rating: "",
    posterUrl: "",
    releaseYear: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${movieId}`);
        setMovieData({
          title: res.data.title,
          genre: res.data.genre,
          rating: res.data.rating,
          posterUrl: res.data.posterUrl,
          releaseYear: res.data.releaseYear,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch movie data.");
        navigate("/my-collection");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, navigate]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:3000/movies/update/${movieId}`, {
        ...movieData,
        userId: user.email, // required for ownership check
      });

      toast.success("Movie updated successfully!");
      navigate("/my-collection");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update movie.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Movie</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          value={movieData.rating}
          onChange={handleChange}
          placeholder="Rating"
          min="0"
          max="10"
          step="0.1"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="posterUrl"
          value={movieData.posterUrl}
          onChange={handleChange}
          placeholder="Poster URL"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="releaseYear"
          value={movieData.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {updating ? "Updating..." : "Update Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
