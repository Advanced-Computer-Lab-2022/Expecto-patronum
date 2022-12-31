import axios from 'axios';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { date } from 'yup';
import Input from '../../../components/shared/Input/Input';
import PopUpMessage from '../../../components/shared/PopupMessage/PopupMessage';
import { PopupMessageContext } from '../../_app';
import Layout from './Layout';

axios.defaults.withCredentials = true;

type Props = {}

const index = (props: Props) => {

  const [info, setInfo] = useState<any>();
  const [newInfo, setNewInfo] = useState<any>({ email: '', biography: '' });

  const { viewPopupMessage } = useContext(PopupMessageContext);

  const getInfo = async () => {
    await axios.get("http://localhost:5000/Instructor/viewProfile", {
      params: {
        userID: '63877fb65c8dac5284aaa3c2',
      }
    }).then(res => {
      const values = {...newInfo};
      values.biography = res.data[0].biography;
      setNewInfo(values);
        return setInfo(res.data[0])
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  const setEmail = (e: any) => {
    const values = {...newInfo};
    values.email = e.target.value;
    setNewInfo(values);
  }

  const setBiography = (e: any) => {
    const values = {...newInfo};
    values.biography = e.target.value;
    setNewInfo(values);
  }

  const updateInfo = async (e: any) => {
    e.preventDefault();
    
    await axios.post("http://localhost:5000/User/updateInstructorInfo", {
      id: '63877fb65c8dac5284aaa3c2',
      email: newInfo.email,
      biography: newInfo.biography,
    }).then(res => {
      viewPopupMessage(res.data.includes("success") ? true: false, res.data);
    });
  }

  return (
    <Layout>
      <form id='instructor-edit-info' className='p-4 pt-0 sb-max:min-w-without-instructor-sidebar-closed'>
        <p className='text-2xl text-center mb-2 mt-8'>Edit Personal Information</p>
        <div className='flex items-start sb-max:items-center sb-max:flex-col'>
          <section className='sb:w-1/4 text-center relative sb:top-14'>
            <button type='button' className='hover:opacity-100 hover:scale-105 hover:shadow-lg rounded-full transition-all duration-300'>
              <img className={profileIconImg} src='/images/ProfileIcon.jpg' />
              <MdModeEditOutline className='relative opacity-40 left-26'/>
            </button>
          </section>

          <section className='sb:w-3/4 mt-8'>
            <div className='flex items-center sb:justify-between sb-max:flex-col-reverse w-full'>
              <div className='w-full'>
                <Input onChange={setEmail} placeholder='Email' />
              </div>
              <p className='mt-3 sb:pr-8 sb-max:ml-4'>Current Email: <span className='ml-2 opacity-50'>{info ? info.email :'rodin.salem@gmail.com'}</span></p>
            </div>
            <Input onChange={setBiography} value={newInfo.biography} type='textarea' placeholder='Biography' />
            <a className='rounded-md bg-canadian-red p-2 mt-4 mr-8 float-right text-main border-1.5 border-canadian-red hover:bg-main hover:text-canadian-red transition-all duration-300'>Change Password</a>
          </section>
        </div>
        <button onClick={updateInfo} type='submit' form='instructor-edit-info' className={submitButton} id='submit-btn'>
          <span /><span /><span /><span />
          Confirm Changes
        </button>
      </form>
    </Layout>
  )
}

const profileIconImg = classNames('rounded-full opacity-100 border-2 relative top-4 border-canadian-red h-28 w-28');
const submitButton = classNames('mt-8 text-lg mx-auto block hover:bg-[#0B80F3] hover:text-white hover:rounded-md h-10 py-2 px-4 ml-3 font-medium text-[#0B80F3] bg-transparent');

export default index;