import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import {Sidebar} from "flowbite-react"
import { HiChartPie } from "react-icons/hi";
import { HiViewBoards } from "react-icons/hi";
import { HiInbox } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { HiTable } from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import {MdOutlineReport} from "react-icons/md"
import {HiUsers} from "react-icons/hi"
import {BiSupport} from "react-icons/bi"
import {RiRefund2Line} from "react-icons/ri"
import {ImBooks} from "react-icons/im"
import {CgUserList} from "react-icons/cg"
import {AiOutlineUserAdd} from "react-icons/ai"
import {TbDiscount2} from "react-icons/tb"
import {CgProfile} from "react-icons/cg"
import {GoSignOut} from "react-icons/go"
import {CgMail} from "react-icons/cg"
import Link from "next/link";
import classNames from "classnames";
import axios from "axios";
import router from "next/router";

const normalDiv = classNames(
  "flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
);

const normalIcon = classNames(
  "w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"
);

const selectedDiv = classNames(
  "flex items-center p-2 text-base font-normal text-white rounded-lg bg-red-600"
);

const selectedIcon = classNames(
  "w-6 h-6 transition duration-75 text-gray-100"
);

const SideBar = () => {
  const [curr, setCurr] = useState<any>();
  const [drop, setDrop] = useState<any>();
  useEffect(() => {
    const path = global.window?.location.pathname.split('/').at(-1) === 'AdminTool' ? 'Dashboard': global.window?.location.pathname.split('/').at(-1);
      setCurr(path);

      var current;
      current = document.getElementById("Admin-" + path + "-btn");
      if(current!=undefined)  {
        current.children[0].children[0].className=selectedDiv;
      }
      
      setDrop(false);
  }, [global.window?.location.pathname]);

  const changePrevAndCurr = (e: any) => {

    if(curr === e.target.innerText.replaceAll(' ', ''))
      return;

    const current = document.getElementById("Admin-" + curr + "-btn");
    if(current!=undefined)  {
      current.children[0].children[0].className=normalDiv;
    }
    e.target.parentNode.className=selectedDiv;
    setCurr(e.target.innerText.replaceAll(' ', ''));
  }

  const logout = async (e: any) => {
    Response = await axios.get("http://localhost:5000/User/logout", {
      }).then((res: { data: any; }) => { return res.data });
      router.push({
        pathname: 'http://localhost:3000/Auth'});
  }
  
  const showHideDropdown = (e: any) => {
    const current = document.getElementById("dropdown-example");
    if(current!=undefined)  {
      if(drop==true){
      current.style.display="none";
      setDrop(false);
    }
      else{
        current.style.display="inline";
        setDrop(true);
      }
  
    }
  }
   return (
     <aside className="w-60" aria-label="Sidebar">
       <div className="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-[#f4f4f4] shadow-slate-500 shadow-lg border border-t-0 border-t-slate-600">
         <ul className="space-y-6">
           <li  id='Admin-Dashboard-btn' className="group">
             <Link onClick={changePrevAndCurr} href="/AdminTool">
               <div  className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600">
                 <HiChartPie className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></HiChartPie>
                 <span className="ml-3">Dashboard</span>
               </div>
             </Link>
           </li>
           <li  id='Admin-Reports-btn' className="group">
             <Link onClick={changePrevAndCurr} href="/AdminTool/Reports">
               <div 
                 className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
               >
                 <MdOutlineReport className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></MdOutlineReport>
                 <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
                 <span className="inline-flex justify-center items-center px-1.5 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-red-600 dark:group-hover:bg-white dark:group-hover:text-red-600 dark:text-white">
                   New
                 </span>
               </div>
             </Link>
           </li>
           <li  id='Admin-Requests-btn' className="group">
           <Link onClick={changePrevAndCurr} href="/AdminTool/Requests">
           <div  
               className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <ImBooks className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></ImBooks>

               <span className="flex-1 ml-3 whitespace-nowrap">
                 Course Requests
               </span>
               <span className="inline-flex justify-center items-center px-2.5 py-2.75 ml-3 w-3 h-3 text-sm font-medium font text-red-600 bg-blue-200 rounded-full group-hover:bg-white dark:bg-red-600 dark:text-white group-hover:dark:text-red-600">
                 3
               </span>
             </div>
                  </Link>
           </li>
           <li id='Admin-Promotions-btn' className="group">
             <Link onClick={changePrevAndCurr} href="/AdminTool/Promotions">
               <div  className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600">
                 <TbDiscount2 className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></TbDiscount2>
                 <span className="flex-1 ml-3 whitespace-nowrap">
                   Course Promotions
                 </span>
               </div>
             </Link>
           </li>
           <li id='Admin-Refunds-btn' className="group">
           <Link  onClick={changePrevAndCurr} href="/AdminTool/Refunds">
           <div 
               className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <RiRefund2Line className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></RiRefund2Line>
               <span className="flex-1 ml-3 whitespace-nowrap">
                 Refund Requests
               </span>
             </div>
                  </Link>
           </li>
           <li className="">
             <button
               type="button"
               className=" group flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
               aria-controls="dropdown-example"
               onClick={(e)=>showHideDropdown(e)}
             >
               <HiUsers className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></HiUsers>
               <span
                 className="flex-1 ml-3 text-left whitespace-nowrap"
    
               >
                 Users
               </span>
               <svg
  
                 className="w-6 h-6"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fillRule="evenodd"
                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                   clipRule="evenodd"
                 ></path>
               </svg>
             </button>
             <ul id="dropdown-example" className="hidden py-2 space-y-2">
               <li className="group pl-5 py-2">
                 <a
                   href="#"
                   className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                 >
                   <CgUserList className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></CgUserList>
                   <span className="flex-1 ml-3 whitespace-nowrap">
                     Users List
                   </span>
                 </a>
               </li>
               <li id='Admin-AddNewUser-btn' className=" group pl-5">
               <Link onClick={changePrevAndCurr} href="/AdminTool/AddUser">
               <div 
                   className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                 >
                   <AiOutlineUserAdd className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></AiOutlineUserAdd>
                   <span className="flex-1 ml-3 whitespace-nowrap">
                     Add New User
                   </span>
                 </div>
                  </Link>
               </li>
             </ul>
           </li>
         </ul>
         <ul className="pt-4 mt-4 space-y-6 border-t-2 border-gray-200 dark:border-red-500">
           <li className="group">
             <a
               href="#"
               className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <CgProfile className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></CgProfile>
               <span className="ml-3">My Profile</span>
             </a>
           </li>
           <li className="group">
             <a
               href="#"
               className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <CgMail className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></CgMail>
               <span className="ml-3">Inbox</span>
             </a>
           </li>
           <li className="group">
             <a
               href="#"
               className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <svg
                 aria-hidden="true"
                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                 <path
                   fillRule="evenodd"
                   d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                   clipRule="evenodd"
                 ></path>
               </svg>
               <span className="ml-3">Documentation</span>
             </a>
           </li>
           <li className="group">
             <a
               href="#"
               className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
             >
               <BiSupport className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></BiSupport>
               <span className="ml-3">Support</span>
             </a>
           </li>
           <li className="group">
            <div className="w-full group-hover:text-white rounded-lg group-hover:bg-red-600">
            <button type="button" onClick={logout} className=" flex items-left p-2 text-base font-normal text-gray-600 ">
            
               <GoSignOut className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></GoSignOut>
               <span className="flex-1 ml-3 whitespace-nowrap transition duration-75 group-hover:text-gray-100">Sign Out</span>
         
             </button>
             </div>
           </li>
         </ul>
       </div>
       <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
     </aside>
   );
};

export default SideBar;
