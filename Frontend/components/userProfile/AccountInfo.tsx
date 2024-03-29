import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import SectionTitle from './SectionTitle'
import { Profile } from './UserProfile'

type Props = {
  data: Profile | undefined
}

const AccountInfo = (props: Props) => {
  return (
    <div >
      {/* <div className={TitleSection}>
        <h2 className={Title}>Account</h2>
        <p className={SubTitle}>Edit your account settings and change your password here</p>
      </div> */}
      <SectionTitle Title={"Account"} SubTitle={"Edit your account settings and change your password here"}></SectionTitle>
      <div className={Container}>
        <div className={ProfileDataContainer}>
          <div className={ProfileNameInputContainer}>
            <div className={LabelInputCont}>
              <label className={Label}>First Name : </label>
              <input className={Input} disabled value={props.data?.firstname || "Name"} />
            </div>
            <div className={LabelInputCont}>
              <label className={Label}>Last Name : </label>
              <input className={Input} disabled value={props.data?.lastname || "LName"} />
            </div>

          </div>
          <div className={LabelInputCont}>
            <label className={Label}>Email : </label>
            <input className={Input} disabled value={props.data?.email || "Email"} />
          </div>

          <div className={ChangeDataCont}>
            <Link href={"/User/ChangeEmail"}>
              <button className={Button}>Change Email</button>
            </Link>
            <Link href={"/User/ChangePassword2"}>
              <button className={Button}>Change Password</button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AccountInfo

const TitleSection = classNames("text-center w-full border-b-2 border-gray-300 py-4");
const Title = classNames("text-2xl font-bold");
const SubTitle = classNames("text-lg text-gray-500");
const Container = classNames("border-b-2 border-gray-300");
const ProfileDataContainer = classNames("flex flex-col gap-8  py-6 w-3/4 mr-auto ml-auto")
const ProfileNameInputContainer = classNames("flex justify-between ");
const ChangeDataCont = classNames("flex flex-col items-start gap-4")
const LabelInputCont = classNames("flex flex-col gap-1")
const Label = classNames("text-md font-bold");
const Input = classNames("border-2 border-gray-300 rounded-md w-full p-2");
const Button = classNames("bg-canadian-red text-white px-4 py-2 rounded-md  w-52 hover:bg-calm-red transition duration-300 ease-in-out");

