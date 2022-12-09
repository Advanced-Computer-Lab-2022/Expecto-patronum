import React, { useEffect, useRef } from "react";
import type { NextPage } from "next";
import UserHome from "./User";
import UserProfile from "../components/userProfile/UserProfile";
import Modal from "../components/shared/Modal/Modal";
import classNames from "classnames";

const Home: NextPage = () => {

  const homePageHeaderRef = useRef<any>();
  const homePageImageRef = useRef<any>();
  const homePageImageBackgroundRef = useRef<any>();

  useEffect(()=> {
    Array.from(homePageImageRef.current.children).map((image: any) => {
      image.classList.remove('-right-[48rem]');
      image.classList.add('-right-26');
    });
    homePageImageBackgroundRef.current.classList.remove('opacity-0');
    homePageImageBackgroundRef.current.classList.add('opacity-100');

    homePageHeaderRef.current.classList.remove('opacity-0');
    homePageHeaderRef.current.classList.add('opacity-100');
  }, [])

  return (
    <div className="relative text-center h-screen overflow-hidden">
      <section className="flex items-center justify-between mt-16">
        
        <div ref={homePageHeaderRef} className="text-left ml-20 w-[48rem] opacity-0 transition-all duration-[1500ms]">
          <h1 className="text-5xl font-bold -indent-32 pl-32 leading-[4.5rem]">Learn a New Skill Everyday, <br /> Anytime, and Anywhere.</h1>
            <br />
            <p className="pl-4 text-xl mx-8">
              1000+ Courses covering all tech domains for you to learn and explore
              new opportunities. Learn from Industry Experts and land your Dream
              Job.
            </p>
        </div>

        <div className="w-[50%] h-96 pointer-events-none">
          <div ref={homePageImageBackgroundRef} className="flex absolute right-20 scale-120 items-center justify-center w-96 h-96 bg-canadian-red rounded-full opacity-0 transition-all duration-[1500ms]">
            <div className="w-80 h-80 bg-calm-red rounded-full"></div>
          </div>
          <div ref={homePageImageRef} className='relative'>
            <img className={`${homePageImage} delay-75`} src="/images/Home Page/Part 1.png" />
            <img className={`${homePageImage}`} src="/images/Home Page/Part 2.png" />
            <img className={`${homePageImage}`} src="/images/Home Page/Part 3.png" />
            <img className={`${homePageImage} delay-100`} src="/images/Home Page/Part 4.png" />
            <img className={`${homePageImage} delay-100`} src="/images/Home Page/Part 5.png" />
            <img className={`${homePageImage} delay-75`} src="/images/Home Page/Part 6.png" />
          </div>
        </div>

      </section>

      <section id="most-viewed">

      </section>
      <section id="most-rated">

      </section>
    </div>
  );
};

var homePageImage = classNames('absolute -top-10 -right-[48rem] w-[48rem] min-w-[48rem] transition-all duration-1000');

export default Home;


{/* <div className="flex justify-center py-20">
  <div className="grid grid-flow-row nv:grid-cols-2 3lg:grid-cols-3 3xl:grid-cols-4 gap-20">
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#1D948E] to-[#3FE0D0]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2B32B2] to-[#1488CC]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2f8608] to-[#52EB0E]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#C29904] to-[#FDE143]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#B20000] to-[#FF4542]"></div>
  </div>
</div> */}
