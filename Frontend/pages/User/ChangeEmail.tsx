import Image from 'next/image'
import router from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import MainButton from '../../components/shared/button/MainButton';
import { ApiUrl } from '../../constants/constants';
import { PopupMessageContext } from '../_app';
type Props = {
  data: string
}

interface Email {
  email: string;
}

const ChangeEmail2 = (props: Props) => {
  const { viewPopupMessage } = useContext(PopupMessageContext);
  const [Loading, SetLoading] = React.useState(false)
  const [ChangeEmail, SetChangeEmail] = React.useState(false)



  const EmailSchema = yup.object({
    email: yup.string().email().required(),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<Email>({
    resolver: yupResolver(EmailSchema)
  });

  async function Submit(data: any) {
    //@ts-ignore
    let oldEmail = props.data
    let newEmail = data.email


    try {
      SetLoading(true)
      let res = await axios.post(`${ApiUrl}/User/ResendValidationEmail`, { OldEmail: oldEmail, NewEmail: newEmail })
      router.push(`/User/FeedBack/SignUpFeedback?Email=${data.email}`
      )
      SetChangeEmail(false)
      SetLoading(false)
    } catch (error) {
      //@ts-ignore
      viewPopupMessage(false, error.response.data + "" || error.message + "");
      SetLoading(false)


    }


  }




  return (
    <div className=' overflow-hidden'>
      <div className='flex w-[100vw] overflow-hidden items-center h-[100vh] flex-col gap-2 bg-white '>
        <div className='w-[40%] rounded-xl bg-navbar px-10 py-10  mt-20  justify-center items-center border-2 flex flex-col gap-2 '>
          <p className='text-2xl font-bold text-white mb-2'>Check your Email</p>
          <div className='w-20 h-20 relative   animate-pulse'>
            <Image alt='email icon' src={'/images/Email.png'} fill></Image>
          </div>
          <form action="#" method="POST" id="sign-up" className="mt-6 w-full ">
            <div className="flex items-center w-full ">
              <div className="flex flex-col w-full px-10 text-left">
                <label className="text-lg text-center text-white mb-2">E-mail Address</label>
                <input    {...register('email')} className="border-b-2  text-white text-center bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your email" type='email' />
                <p className={ErrorP}>{errors.email?.message}</p>

              </div>
            </div>


            {/* <button type="submit" form="sign-up" className="mx-auto my-4 bg-canadian-red text-white rounded-md px-14 py-2 hover:bg-calm-red hover:scale-[1.01] transition-all duration-200">Sign Up</button> */}
            <div className="flex justify-center  mt-5">
              <MainButton HandleClick={(handleSubmit(Submit))} Loading={Loading} btnText="Resend Email" Size="lg"></MainButton>
            </div>
          </form>}




        </div>


      </div>
    </div>
  )
}

export default ChangeEmail2
const ErrorP = classNames(`text-red-500 text-sm font-semibold  mt-2`)
