import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CourseCard from "../components/CourseCard/CourseCard";
import Hero from "../components/hero/Hero";

const Home: NextPage = () => {
  return (
    <div>
      <CourseCard></CourseCard>
    </div>
  );
};

export default Home;
