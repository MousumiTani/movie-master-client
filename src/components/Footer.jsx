import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-600 to-gray-900 text-gray-300 p-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="flex flex-col justify-start text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">MovieMaster</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover, save, and track your favorite movies. Stay updated with
            the latest additions from users worldwide.
          </p>
        </div>

        <div className="flex flex-col justify-between text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-movies"
                className="hover:text-white transition-colors"
              >
                All Movies
              </Link>
            </li>
            <li>
              <Link
                to="/my-collection"
                className="hover:text-white transition-colors"
              >
                My Collection
              </Link>
            </li>
            <li>
              <Link
                to="/my-watchlist"
                className="hover:text-white transition-colors"
              >
                My Watchlist
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">Security & Policy</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start text-center md:text-right">
          <h3 className="text-lg font-semibold mb-4 animate-pulse">
            Follow Us On
          </h3>
          <div className="flex md:justify-end justify-center gap-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center p-2 border-t border-gray-700 text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} MovieDB. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
