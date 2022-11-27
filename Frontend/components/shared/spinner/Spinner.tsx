import React from 'react'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
    {" Loading... "}
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
  </div> 
   )
}

export default Spinner