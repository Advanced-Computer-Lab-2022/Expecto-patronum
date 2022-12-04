import React from 'react';
import classNames from 'classnames';
import Layout from "./Layout";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsChatDots } from 'react-icons/bs';

type Props = {}

const Instructor = (props: Props) => {

  return (
    <Layout>
      <div className='sb-max:min-w-fit p-3'>
        <div className={userBar}>
          <h1 className='text-2xl'>Welcome back, Rodin Salem</h1>
          <div className='flex items-center'>
            <button className={notifications}><BsChatDots className='scale-110 pointer-events-none' /></button>
            <button className={newFeedback + " " + notifications}><IoIosNotificationsOutline className='scale-135 pointer-events-none' /></button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const newFeedback = classNames('after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:bg-orange-500 after:z-50 after:-top-0.5 after:-right-0.5');
const userBar = classNames('flex justify-between items-center mx-2');
const notifications = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 relative transition-all duration-300 flex items-center justify-center");

export default Instructor;