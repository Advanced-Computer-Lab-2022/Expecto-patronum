import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import ExerciseAlt from "../components/shared/SubtitleAlt/ExerciseAlt/ExerciseAlt";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div className='bg-contain bg-right text-center w-full h-screen bg-no-repeat' style={{backgroundImage: "url('/images/6759.jpg')"}}>
      {/* <ExerciseAlt /> */}
    </div>
  );
};

export default Home;
