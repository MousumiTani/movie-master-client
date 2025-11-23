import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import Button from "../components/Button";

const AddMovie = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
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
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add a movie.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("https://movie-blond-three.vercel.app/movies/add", {
        ...form,
        rating: parseFloat(form.rating),
        releaseYear: parseInt(form.releaseYear),
        duration: parseInt(form.duration),
        addedBy: user.email,
      });
      toast.success("Movie added to your collection!");
      setForm({
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
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-2xl m-6 rounded bg-gray-300 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Movie</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          className="border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          className="border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          className="border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={form.posterUrl}
          className="border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={form.releaseYear}
          className="border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={form.director}
          className="border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast (comma separated)"
          value={form.cast}
          className="border rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          className="border rounded"
          onChange={handleChange}
        />
        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          value={form.plotSummary}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={form.language}
          className="border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          className="border rounded"
          onChange={handleChange}
        />

        <Button type="submit" disabled={submitting} variant="secondary">
          {submitting ? "Adding..." : "Add Movie"}
        </Button>
      </form>
    </div>
  );
};

export default AddMovie;
