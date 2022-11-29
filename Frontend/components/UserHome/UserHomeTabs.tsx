import classNames from 'classnames'
import React from 'react'

type Props = {}


const UserHomeTabs = (props: Props) => {

  return (
    <div  className={TabsContainer}>
      <div className={Tab}>
        <p className={Tabitem}>Home</p>
      </div>
      <div className={TabClicked}>
        <p className={Tabitem}>My Courses</p>
      </div>
      <div className={Tab}>
        <p className={Tabitem}>Completed</p>
      </div>
      

    </div>
  )
}

export default UserHomeTabs


const TabsContainer = classNames("flex w-[100%] h-[7vh] px-20  gap-20 shadow-xl mb-10 rounded-b-lg");  
const Tab = classNames("flex items-end border-b-4 border-transparent cursor-pointer transition-all   hover:scale-95  ")
const TabClicked= classNames("flex items-end  border-b-4 border-calm-red  cursor-pointer")
const Tabitem = classNames("text-black text-lg font-bold px-10")
