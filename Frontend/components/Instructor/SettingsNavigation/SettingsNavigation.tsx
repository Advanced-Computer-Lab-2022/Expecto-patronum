import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

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
        const current = document.querySelectorAll(`a[href='${global.window.location.pathname}/']`)[0];

        current.classList.add('border-b-4', 'border-canadian-red', 'font-semibold', 'bg-gray-200');
        underlineRef.current.style.width = current.clientWidth + 'px';
        underlineRef.current.style.left = (current.getBoundingClientRect().left - navigationRef.current.getBoundingClientRect().left) + 'px';
    }, [])

    const hideUnderline = () => {
        const current = document.querySelectorAll(`a[href='${global.window.location.pathname}/']`)[0];
        
        underlineRef.current.style.width = current.clientWidth + 'px';
        underlineRef.current.style.left = (current.getBoundingClientRect().left - navigationRef.current.getBoundingClientRect().left - 15) + 'px';
        underlineRef.current.classList.add('hidden');
    }

  return (
    <div className='sb-max:min-w-fit'>
      <div ref={navigationRef} onMouseLeave={hideUnderline} className='flex items-center space-x-10 relative h-full ml-8'>
        <a href='/Instructor/Settings/' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 px-2 pb-1 rounded-t-md pointer-events-none'>General</div></a>
        <a href='/Instructor/Settings/EditCourse/' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 px-2 pb-1 rounded-t-md pointer-events-none'>Edit Course</div></a>
        <a href='/Instructor/Settings/AddDiscount/' onMouseOver={setUnderline} className={navigationLink}><div className='-skew-x-[40deg] relative top-0.5 px-2 pb-1 rounded-t-md pointer-events-none'>Add Discount</div></a>
        <div ref={underlineRef} className={underline}></div>
      </div>
      <hr />
    </div>
  )
}

const navigationLink = classNames('skew-x-[40deg] relative h-full px-2');
const underline = classNames('h-[4px] top-7 hidden bg-black absolute skew-x-[40deg] transition-all duration-300');

export default SettingsNavigation;