import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { SlTrophy } from 'react-icons/sl';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DataContext from '../../../../context/DataContext';

type Props = {}

const UserCourseNavbar = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [ShowProgress, SetShowProgress] = React.useState(false);
  const { Progress } = React.useContext(DataContext);
  console.log(Progress)

  useEffect(() => {
    if (Progress != 0) {
      SetShowProgress(true);
      var myTimeout = setTimeout(() => SetShowProgress(false), 1000);
      myTimeout;
    }
    return () => {
      clearTimeout(myTimeout);
    }



  }, [Progress])
  return (
    <div className={Container}>
      <div className={LogoContainer}>
        <div className={imageContainer}>
          <img
            className='object-contain'
            src="/images/logo2.png"
            alt={"CGP"}
          />
        </div>
        <div>Course Name</div>
      </div>

      <div className={UtilContainer}>
        <div onMouseEnter={() => { SetShowProgress(true) }} onMouseLeave={() => { SetShowProgress(false) }} className='flex items-center gap-1  cursor-pointer'>
          <div className='relative' style={{ width: 45, height: 45 }}>
            <CircularProgressbar styles={buildStyles({ pathColor: "#D80621" })} value={Progress} />
            <SlTrophy size={22} className={'absolute top-3 left-3  transition-opacity' + ' ' + (ShowProgress ? "opacity-0" : "opacity-1")} color='gray' />
            <p className={'absolute  top-3 left-0 right-0 bottom-0 text-center  transition-opacity  text-sm' + ' ' + (ShowProgress ? 'opacity-1' : 'opacity-0')}>{Progress}%</p>
            {/* {ShowProgress && <div className='w-30 h-20 bg-red-300 absolute top-10 z-10'><p>8/100</p> </div>} */}
          </div>
          <p>Your progress</p>
        </div>


        {/* <div className={ProgressContainer}>
          <SlTrophy color='gray' />
        </div> */}
        <div className='relative'>
          <button onClick={() => setIsDropdownOpen(prev => { return !prev })} className={DropdownContainer} type="button">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
          </button>
          <div className={DropDownList + " " + (isDropdownOpen ? DropDownShow : DropDownHide)}>
            <ul onClick={() => setIsDropdownOpen(false)} className=" text-sm  text-gray-200">
              <Link href='/User/Request?Type=Report'>
                <li>
                  <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Report</p>
                </li>
              </Link>
              <Link href={'/User/Request?Type=Refund'}>
                <li>
                  <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Refund</p>
                </li>
              </Link>

            </ul>
            <div className=" border-t-4  flex items-start gap-4 pb-4 pt-2 pl-4  text-gray-500">
              <MdOutlineErrorOutline fontSize={30} />
              <p className='text-xs'>This course was purchased outside the 30-day refund policy and cannot be refunded.</p>
            </div>
          </div>
        </div>


      </div>

    </div >
  )
}

export default UserCourseNavbar
const Container = classNames("flex justify-between items-center w-full h-16  text-black shadow-md px-8");
const LogoContainer = classNames("flex items-center gap-4");
const UtilContainer = classNames("flex items-center justify-center gap-6 ");
const imageContainer = classNames("w-18 h-18  flex -ml-2 justify-center items-center border-r-4");
const ProgressContainer = classNames("flex items-center radial-progress justify-center w-10 h-10  rounded-full border-4 border-gray-400 cursor-pointer");
const DropdownContainer = classNames("inline-flex items-center p-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none text-white focus:ring-gray-50 bg-gray-800 hover:bg-gray-700");
const DropDownList = classNames("absolute top-12 right-0 z-10 w-56 transition ease-out duration-300 bg-white rounded divide-gray-100 shadow");
const DropDownHide = classNames("opacity-0 hidden")
const DropDownShow = classNames("opacity-1 visible")