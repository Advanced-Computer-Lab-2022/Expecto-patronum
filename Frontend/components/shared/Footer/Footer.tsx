import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='bg-navbar text-white mx-0 fluid-container'>
        <div className='row mx-0'>
            <div className='col p-4'>
                <h4 className='inline border-b-2 border-b-red-600 pb-1'>Website</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>About Us</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Our Services</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Privacy Policy</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Affiliate Program</a></li>
                </ul>
            </div>
            <div className='col p-4'>
                <h4 className='inline border-b-2 border-b-red-600 pb-1'>Get Help</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>FAQ</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Shopping</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Returns</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Order Status</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Payment Options</a></li>
                </ul>
            </div>
            <div className='col p-4'>
                <h4 className='inline border-b-2 border-b-red-600 pb-1'>Online Shop</h4>
                <ul className='text-left mt-3 ml-1'>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Web Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Mobile Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Desktop Applications</a></li>
                    <li className='text-sm text-gray-400 py-1.5 hover:scale-105 hover:text-white transition-all duration-300'><a href='#'>Other</a></li>
                </ul>
            </div>
            <div className='col p-4'>
                <h4 className='inline border-b-2 border-b-red-600 pb-1'>Follow Us</h4>
                <ul className='text-left mt-3 ml-1 flex'>
                    <li className='text-sm py-1 px-3 mx-px z-10 scale-125 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1.25 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><button><FaFacebookF /></button></li>
                    <li className='text-sm py-1 px-3 mx-px z-10 scale-125 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1.25 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><button><FaTwitter /></button></li>
                    <li className='text-sm py-1 px-3 mx-px z-10 scale-125 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1.25 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><button><FaInstagram /></button></li>
                    <li className='text-sm py-1 px-3 mx-px z-10 scale-125 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1.25 before:right-2.75 before:w-6 before:h-6  before:bg-gray-600 before:rounded-full hover:before:bg-white hover:scale-135 hover:text-gray-600 transition-all duration-300'><button><FaLinkedinIn /></button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer;