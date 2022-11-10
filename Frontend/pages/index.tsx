import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseContentHero from "../components/CourseContent/CourseContentHero";
import CourseContentLearn from "../components/CourseContent/CourseContentLearn";
import CourseContentNav from "../components/CourseContent/CourseContentNav";
import Footer from "../components/shared/Footer/Footer";

import Navbar from "../components/shared/Navbar/Navbar";

const Home: NextPage = () => {
  const [NavApear, SetNavApear] = useState(false);

  return (
    <div>
      {NavApear && <CourseContentNav></CourseContentNav>}
      <CourseContentHero SetNavApear={SetNavApear}></CourseContentHero>
      <CourseContentLearn></CourseContentLearn>
      {/* <img style={{ width: "100%" }} src="/images/3azama.jpg" /> */}
    </div>
  );
};

export default Home;
