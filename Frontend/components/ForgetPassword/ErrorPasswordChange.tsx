import React from 'react'

type Props = {
  Message:string;
}

const ErrorPasswordChange = (props: Props) => {
  return (
    
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Reset password    
      </h1>
      <p className="text-white">{props.Message}</p>
    </div>
  )
  
}

export default ErrorPasswordChange