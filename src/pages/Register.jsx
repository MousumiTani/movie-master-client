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
    <div className="h-[90vh] flex">
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-blue-700/70 to-purple-500/60">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover mix-blend-overlay"
        >
          <source src="/videos/movie2.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Join Us!</h1>
          <p className="mt-3 text-lg opacity-90">
            Create an account and start your journey.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-purple-200 dark:bg-gray-700">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none "
              required
            />
            <input
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none "
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none "
              required
            />
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none pr-10"
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

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Register
            </Button>
          </form>

          <Button
            onClick={() => googleLogin()}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?
            <Link to="/login" className="text-purple-600 font-medium ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
