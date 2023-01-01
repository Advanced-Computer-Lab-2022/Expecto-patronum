import React from 'react'
import classNames from "classnames";
import Image from 'next/image';
import UserHomeTabs from '../../components/UserHome/UserHomeTabs';
import MyCourses from '../../components/UserHome/MyCourses';
import axios from 'axios';


type Props = {}

const index = (props: Props) => {
  return (
    <div >
      <div className={HomeBanner}>
        <Image
          src="https://cancham.org.eg//upload//Canadian_Chamber_201902_742919.jpg"
          alt={'banner'}
          objectFit='cover'
          layout='fill'
          quality={100}
          priority
        />

        <p className={HomeBannerTitle}>Welcome Back,Mohamed</p>
      </div>
      <UserHomeTabs></UserHomeTabs>
      <MyCourses></MyCourses>

    </div>
  )
}

export default index


const HomeBanner = classNames(
  "flex px-20 items-center h-[40vh] w-[100%] bg-blue-300 curve relative "
);
const HomeBannerTitle = classNames("text-4xl text-white font-bold z-10")