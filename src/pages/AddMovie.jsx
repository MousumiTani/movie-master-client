import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const AddMovie = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: "",
    posterUrl: "",
    releaseYear: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:3000/movies/add", {
        ...form,
        addedBy: user.email, // attach logged-in user
      });
      toast.success("Movie added to your collection!");
      setForm({
        title: "",
        genre: "",
        rating: "",
        posterUrl: "",
        releaseYear: "",
      }); // clear form
    } catch (err) {
      console.error(err);
      toast.error("Failed to add movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={form.posterUrl}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={form.releaseYear}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            submitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
