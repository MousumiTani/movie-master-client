import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loader from "./Loader";
import Button from "./Button";
import { Link } from "react-router";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies/featured");
        setMovies(
          res.data.map((m) => ({
            id: m._id,
            title: m.title,
            image: m.posterUrl,
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full h-64 md:h-[480px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
                <h2 className="text-2xl md:text-5xl font-bold mb-3">
                  {movie.title}
                </h2>
                <Link to="/all-movies">
                  <Button variant="primary">Watch Now</Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
