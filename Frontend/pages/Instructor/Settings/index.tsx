import axios from 'axios';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
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

  useEffect(() => {
    const getInfo = async () => {
      await axios.get("http://localhost:5000/User/getInstructorInfo", {
        params: {
          id: '63877fb65c8dac5284aaa3c2',
        }
      }).then(res => {return setInfo(res.data)});
    }
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
      <form id='instructor-edit-info' className='p-4 pt-0'>
        <section className='mx-auto text-center mt-8'>
          <p className='text-xl mb-2'>Edit Profile Icon</p>
          <button type='button' className='hover:opacity-100 hover:scale-105 hover:shadow-lg rounded-full transition-all duration-300'>
            <img className={profileIconImg} src='/images/ProfileIcon.jpg' />
            <MdModeEditOutline className='relative opacity-40 left-26'/>
          </button>
        </section>

        <hr className='border-1.5 mt-4' />

        <section className='mx-auto text-center mt-8'>
          <p className='text-xl mb-7'>Edit Personal Information</p>
          <div className='flex items-center justify-between'>
            <Input onChange={setEmail} inputDivStyle='w-96' style='w-96' placeholder='Email' />
            <p className='mt-3 pr-8'>Current Email: <span className='ml-2 opacity-50'>{info ? info.email :'rodin.salem@gmail.com'}</span></p>
          </div>
          <div className='text-left'>
            <Input onChange={setBiography} type='textarea' placeholder='Biography' />
            <a className='rounded-md bg-canadian-red p-2 relative left-8 top-2 text-main border-1.5 border-canadian-red hover:bg-main hover:text-canadian-red transition-all duration-300'>Change Password</a>
          </div>
          <button onClick={updateInfo} type='submit' form='instructor-edit-info' className={submitButton} id='submit-btn'>
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