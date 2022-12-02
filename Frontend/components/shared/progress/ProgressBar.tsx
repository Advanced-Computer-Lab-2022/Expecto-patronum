import classNames from 'classnames'
import React from 'react'

type Props = {
  progressPrecentage: number
}

const ProgressBar = (props: Props) => {

  return (
    <div className={ProgressContainer} >
      <div className={Progress} style={{ "width": props.progressPrecentage + "%" }} ></div>
    </div>
  )
}

export default ProgressBar
const ProgressContainer = classNames(" w-100 bg-gray-200 h-[1.5rem] dark:bg-[#F4F4F4] rounded-full mt-2");
const Progress = classNames(`bg-green-500  h-[1.5rem]   rounded-l-full transition-all duration-500 ease-in-out `);
