import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {}

const SettingsNavigation = (props: Props) => {

    const underlineRef = useRef<any>();
    const navigationRef = useRef<any>();
  
    const setUnderline = (e: any) => {
        underlineRef.current.classList.remove('hidden');
        underlineRef.current.style.width = e.target.offsetWidth + 'px';
        underlineRef.current.style.left = (e.target.getBoundingClientRect().left - navigationRef.current.getBoundingClientRect().left - 15) + 'px';
    }
  
    useEffect(() => {
        const path = global.window?.location.pathname.includes('/Instructor/Settings/') ? global.window?.location.pathname.split('/').at(-1): 'General';

        const current = document.getElementById("Instructor-Settings-" + path + "-btn");

        if(current != undefined) {
          current.classList.add('border-b-4', 'border-canadian-red', 'font-semibold');
          underlineRef.current.style.width = current.clientWidth + 'px';
        }
    }, [])

    const hideUnderline = () => {
        const current = document.querySelectorAll(`a[href='${global.window.location.pathname}']`)[0];
        
        underlineRef.current.style.width = current.clientWidth + 'px';
        underlineRef.current.style.left = (current.getBoundingClientRect().left - navigationRef.current.getBoundingClientRect().left - 15) + 'px';
        underlineRef.current.classList.add('hidden');
    }

  return (
    <div className='sb-max:min-w-without-instructor-sidebar-closed sb-max:pr-4'>
      <div ref={navigationRef} onMouseLeave={hideUnderline} className='flex items-center sb:space-x-10 sb-max:space-x-6 relative h-full sb-max:justify-center sb:ml-8'>
        <Link id='Instructor-Settings-General-btn' href='/Instructor/Settings' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 left-2 sb:px-2 pb-1 rounded-t-md pointer-events-none'>General</div></Link>
        <Link id='Instructor-Settings-EditCourse-btn' href='/Instructor/Settings/EditCourse' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 left-2 sb:px-2 pb-1 rounded-t-md pointer-events-none'>Edit Course</div></Link>
        <Link id='Instructor-Settings-AddDiscount-btn' href='/Instructor/Settings/AddDiscount' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 left-2 sb:px-2 pb-1 rounded-t-md pointer-events-none'>Add Discount</div></Link>
        <div ref={underlineRef} className={underline}></div>
      </div>
      <hr />
    </div>
  )
}

const navigationLink = classNames('skew-x-[40deg] relative h-full sb:px-2');
const underline = classNames('h-[4px] top-7 hidden bg-canadian-red absolute skew-x-[40deg] transition-all duration-300');

export default SettingsNavigation;