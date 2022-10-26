import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CourseCard from "../components/courseCard/CourseCard";
import Filter from "../components/filter/Filter";
import Hero from "../components/hero/Hero";

const Home: NextPage = () => {
  return (
    <div>
      {/* <CourseCard></CourseCard> */}
      <Filter></Filter>
      <Filter></Filter>
      <Filter></Filter>
    </div>
  );
};

export default Home;
