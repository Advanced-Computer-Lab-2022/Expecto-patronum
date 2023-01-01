import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import SectionTitle from './SectionTitle'

import { Profile } from './UserProfile'

type Props = {
  data: Profile | undefined
}

const Wallet = (props: Props) => {
  const [Type, setType] = React.useState<"Wallet" | "Card">("Wallet")
  return (

    <div>
      <SectionTitle Title="Your Wallet" SubTitle="View your Wallet amount"></SectionTitle>
      <div className={TabsContainer}>
        <div onClick={() => { setType("Wallet") }} className={Tab + " " + " border-r-2 border-b-0 border-gray-500 " + " " + (Type === 'Wallet' && TabClicked)}>
          <p className={Tabitem}>Wallet</p>
        </div>
        <div onClick={() => { setType("Card") }} className={Tab + " " + (Type === 'Card' && TabClicked)}>
          <p className={Tabitem}>Cards</p>
        </div>

      </div>
      {Type === "Wallet" ? <div>
        <p className='text-3xl mt-10 ml-10'>Wallet:{props.data?.wallet}</p>
      </div> : props.data?.paymentMethods?.map((paymentMethod) => {
        return (
          <div className='flex items-center  justify-around bg-white w-full rounded-lg shadow-md py-4'>
            <div className='w-10  h-10 relative' >
              <Image fill className='object-contain' alt="" src={'/images/Visa.png'}></Image>
            </div>
            <p>**** **** **** {paymentMethod.last4}</p>
            <p>Expires on {paymentMethod.expiration}</p>
            <button className='text-canadian-red font-bold'>Remove</button>
          </div>
        )

      })
      }
      {props.data?.paymentMethods.length === 0 && Type === "Card" && <div className='flex items-center justify-center w-full h-96'>
        <p className='text-2xl font-bold'>No Cards Added</p>
      </div>}



    </div>
  )
}

export default Wallet
const TabsContainer = classNames("flex w-[100%]  justify-between h-[7vh]   mb-10 rounded-b-lg");
const Tab = classNames("flex items-center border-b-4  w-1/2 justify-center  shadow-lg   border-transparent cursor-pointer transition-all   hover:bg-gray-200  ")
const Tabitem = classNames("text-black text-lg font-bold ")
const TabClicked = classNames("bg-gray-300 shadow-sm ")