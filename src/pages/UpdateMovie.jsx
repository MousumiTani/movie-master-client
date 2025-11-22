import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Button from "../components/Button";

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
    director: "",
    cast: "",
    duration: "",
    plotSummary: "",
    language: "",
    country: "",
    addedBy: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${movieId}`);
        setMovieData({
          title: res.data.title || "",
          genre: res.data.genre || "",
          rating: res.data.rating || "",
          posterUrl: res.data.posterUrl || "",
          releaseYear: res.data.releaseYear || "",
          director: res.data.director || "",
          cast: res.data.cast || "",
          duration: res.data.duration || "",
          plotSummary: res.data.plotSummary || "",
          language: res.data.language || "",
          country: res.data.country || "",
          addedBy: res.data.addedBy || "",
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
        userId: user.email, // for ownership check
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
    <div className="max-w-xl mx-auto p-6 m-6 shadow-2xl rounded border-2 border-gray-500">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Movie</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={movieData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="posterUrl"
          value={movieData.posterUrl}
          onChange={handleChange}
          placeholder="Poster URL"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="releaseYear"
          value={movieData.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="director"
          value={movieData.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="cast"
          value={movieData.cast}
          onChange={handleChange}
          placeholder="Cast (comma separated)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="duration"
          value={movieData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="plotSummary"
          value={movieData.plotSummary}
          onChange={handleChange}
          placeholder="Plot Summary"
          rows="4"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="language"
          value={movieData.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          value={movieData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={movieData.addedBy}
          placeholder="Added By"
          disabled
          className="w-full p-2 border rounded "
        />

        <Button
          type="submit"
          disabled={updating}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          {updating ? "Updating..." : "Update Movie"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateMovie;
