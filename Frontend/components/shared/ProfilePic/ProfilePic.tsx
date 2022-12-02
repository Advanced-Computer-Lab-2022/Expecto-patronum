import classNames from 'classnames'
import React from 'react'

type Props = {
  FirstName: string,
  LastName: string,
  Size: "small" | "medium" | "large",
}

const ProfilePic = (props: Props) => {
  let FirstNameUpper = props.FirstName.toUpperCase()
  let LastNameUpper = props.LastName.toUpperCase()
  let Name = FirstNameUpper[0] + LastNameUpper[0];
  return (
    <div className={Container + " " + (props.Size == 'small' ? Small : props.Size == 'medium' ? Medium : Large)}>
      <p className={PorfilePictureText}>{Name}</p>
    </div>)
}

export default ProfilePic
const Container = classNames("rounded-full bg-dark-gray pt-1 pl-[1px]  flex justify-center items-center")
const Small = classNames("  w-10 h-10 text-md")
const Medium = classNames("w-[100px] h-[100px] text-4xl")
const Large = classNames("w-[150px] h-[150px]")
const PorfilePictureText = classNames("text-white font-bold ")
