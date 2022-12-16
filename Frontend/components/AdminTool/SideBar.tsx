import Image from "next/image";
import React, { useRef } from "react";
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






const SideBar = () => {
   return (
      <aside className="w-72" aria-label="Sidebar">
         <div className="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-[#f4f4f4] shadow-slate-500 shadow-lg border border-t-0 border-t-slate-600">
            <ul className="space-y-6">
               <li  className="group" >
                  <a
                     href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
                     <HiChartPie className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></HiChartPie>
                     <span className="ml-3">Dashboard</span>
                  </a>
               </li>
               <li className="group">
                  <a
                     href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
<MdOutlineReport className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></MdOutlineReport>
                     <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
                     <span className="inline-flex justify-center items-center px-1.5 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-red-600 dark:group-hover:bg-white dark:group-hover:text-red-600 dark:text-white">
                        New
                     </span>
                  </a>
               </li>
               <li className="group">
                  <a
                     href="Requests"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
<ImBooks className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></ImBooks>

                     <span className="flex-1 ml-3 whitespace-nowrap">
                        Course Requests
                     </span>
                     <span className="inline-flex justify-center items-center px-2.5 py-2.75 ml-3 w-3 h-3 text-sm font-medium font text-red-600 bg-blue-200 rounded-full group-hover:bg-white dark:bg-red-600 dark:text-white group-hover:dark:text-red-600">
                        3
                     </span>
                  </a>
               </li>
               <li className="group">
                  <a
                     href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
<TbDiscount2 className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></TbDiscount2>
                     <span className="flex-1 ml-3 whitespace-nowrap">Course Promotions</span>
                  </a>
               </li>
               <li className="group">
                  <a
                     href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
<RiRefund2Line className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></RiRefund2Line>
                     <span className="flex-1 ml-3 whitespace-nowrap">Refund Requests</span>
                  </a>
               </li>
               <li className="">
                  <button
                     type="button"
                     className=" group flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                     aria-controls="dropdown-example"
                     data-collapse-toggle="dropdown-example"
                  >
<HiUsers className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></HiUsers>
                     <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item
                     >
                        Users
                     </span>
                     <svg
                        sidebar-toggle-item
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
                     <li className="group pl-5">
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
                     <li className=" group pl-5">
                        <a
                           href="AddUser"
                           className="flex items-center p-2 text-base font-normal w-full text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                        >
                           <AiOutlineUserAdd className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></AiOutlineUserAdd>
                           <span className="flex-1 ml-3 whitespace-nowrap">
                           Add New User
                     </span>
                        </a>
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
                  <a
                     href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-white rounded-lg hover:bg-red-600"
                  >
                    <GoSignOut className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"></GoSignOut>
                     <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                  </a>
               </li>
            </ul>
         </div>
         <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
      </aside>
   );
};

export default SideBar;
