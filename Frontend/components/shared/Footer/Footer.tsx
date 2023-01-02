import React from 'react';
import classNames from 'classnames';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Link from 'next/link';

type Props = {}

const Footer = (props: Props) => {

  return (
    <div style={{backgroundColor: '#222222'}} className='text-white mx-0 fluid-container block relative z-50'>
        <div className='row mx-0'>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Website</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>About Us</Link></li>
                    <li className={colItems}><Link href=''>Our Services</Link></li>
                    <li className={colItems}><Link href=''>Privacy Policy</Link></li>
                    <li className={colItems}><Link href=''>Affiliate Program</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Get Help</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>FAQ</Link></li>
                    <li className={colItems}><Link href=''>Shopping</Link></li>
                    <li className={colItems}><Link href=''>Returns</Link></li>
                    <li className={colItems}><Link href=''>Order Status</Link></li>
                    <li className={colItems}><Link href=''>Payment Options</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Online Shop</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>Web Applications</Link></li>
                    <li className={colItems}><Link href=''>Mobile Applications</Link></li>
                    <li className={colItems}><Link href=''>Desktop Applications</Link></li>
                    <li className={colItems}><Link href=''>Other</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Follow Us</div></h4>
                <ul className={`${colData} flex flex-wrap`}>
                    <li><button className={colIcons}><FiFacebook /></button></li>
                    <li><button className={colIcons}><FiTwitter /></button></li>
                    <li><button className={colIcons}><FiInstagram /></button></li>
                    <li><button className={colIcons}><FiLinkedin /></button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

const footerCol = classNames(`col-6 col-md-3 p-4`);
const colHeader = classNames(`w-fit relative right-3 border-b-[3px] border-canadian-red px-1 pb-1 skew-x-[40deg]`);
const colHeaderText = classNames(`-skew-x-[40deg] ml-2`);
const colData = classNames(`text-left mt-3 ml-1`);
const colItems = classNames(`text-sm text-bright-gray py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit`);
const colIcons = classNames(`text-sm p-1.25 flex border-canadian-red text-canadian-red hover:text-white hover:border-white items-center justify-center m-2 z-0 scale-125 rounded-full border-1.5 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:rounded-full hover:scale-135 transition-all duration-300`);

export default Footer;