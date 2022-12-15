import React, { useContext } from 'react';
import classNames from 'classnames';
import Layout from "./Layout";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsChatDots } from 'react-icons/bs';
import Rate from 'rc-rate';
import DataContext from '../../context/DataContext';

type Props = {}

const Instructor = (props: Props) => {

  const { Rate } = useContext(DataContext);

  return (
    <Layout>
      <div className='sb-max:min-w-fit p-3'>
        <section id='Greeting' className={userBar}>
          <h1 className='text-2xl'>Welcome back, Rodin Salem</h1>
          <div className='flex items-center'>
            <button className={notifications}><BsChatDots className='scale-110 pointer-events-none' /></button>
            <button className={newFeedback + " " + notifications}><IoIosNotificationsOutline className='scale-135 pointer-events-none' /></button>
          </div>
        </section>

        <section id='main-instructor-dashboard-body' className='h-screen text-black divide-x-2'>
          <div className='inline-block w-3/4 h-full align-top'>
          </div>

          <div className='inline-block w-1/4 h-full px-8 pt-5'>
            <div className='w-fit rounded-lg bg-[#222222] text-white p-4 text-center space-y-3'>
              <h1 className='text-2xl'>Money Owed</h1>
              <p className='text-5xl relative mb-4'>214.98 <span className='text-sm absolute -bottom-3 right-0'>{Rate.curr}/month</span></p>
              <button className='text-bright-gray bg-[#444444] text-lg rounded-lg px-2 py-1 hover:text-white hover:scale-[1.02] transition-all duration-200'>View Wallet</button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const newFeedback = classNames('after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:bg-orange-500 after:z-50 after:-top-0.5 after:-right-0.5');
const userBar = classNames('flex justify-between items-center mx-2');
const notifications = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 relative transition-all duration-300 flex items-center justify-center");

export default Instructor;