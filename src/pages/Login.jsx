import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login";
  }, []);

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login success");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="h-[90vh] flex ">
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-blue-700/70  to-purple-500/60">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover mix-blend-overlay"
        >
          <source src="/videos/movie2.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Welcome Back!</h1>
          <p className="mt-3 text-lg opacity-90">
            Log in to continue your journey.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-purple-200 dark:bg-gray-700">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6 mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none"
              placeholder="Enter your email"
            />
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300 outline-none"
                placeholder="Enter your password"
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
              Login
            </Button>
          </form>

          <Button
            onClick={handleGoogle}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            No account?
            <Link to="/register" className="text-purple-600 font-medium ml-1">
              Register
            </Link>
          </p>

          <p className="text-center mt-2">
            <Link to="" className="text-purple-600 text-sm">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
