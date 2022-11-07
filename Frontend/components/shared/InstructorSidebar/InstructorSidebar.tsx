import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlinePlus } from 'react-icons/ai';
import { FaEnvelope, FaHome, FaBookOpen } from 'react-icons/fa';

type Props = {}

const InstructorSidebar = (props: Props) => {
    
    const sidebarHoverRef = useRef<any>();
    const sidebarRef = useRef<any>();
    const [isSidebarOpen, setIsSidebarOpen] = useState<any>(global.innerWidth < 856 ? false : true);

    const autoMove = (e: any) => {
        sidebarHoverRef.current.style.display = "initial";
        sidebarHoverRef.current.style.width = e.currentTarget.offsetWidth + "px";
        sidebarHoverRef.current.style.height = (e.currentTarget.offsetHeight - 8) + "px";
        sidebarHoverRef.current.style.top = (e.currentTarget.offsetTop + 4) + "px";
        sidebarHoverRef.current.style.left = (e.currentTarget.offsetLeft - 5) + "px";
    }

    function hide() {
        sidebarHoverRef.current.style.display = "none";
        sidebarHoverRef.current.style.top = "initial";
    }

    function toggleSidebar() {
      sidebarRef.current.classList.toggle("sb-max:w-14");
      const items = sidebarRef.current.children[1].children;
      Array.from(items).map((li: any) => {
        li.children[0].children[1].classList.toggle("sb-max:hidden");
        li.children[0].children[1].classList.toggle("sb-max:relative");
        li.children[0].children[1].classList.toggle("sb-max:left-4");
      });
      setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <div ref={sidebarRef} className='w-72 sb-max:w-14 text-left text-slate-200 text-xl py-4 px-2 bg-navbar flex border-r-px border-slate-700 flex-col sb-max:absolute sb-max:h-full static left-0 z-40'>
        <button onClick={toggleSidebar} className='relative left-2 mb-4 rounded-md w-fit p-0.5 bg-opacity-50 hover:bg-slate-600 hover:scale-160 transition-all duration-200 scale-150 hidden sb-max:block' ><GiHamburgerMenu /></button>
        <ul onMouseLeave={hide}>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor"><a className='flex p-2 w-fit rounded-md relative z-10'><span className='pt-0.5 mr-4 sb-max:mr-0'><FaHome /></span><span className='sb-max:hidden'>Home</span></a></Link>
          </li>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor/Messages"><a className='flex p-2 w-fit rounded-md relative z-10'><span className='pt-0.5 mr-4 sb-max:mr-0'><FaEnvelope /></span><span className='sb-max:hidden'>Messages</span></a></Link>
          </li>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor/MyCourses"><a className='flex p-2 w-fit rounded-md relative z-10 whitespace-nowrap'><span className='pt-0.5 mr-4 sb-max:mr-0 sb-max:relative'><FaBookOpen /></span><span className='sb-max:hidden'>My Courses</span></a></Link>
          </li>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor/AddNewCourse"><a className='flex p-2 w-fit rounded-md relative z-10 whitespace-nowrap'><span className='pt-0.5 mr-4 sb-max:mr-0'><FaBookOpen /><AiOutlinePlus className='absolute bottom-1 h-4 left-6' /></span><span className='sb-max:hidden'>Add New Course</span></a></Link>
          </li>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor/Settings"><a className='flex p-2 w-fit rounded-md relative z-10'><span className='pt-0.5 mr-4 sb-max:mr-0'><FiSettings /></span><span className='sb-max:hidden'>Settings</span></a></Link>
          </li>
          <li className='w-full z-10 relative' onMouseOver={autoMove}>
            <Link href="/Instructor/Support"><a className='flex p-2 w-fit rounded-md relative z-10'><span className='pt-0.5 mr-4 sb-max:mr-0'><BiSupport /></span><span className='sb-max:hidden'>Support</span></a></Link>
          </li>
        </ul>
        <div ref={sidebarHoverRef} id="movable-hover" className="absolute sb-max:right-1 hidden transition-all z-0 duration-200 bg-navlink-bg px-4 py-1 rounded-lg"></div>
    </div>
  )
}

export default InstructorSidebar;