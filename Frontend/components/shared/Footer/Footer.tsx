import React, { useState, useEffect, useCallback } from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

type Props = {}

const Footer = (props: Props) => {

    const [windowSize, setWindowSize] = useState(global.innerWidth);
    const [column, setColumn] = useState("col");

    const handleWindowResize = useCallback(() => {
        setWindowSize(global.innerWidth);
    }, []); 
  
  
    useEffect(() => {
      global.addEventListener('resize', handleWindowResize);
  
      return () => {
        global.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    useEffect(() => {
        windowSize < 935 ? setColumn("col-6") : setColumn("col");
    }, [windowSize])

  return (
    <div className='bg-navbar text-white mx-0 fluid-container'>
        <div className='row mx-0'>
            <div className={column + ' p-4'}>
                <h4 className='inline border-b-2 border-b-navlink-bg pr-2 pb-1'>Website</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>About Us</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Our Services</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Privacy Policy</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Affiliate Program</a></li>
                </ul>
            </div>
            <div className={column + ' p-4'}>
                <h4 className='inline border-b-2 border-b-navlink-bg pr-2 pb-1'>Get Help</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>FAQ</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Shopping</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Returns</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Order Status</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Payment Options</a></li>
                </ul>
            </div>
            <div className={column + ' p-4'}>
                <h4 className='inline border-b-2 border-b-navlink-bg pr-2 pb-1'>Online Shop</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Web Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Mobile Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Desktop Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit'><a href='#'>Other</a></li>
                </ul>
            </div>
            <div className={column + ' p-4'}>
                <h4 className='inline border-b-2 border-b-navlink-bg pr-2 pb-1'>Follow Us</h4>
                <ul className='text-left mt-4 ml-1 flex flex-wrap'>
                    <li><button className='text-sm py-1 px-3 my-2 mx-px z-0 scale-125 rounded-full before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><FaFacebookF className='mb-1.25' /></button></li>
                    <li><button className='text-sm py-1 px-3 my-2 mx-px z-0 scale-125 rounded-full before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><FaTwitter className='mb-1.25' /></button></li>
                    <li><button className='text-sm py-1 px-3 my-2 mx-px z-0 scale-125 rounded-full before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><FaInstagram className='mb-1.25' /></button></li>
                    <li><button className='text-sm py-1 px-3 my-2 mx-px z-0 scale-125 rounded-full before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><FaLinkedinIn className='mb-1.25' /></button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer;