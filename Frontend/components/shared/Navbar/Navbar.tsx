'use client';
import React, { useRef, useState, createContext, useEffect, useContext } from "react";
import classNames from "classnames";
import { AiOutlineUser, AiOutlineBell } from "react-icons/ai";
import SearchBar from "./SearchBar/SearchBar";
import BurgerButton from "./BurgerButton/BurgerButton";
import SelectCountry from "./SelectCountry/SelectCountry";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import UserCourseNavbar from "./UserCourseNavbar/UserCourseNavbar";
import DataContext from "../../../context/DataContext";
import { AES, enc } from "crypto-js";
import { GetServerSidePropsContext } from "next";
import axios from "axios";

interface ContextState {
  isCurtainOpen: any;
  setIsCurtainOpen: any;
  isSearchOpen: any;
  setIsSearchOpen: any;
}
type Props = {
  data: any;
}

const curtainSearchSwitching = createContext({} as ContextState);

function Navbar() {

  let router = useRouter();

  const logout = async (e: any) => {
  Response = await axios.get("http://localhost:5000/User/logout", {
    }).then((res: { data: any; }) => { return res.data });
    router.push({
      pathname: 'http://localhost:3000/Auth'
    });
  }

  const curtainRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<any>();
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [RoleIndex, SetRoleIndex] = useState(0);
  const roles = ["guest", "user", "admin", "instructor"];
  const [userData, setUseData] = useState<any>();
  const navbarVariations = [<GuestNavbar curtainRef={curtainRef} userData={userData} logout={logout} />, <UserNavbar curtainRef={curtainRef} userData={userData} logout={logout} />, <AdminNavbar curtainRef={curtainRef} userData={userData} logout={logout} />, <InstructorNavbar curtainRef={curtainRef} userData={userData} logout={logout} />];

  useEffect(() => {
    let LocalStorage = localStorage.getItem('UserInfo') ? localStorage.getItem('UserInfo') : 'Guest';

    let CurrentRole = LocalStorage === 'Guest' ? LocalStorage : JSON.parse(LocalStorage as string).role;

    let RoleIndexData = roles.indexOf(CurrentRole === 'CorporateTrainee' ? 'user' : CurrentRole.toLowerCase());
    SetRoleIndex(RoleIndexData);
    // let data = JSON.parse(LocalStorage as string);
    // setUseData(data);
  }, [])

  useEffect(() => {
    if (parentRef.current) {
      router.pathname === '/Auth' ? parentRef.current.classList.add('hidden') : parentRef.current.classList.remove('hidden');
    }
  }, [router.pathname])

  return (
    <div>
      {router.pathname && router.pathname.split('/')[2] === 'UserCourse' ? <UserCourseNavbar ></UserCourseNavbar> :
        <curtainSearchSwitching.Provider value={{ isSearchOpen, setIsSearchOpen, isCurtainOpen, setIsCurtainOpen }}>
          <div ref={parentRef} className={navbar}>
            <Link href="/" className={navLogoDiv}>
              <img className={navLogo} src="/images/logo.png" />
            </Link>
            {navbarVariations[RoleIndex]}
          </div>
        </curtainSearchSwitching.Provider>}
    </div>
  );

};

const GuestNavbar = (props: { curtainRef: React.RefObject<HTMLDivElement>, userData: any, logout: any }) => {
  return (
    <div className="flex">
      <SearchBar />
      <div ref={props.curtainRef} className={`h-[${props.curtainRef.current?.children.length ? props.curtainRef.current?.children.length * 2 : ''}rem] ${navContentDiv}`}>
        <Link className={navWideButton} href='/Auth?isLogin=false' as='/Auth'>
          Sign Up
        </Link>
        <hr className="nv:hidden" />
        <a className={navLink} href="/Instructor">
          Inspire Learners
        </a>
      </div>
      <div className={navIconsDiv}>
        <a className={navButton} href="/Auth">
          <AiOutlineUser className={navButtonIcon} />
        </a>
        <SelectCountry />
        <BurgerButton curtainRef={props.curtainRef} />
      </div>
    </div>
  );
}

const UserNavbar = (props: { curtainRef: React.RefObject<HTMLDivElement>, userData: any, logout: any }) => {

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const userRef = useRef<HTMLDivElement>(null);


  const close = (e: any) => {
    if(userRef.current && !userRef.current?.contains(e.target)) {
      setIsOptionsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", close);
  }, [])

  return (
    <div className="flex">
      <SearchBar />
      <div ref={props.curtainRef} className={`h-[${props.curtainRef.current?.children.length ? props.curtainRef.current?.children.length * 2 : ''}rem] ${navContentDiv}`}>
        <Link className={navLink} href='/User'>My Courses</Link>
        <Link className={navLink} href='/User'>My Profile</Link>
        <hr className="nv:hidden" />
        <Link className={navLink} href='/'>New Opportunities</Link>
      </div>
      <div className={navIconsDiv}>
        <Link className={navButton} href='/'>
          <AiOutlineBell className={navButtonIcon} />
        </Link>
        <SelectCountry />
        <div className="relative top-1">
          <button onClick={() => setIsOptionsOpen(true)}>
            <Image width={50} height={50} src="/images/x8PhM.png" alt="" className="mx-2 min-h-[2rem] min-w-[2rem] border-black border-1.5 rounded-full hover:scale-110 transition-all duration-300" />
          </button>
          <div ref={userRef} className={`${isOptionsOpen ? 'h-[10.625rem] py-2': 'h-0'} absolute flex flex-col rounded-md shadow-md right-4 px-2 overflow-hidden w-60 bg-white transition-all duration-300`}>
            <label className="underline font-bold tracking-wider text-lg">Rodin Salem</label>
            <hr className="my-1" />
            <Link href='/User' className="my-1.5 pl-2 rounded-full hover:underline">My Profile</Link>
            <Link href='/' className="my-1.5 pl-2 rounded-full hover:underline">Messages</Link>
            <hr className="mb-2" />
            <button onClick={() => props.logout()} className="my-1.5 pl-2 rounded-full hover:underline text-canadian-red">Logout</button>
          </div>
        </div>
        <BurgerButton curtainRef={props.curtainRef} />
      </div>
    </div>
  );
}

const AdminNavbar = (props: { curtainRef: React.RefObject<HTMLDivElement>, userData: any, logout: any }) => {
  
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const adminRef = useRef<HTMLDivElement>(null);


  const close = (e: any) => {
    if(adminRef.current && !adminRef.current?.contains(e.target)) {
      setIsOptionsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", close);
  }, [])

  return (
    <div className="flex">
      <SearchBar />
      <div ref={props.curtainRef} className={`h-[${props.curtainRef.current?.children.length ? props.curtainRef.current?.children.length * 2 : ''}rem] ${navContentDiv}`}>
        <Link className={navLink} href='/AdminTool'>My Dashboard</Link>
        <Link className={navLink} href='/'>New Opportunities</Link>
        <hr className="nv:hidden" />
        <Link className={navLink} href='/'>For Enterprises</Link>
        <Link className={navLink} href='/'>For Universities</Link>
      </div>
      <div className={navIconsDiv}>
        <Link className={navButton} href='/'>
          <AiOutlineBell className={navButtonIcon} />
        </Link>
        <div className="relative top-1">
          <button onClick={() => setIsOptionsOpen(true)}>
            <Image width={50} height={50} src="/images/x8PhM.png" alt="" className="mx-2 min-h-[2rem] min-w-[2rem] border-black border-1.5 rounded-full hover:scale-110 transition-all duration-300" />
          </button>
          <div ref={adminRef} className={`${isOptionsOpen ? 'h-[10.625rem] py-2': 'h-0'} absolute flex flex-col rounded-md shadow-md right-4 px-2 overflow-hidden w-60 bg-white transition-all duration-300`}>
            <label className="underline font-bold tracking-wider text-lg">Rodin Salem</label>
            <hr className="my-1" />
            <Link href='/AdminTool' className="my-1.5 pl-2 rounded-full hover:underline">My Profile</Link>
            <Link href='/' className="my-1.5 pl-2 rounded-full hover:underline">Messages</Link>
            <hr className="mb-2" />
            <button onClick={() => props.logout()} className="my-1.5 pl-2 rounded-full hover:underline text-canadian-red">Logout</button>
          </div>
        </div>
        <BurgerButton curtainRef={props.curtainRef} />
      </div>
    </div>
  );
}

const InstructorNavbar = (props: { curtainRef: React.RefObject<HTMLDivElement>, userData: any, logout: any }) => {

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const instructorRef = useRef<HTMLDivElement>(null);


  const close = (e: any) => {
    if(instructorRef.current && !instructorRef.current?.contains(e.target)) {
      setIsOptionsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", close);
  }, [])

  return (
    <div className="flex">
      <SearchBar />
      <div ref={props.curtainRef} className={`h-[${props.curtainRef.current?.children.length ? props.curtainRef.current?.children.length * 2 : ''}rem] ${navContentDiv}`}>
        <Link className={navLink} href='/Instructor'>My Dashboard</Link>
        <Link className={navLink} href='/'>New Opportunities</Link>
      </div>
      <div className={navIconsDiv}>
        <SelectCountry />
        <div className="relative top-1">
          <button onClick={() => setIsOptionsOpen(true)}>
            <Image width={50} height={50} src="/images/x8PhM.png" alt="" className="mx-2 min-h-[2rem] min-w-[2rem] border-black border-1.5 rounded-full hover:scale-110 transition-all duration-300" />
          </button>
          <div ref={instructorRef} onClick={() => setIsOptionsOpen(false)} className={`${isOptionsOpen ? 'h-[10.625rem] py-2': 'h-0'} absolute flex flex-col rounded-md shadow-md right-4 px-2 overflow-hidden w-60 bg-white transition-all duration-300`}>
            <label className="underline font-bold tracking-wider text-lg">Rodin Salem</label>
            <hr className="my-1" />
            <Link href='/Instructor/Settings' className="my-1.5 pl-2 rounded-full hover:underline">My Profile</Link>
            <Link href='/Instructor/Messages' className="my-1.5 pl-2 rounded-full hover:underline">Messages</Link>
            <hr className="mb-2" />
            <button onClick={() => props.logout()} className="my-1.5 pl-2 rounded-full hover:underline text-canadian-red">Logout</button>
          </div>
        </div>
        <BurgerButton curtainRef={props.curtainRef} />
      </div>
    </div>
  );
}

const navbar = classNames("relative z-50 flex justify-between items-center nv:px-2 h-16 py-10 shadow-sm bg-main");
const navLogoDiv = classNames("nv-max:absolute z-behind 1030:overflow-hidden 1030:w-[3.75rem] transition-all duration-300");
const navLogo = classNames("h-20 w-fit min-w-fit hover:scale-105 transition-all duration-200");
const navContentDiv = classNames("nv-max:absolute nv:h-8 z-50 nv:flex-row-reverse mob:w-screen nv-max-mob:w-fullscreen nv-max:block nv-max:p-2 flex items-center transition-navbar-anime duration-1000 nv-max:bottom-20 nv-max:left-0 nv-max:bg-main");
const navIconsDiv = classNames("flex items-center nv-max:absolute nv-max:w-fit right-5 bottom-3.5 h-13");
const navLink = classNames("navbar-link text-sm nv-max:text-lg pt-px nv-max:hover:text-canadian-red h-fit nv-max:my-2 nv:top-2.5 rounded-full border-black w-fit mr-6 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300 after:content-[''] after:absolute after:-bottom-px after:left-0 after:w-full after:h-0.5 after:bg-canadian-red after:transition-all after:duration-500 hover:after:opacity-100 after:opacity-100 after:scale-0 after:origin-center hover:after:scale-100 items-center justify-center block");
const navWideButton = classNames("navbar-link nv-max:text-lg border-1.5 w-fit nv-max:relative nv-max:my-2 nv-max:h-10 nv:top-2.5 border-canadian-red nv-max:border-0 nv-max:bg-transparent nv-max:text-canadian-red bg-canadian-red hover:bg-transparent text-white text-sm pt-px rounded-full hover:text-canadian-red nv:mx-2 nv:h-8 nv:px-6 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300 flex items-center justify-center nv-max:after:content-[''] nv-max:after:absolute nv-max:after:-bottom-px nv-max:after:left-0 nv-max:after:w-full nv-max:after:h-0.5 nv-max:after:bg-canadian-red nv-max:after:transition-all nv-max:after:duration-500 nv-max:hover:after:opacity-100 nv-max:after:opacity-100 nv-max:after:scale-0 nv-max:after:origin-center nv-max:hover:after:scale-100  nv-max:items-center ");
const navButton = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 relative transition-all duration-300 flex items-center justify-center");
const navButtonIcon = classNames("scale-110 pointer-events-none");

export default Navbar;
export { curtainSearchSwitching };

