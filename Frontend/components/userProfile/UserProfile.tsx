import axios from 'axios'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ApiUrl } from '../../constants/constants'
import DataContext from '../../context/DataContext'
import AccountInfo from './AccountInfo'
import Tickets from './Tickets'
import UserSideBar from './UserSideBar'
import Wallet from './Wallet'

type Props = {}

export interface Profile {
  username: string,
  _id: string,
  gender: string,
  firstname: string,
  lastname: string,
  email: string,
  role: string,
  wallet: number,
  paymentMethods: {
    last4: number,
    expiration: string,
    name: string,
    cardType: string
  }[]
}

const UserProfile = (props: Props) => {
  const [ProfileData, SetProfileData] = useState<Profile>()
  const [Error, SetError] = useState({ hasError: false, message: "" })

  useEffect(() => {
    async function GetData() {
      try {
        const res = await axios.get(`${ApiUrl}/User/viewProfile`, { withCredentials: true });
        SetProfileData(res.data)
      } catch (err) {
        //@ts-ignore
        if (err.response) {
          //@ts-ignore

          SetError({ hasError: true, message: err.response.data.message })
        } else {
          //@ts-ignore

          SetError({ hasError: true, message: err.message })
        }

      }
    }
    GetData()

  }, [])
  console.log(ProfileData);

  const { Profile, SetProfile } = useContext(DataContext);
  let router = useRouter();

  useEffect(() => {
    if (router.query) {
      if (router.query.Profile === 'AccountInfo') {
        SetProfile('AccountInfo')
      } else if (router.query.Profile === 'Wallet') {
        SetProfile('Wallet')
      } else if (router.query.Profile === 'Tickets') {
        SetProfile('Tickets')
      } else {
        SetProfile('AccountInfo')
      }
    }

  }, [])

  return (
    <div className={Container}>
      <UserSideBar Setter={SetProfile} Profile={Profile}></UserSideBar>
      <div className={ProfileInfoContainer}>
        {
          Profile === 'AccountInfo' ? <AccountInfo data={ProfileData}></AccountInfo> :
            Profile === 'Wallet' ? <Wallet data={ProfileData}></Wallet> :
              Profile === 'Tickets' ? <Tickets data={ProfileData}></Tickets> :
                <div>404</div>
        }

      </div>


    </div>
  )
}

export default UserProfile

const Container = classNames("w-[80%] mr-auto ml-auto flex");
const ProfileInfoContainer = classNames("br-2 border-2 w-[60vw] border-gray-300 border-l-0 ");

