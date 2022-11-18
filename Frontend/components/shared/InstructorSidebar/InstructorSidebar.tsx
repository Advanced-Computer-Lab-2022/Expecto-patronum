import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { FiSettings } from 'react-icons/fi';
import { BiBookAdd, BiSupport } from 'react-icons/bi';
import { GiTeacher } from "react-icons/gi";
import { HiOutlineMail } from 'react-icons/hi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

type Props = {}

const InstructorSidebar = (props: Props) => {
    
    const sidebarHoverRef = useRef<any>();
    const sidebarRef = useRef<any>();
    const sidebarLinkRef = useRef<any>();
    const [isSidebarOpen, setIsSidebarOpen] = useState<any>(false);
    const [curr, setCurr] = useState<any>();
    const instructorIconRef = useRef<any>();
    const instructorInfoRef = useRef<any>();
    const [sidebarButton, setSidebarButton] = useState<any>(<AiOutlineAlignLeft className='-scale-y-100' />);

    useEffect(() => {

      const path = global.window?.location.pathname.split('/').at(-1) === 'Instructor' ? 'Dashboard': global.window?.location.pathname.split('/').at(-1);
      setCurr(path);
      
      const current = document.getElementById("Instructor-" + path + "-btn");
            current?.classList.add("bg-canadian-red");
            current?.classList.add("text-white");
            current?.classList.remove("text-gray-800");
            current?.classList.add("selected-instructor-tab");

    }, [global.window?.location.pathname]);

    // useEffect(() => {
    //   global.window.onscroll = () => {
    //     global.window.scrollY < 80 ? sidebarRef.current.classList.add('sb-max:top-[80px]'): sidebarRef.current.classList.remove('sb-max:top-[80px]')
    //   }
    // },[])

    const autoMove = (e: any) => {
        sidebarHoverRef.current.classList.add('opacity-100');
        sidebarHoverRef.current.classList.remove('opacity-0');
        sidebarHoverRef.current.style.width = (e.currentTarget.offsetWidth - 7) + "px";
        sidebarHoverRef.current.style.height = e.currentTarget.offsetHeight + "px";
        sidebarHoverRef.current.style.top = e.currentTarget.offsetTop + "px";
        sidebarHoverRef.current.style.left = e.currentTarget.offsetLeft + "px";

        const icon = e.target.children[0].children[0];
        icon.classList.toggle("text-white");
    }

    const hide = (e: any) => {
        sidebarHoverRef.current.classList.add('opacity-0');
        sidebarHoverRef.current.classList.remove('opacity-100')

        const icon = e.target.children[0].children[0];
        icon.classList.toggle("text-white");
    }

    function toggleSidebar() {
      sidebarRef.current.classList.toggle("sb-max:w-14");
      sidebarRef.current.classList.toggle("sb-max:min-w-[3.5rem]");
      Array.from(sidebarLinkRef.current.children).map((li: any) => {
        li.children[0].children[0].children[1].classList.toggle("sb-max:hidden");
        li.children[0].children[0].children[1].classList.toggle("ml-4");
      });

      instructorIconRef.current.classList.toggle("sb-max:h-10");
      instructorIconRef.current.classList.toggle("sb-max:w-10");
      instructorInfoRef.current.classList.toggle("sb-max:hidden");
      instructorInfoRef.current.classList.toggle("sb-max:opacity-100");

      instructorInfoRef.current.classList.toggle("sb-max:opacity-0");

      setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
      setSidebarButton(isSidebarOpen ? <IoMdClose />: <AiOutlineAlignLeft className='-scale-y-100' />);
    }, [isSidebarOpen])

    const changePrevAndCurr = (e: any) => {

      if(curr === e.target.innerText.replaceAll(' ', ''))
        return;

      const current = document.getElementById("Instructor-" + curr + "-btn");
            current?.classList.remove("bg-canadian-red");
            current?.classList.remove("text-white");
            current?.classList.add("text-gray-800");
            current?.classList.remove("selected-instructor-tab");

      e.target.parentNode.classList.add("bg-canadian-red");
      e.target.parentNode.classList.add("text-white");
      e.target.parentNode.classList.remove("text-gray-800");
      e.target.parentNode.classList.add("selected-instructor-tab");

      setCurr(e.target.innerText.replaceAll(' ', ''));
    }

  return (
    <div ref={sidebarRef} className={sideBar}>
        <button onClick={toggleSidebar} className={burgerButton}>{sidebarButton}</button>
        <div className='flex items-center w-fit mb-4 sb-max:mb-0 transition-all duration-200'>
          <img ref={instructorIconRef} className={profileIconImg} src='/images/ProfileIcon.jpg' />
          <div ref={instructorInfoRef} className={instructorNT}>
            <label>R. Salem</label>
            <label className='text-xs italic'>Software Engineer</label>
          </div>
        </div>

        <hr className='sb-max:hidden' />
        
        <ul ref={sidebarLinkRef} onMouseLeave={() => sidebarHoverRef.current.style.top = "100px"}>
          <li id='Instructor-Dashboard-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor"><span className={link}><TbLayoutDashboard className={linkIcon} /><span className={linkText}>Dashboard</span></span></Link>
          </li>
          <li id='Instructor-Messages-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor/Messages"><span className={link}><HiOutlineMail className={linkIcon} /><span className={linkText}>Messages</span></span></Link>
          </li>
          <li id='Instructor-MyCourses-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor/MyCourses"><span className={link}><GiTeacher className={linkIcon} /><span className={linkText}>My Courses</span></span></Link>
          </li>
          <li id='Instructor-AddNewCourse-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor/AddNewCourse"><span className={link}><BiBookAdd className={linkIcon} /><span className={linkText}>Add New Course</span></span></Link>
          </li>
          <li id='Instructor-Settings-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor/Settings"><span className={link}><FiSettings className={linkIcon} /><span className={linkText}>Settings</span></span></Link>
          </li>
          <li id='Instructor-Support-btn' className={listedItem} onMouseOver={autoMove} onMouseLeave={hide}>
            <Link onClick={changePrevAndCurr} href="/Instructor/Support"><span className={link}><BiSupport className={linkIcon} /><span className={linkText}>Support</span></span></Link>
          </li>
        </ul>
        <div ref={sidebarHoverRef} id="movable-hover" className={hoverPointer}></div>
    </div>
  )
}

const sideBar = classNames('w-52 min-w-[13rem] h-screen sb-max:w-14 sb-max:min-w-[3.5rem] text-left text-lg py-4 pl-2 pr-[1.75px] bg-main flex border-r-2 border-gray-300 shadow-lg flex-col sticky top-0 sb:left-0 z-10 transition-all overflow-hidden duration-200');
const burgerButton = classNames('relative left-2 mb-4 rounded-md w-fit p-0.5 hover:text-canadian-red hover:scale-160 transition-all duration-200 scale-150 hidden sb-max:block');
const profileIconImg = classNames('rounded-full shadow-lg border-2 border-canadian-red h-16 w-16 sb-max:h-10 sb-max:w-10');
const instructorNT = classNames('flex flex-col sb-max:opacity-0 text-gray-800 pl-3 sb-max:hidden whitespace-nowrap transition-all duration-1000');
const listedItem = classNames('w-full z-10 relative my-2 text-gray-800 hover:text-white rounded-lg rounded-br-none transition-all duration-200 ml-0.5');
const link = classNames('flex items-center p-2 rounded-md pointer-events-none');
const linkIcon = classNames('mr-4 mb-1.25 sb-max:mr-0 opacity-70 scale-120');
const linkText = classNames('sb-max:hidden whitespace-nowrap');
const hoverPointer = classNames('absolute opacity-0 transition-all z-0 top-0 left-0 duration-200 bg-canadian-red py-1 rounded-lg');

export default InstructorSidebar;