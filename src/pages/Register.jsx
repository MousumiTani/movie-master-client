import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../components/Button";

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      toast.error("Password must be >=6, include uppercase & lowercase");
      return;
    }
    try {
      await register(email, password, name, photoURL);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-300 m-6 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <Button type="submit" variant="secondary" size="lg" className="w-full">
          Register
        </Button>
      </form>
      <div className="mt-3">
        <Button
          onClick={() => {
            googleLogin();
          }}
          className="w-full"
          variant="secondary"
          size="lg"
        >
          Sign up with Google
        </Button>
      </div>
      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
