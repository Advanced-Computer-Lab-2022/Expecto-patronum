import React from 'react'

type Props = {
  ErrorMessage: string
  FullScreen?: boolean
}

const ErrorComp = (props: Props) => {
  return (
    <div className='overflow-hidden'>

      <div className={'flex justify-center items-center bg-navbar ' + " " + (props.FullScreen ? "w-[100vw] h-[100vh]" : "w-full h-full")}>
        <p className='text-4xl text-white text font-bold'>{props.ErrorMessage}</p>

      </div>
    </div>
  )
}

export default ErrorComp