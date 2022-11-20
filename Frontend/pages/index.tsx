import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseContentHero from "../components/CourseContent/CourseContentHero";
import CourseContentInstructor from "../components/CourseContent/CourseContentInstructor";
import CourseContentLearn from "../components/CourseContent/learn/CourseContentLearn";
import CourseContentNav from "../components/CourseContent/CourseContentNav";
import CourseContentReviews from "../components/CourseContent/review/CourseContentReviews";
import Footer from "../components/shared/Footer/Footer";

import Navbar from "../components/shared/Navbar/Navbar";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const Home: NextPage = () => {
  const [NavApear, SetNavApear] = useState(false);

  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default Home;
