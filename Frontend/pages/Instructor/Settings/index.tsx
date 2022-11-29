import classNames from 'classnames';
import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import Input from '../../../components/shared/Input/Input';
import Layout from './Layout';

type Props = {}

const index = (props: Props) => {
  return (
    <Layout>
      <form id='instructor-edit-info' className='p-4 pt-0'>
        <section className='mx-auto text-center mt-8'>
          <p className='text-xl mb-2'>Edit Profile Icon</p>
          <button className='hover:opacity-100 hover:scale-105 hover:shadow-lg rounded-full transition-all duration-300'>
            <img className={profileIconImg} src='/images/ProfileIcon.jpg' />
            <MdModeEditOutline className='relative opacity-40 left-26'/>
          </button>
        </section>

        <hr className='border-1.5 mt-4' />

        <section className='mx-auto text-center mt-8'>
          <p className='text-xl mb-7'>Edit Personal Information</p>
          <div className='flex items-center justify-between'>
            <Input inputDivStyle='w-96' style='w-96' placeholder='Email' />
            <p className='mt-3 pr-8'>Current Email: <span className='ml-2 opacity-50'>{'rodin.salem@gmail.com'}</span></p>
          </div>
          <div className='text-left'>
            <Input type='textarea' placeholder='Biography' />
            <a className='rounded-md bg-canadian-red p-2 relative left-8 top-2 text-main border-1.5 border-canadian-red hover:bg-main hover:text-canadian-red transition-all duration-300'>Change Password</a>
          </div>
          <button type='submit' form='instructor-edit-info' className={submitButton} id='submit-btn'>
            <span /><span /><span /><span />
            Confirm Changes
        </button>
        </section>
      </form>
    </Layout>
  )
}

const profileIconImg = classNames('rounded-full opacity-100 border-2 relative top-4 border-canadian-red h-28 w-28 sb-max:h-10 sb-max:w-10');
const submitButton = classNames('mt-20 text-lg hover:bg-input hover:text-white hover:rounded-md h-10 py-2 px-4 ml-3 font-medium text-input bg-transparent');

export default index;