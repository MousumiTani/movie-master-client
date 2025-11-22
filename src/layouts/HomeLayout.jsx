import React from "react";
import Hero from "../components/Hero";

import TopRated from "../components/TopRated";
import Recent from "../components/Recent";
import About from "../components/About";

import { useEffect } from "react";

const HomeLayout = () => {
  useEffect(() => {
    document.title = "MovieMaster | Home";
  }, []);
  return (
    <div className="min-h-screen ">
      <Hero />
      <TopRated></TopRated>
      <Recent></Recent>
      <About></About>
    </div>
  );
};

export default HomeLayout;
