import classNames from 'classnames'
import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'
import AccountInfo from './AccountInfo'
import Tickets from './Tickets'
import UserSideBar from './UserSideBar'
import Wallet from './Wallet'

type Props = {}

const UserProfile = (props: Props) => {
  const { Profile, SetProfile } = useContext(DataContext);

  return (
    <div className={Container}>
      <UserSideBar Setter={SetProfile} Profile={Profile}></UserSideBar>
      <div className={ProfileInfoContainer}>
        {
          Profile === 'AccountInfo' ? <AccountInfo></AccountInfo> :
            Profile === 'Wallet' ? <Wallet></Wallet> :
              Profile === 'Tickets' ? <Tickets></Tickets> :
                <div>404</div>
        }

      </div>


    </div>
  )
}

export default UserProfile

const Container = classNames("w-[80%] mr-auto ml-auto flex");
const ProfileInfoContainer = classNames("br-2 border-2 w-[60vw] border-gray-300 border-l-0 ");

