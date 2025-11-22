import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10 items-center bg-gradient-to-r from-indigo-900  to-teal-800">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-white text-center p-4">
          About MovieMaster
        </h3>
        <p className="text-gray-300 leading-7">
          MovieMaster is your personal movie hub where you can explore, add,
          manage, and track your favorite movies. Powered by MERN stack, this
          platform gives users a clean, dynamic, and cinematic experience.
          <br />
          <br />
          Our goal is to bring the world of movies closer to you — visually
          engaging, smooth, and perfectly curated for movie lovers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <motion.video
          src="/videos/movie.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-lg shadow-lg w-full max-w-md"
          animate={{
            y: [0, -15, 0], // floating motion
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default About;
