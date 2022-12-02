import classNames from 'classnames'
import React from 'react'

type Props = {
  Setter: React.Dispatch<React.SetStateAction<"AccountInfo" | "Wallet" | "Tickets">>
  Profile: "AccountInfo" | "Wallet" | "Tickets"
}

const UserSideBar = (props: Props) => {
  return (
    <div className={Container}>
      <div className={ProfilePicter}>
        <p className={PorfilePictureText}>MS</p>
      </div>
      <p className={ProfileName}>Mohamed Salem</p>

      <ul className={ProfileListNavContainer}>
        <li className={classNames({ "bg-gray-200": props.Profile === "AccountInfo" })} onClick={() => props.Setter("AccountInfo")}>
          <p className={ProfileNavItem}>AccountInfo</p>
        </li>
        <li className={classNames({ "bg-gray-200": props.Profile === "Wallet" })} onClick={() => props.Setter("Wallet")}>
          <p className={ProfileNavItem}>Wallet</p>
        </li>
        <li className={classNames({ "bg-gray-200": props.Profile === "Tickets" })} onClick={() => props.Setter("Tickets")}>
          <p className={ProfileNavItem}>Tickets</p>
        </li>

      </ul>
    </div>
  )
}

export default UserSideBar

const Container = classNames("w-[20vw] h-[100vh] border-2 border-gray-300 flex flex-col items-center ");
const ProfilePicter = classNames("w-[100px] h-[100px] rounded-full bg-canadian-red  mt-3 flex justify-center items-center")
const PorfilePictureText = classNames("text-4xl text-white font-bold ")
const ProfileName = classNames("mb-5 mt-2 text-2xl font-bold")
const ProfileListNavContainer = classNames("flex flex-col gap-4 w-full")
const ProfileNavItem = classNames("text-lg py-1 px-3 cursor-pointer")

