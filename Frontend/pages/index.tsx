import React from "react";
import type { NextPage } from "next";
import UserHome from "./User";
import UserProfile from "../components/userProfile/UserProfile";
import Modal from "../components/shared/Modal/Modal";

const Home: NextPage = () => {
  return (
    <div className="text-center w-fullscreen p-4">
      <div className="flex justify-center py-20">
        <div className="grid grid-flow-row nv:grid-cols-2 3lg:grid-cols-3 3xl:grid-cols-4 gap-20">
          <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#1D948E] to-[#3FE0D0]"></div>
          <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2B32B2] to-[#1488CC]"></div>
          <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2f8608] to-[#52EB0E]"></div>
          <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#C29904] to-[#FDE143]"></div>
          <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#B20000] to-[#FF4542]"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
