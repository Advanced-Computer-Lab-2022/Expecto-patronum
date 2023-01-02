import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next/types'
import React, { useContext, useEffect } from 'react'
import MainButton from '../../../../components/shared/button/MainButton'
import ErrorComp from '../../../../components/shared/Error/ErrorComp'
import PopUpMessage from '../../../../components/shared/PopupMessage/PopupMessage'
import { ApiUrl } from '../../../../constants/constants'
import { PopupMessageContext } from '../../../_app'

type Props = {}

const EmailConfirmed = (props: Props) => {
  let router = useRouter()
  let { Token } = router.query
  const { viewPopupMessage } = useContext(PopupMessageContext);
  const [Error, SetError] = React.useState({ hasError: false, message: '' })

  // useEffect(() => {
  //   async function FetchData() {
  //     try {
  //       console.log("////////////////////////")
  //       console.log(Token)
  //       console.log("////////////////////////")

  //       await axios.get(`${ApiUrl}/User/MailVerify/${Token}`)
  //     }
  //     catch (error) {
  //       //@ts-ignore
  //       SetError({ hasError: true, message: error.response.data.message || "Error" })
  //     }
  //   }
  //   if (Token !== undefined) {
  //     FetchData();
  //   }
  // }, [router.query])
  //@ts-ignore
  if (props.data.hasError) {
    return (
      //@ts-ignore
      <ErrorComp FullScreen={true} ErrorMessage={props.data.message}></ErrorComp>
    )
  }
  return (
    <div className=' overflow-hidden'>
      <div className='flex w-[100vw] overflow-hidden items-center h-[100vh] flex-col gap-2 bg-white '>
        <div className='w-[40%] rounded-xl bg-navbar px-10 py-10  mt-20  justify-center items-center border-2 flex flex-col gap-2 '>
          <p className='text-2xl font-bold text-white mb-2'>Email Confirmed</p>
          <div className='w-20 h-20 relative animate-bounceSlow'>
            <Image alt='email icon' src={'/images/Correct.png'} fill></Image>
          </div>
          <MainButton Size='lg' btnText='Lets Start,Login now!' HandleClick={() => { router.push("/User/Profile") }}></MainButton>

        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let TokenID = context.params?.Token;
  try {

    let res = await axios.get(`${ApiUrl}/User/MailVerify/${TokenID}`)
  }
  catch {
    return {
      props: {
        data: { hasError: true, message: "Token Expired" },
      },
    };
  }


  return {
    props: {
      data: { hasError: false, message: "Success" },
    },
  };

}



export default EmailConfirmed