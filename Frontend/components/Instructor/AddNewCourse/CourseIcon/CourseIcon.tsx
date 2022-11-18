import classNames from 'classnames'
import React, { useState } from 'react';

type Props = {}

const CourseIcon = (props: Props) => {

  const [courseIcon, setCourseIcon] = useState<any>('/images/Trophy.png');

  const selectIcon = (e: any) => {
    setCourseIcon(e.target.src.split('/').slice(3).join('/'));
  }

  return (
    <div className='tab hidden w-full'>
      <h1 className='text-center text-3xl pb-4 text-black'>Choose Course Icon</h1>
      <div className='row p-2'>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
        </div>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
        </div>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
        </div>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Brush.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
        <div className='col-4 col-md-2'>
          <img onClick={selectIcon} className={icon} src='/images/pc.png' />
          <img onClick={selectIcon} className={icon} src='/images/Rocket3.png' />
          <img onClick={selectIcon} className={icon} src='/images/Trophy.png' />
        </div>
      </div>
    </div>
  )
}

const icon = classNames('min-w-[5rem] min-h-[5rem] hover:scale-105 mb-3 hover:bg-dark-gray transition-all duration-200 border-1.5 hover:border-0 border-bright-gray shadow-md rounded-xl cursor-pointer');

export default CourseIcon;