import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Filter from "../components/filter/Filter";
import Hero from "../components/hero/Hero";
import FilterTag from "../components/shared/filterTag/FilterTag";

const Home: NextPage = () => {
  return (
    <div>
      <FilterTag></FilterTag>
    </div>
  );
};

export default Home;
