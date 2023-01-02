import classNames from 'classnames'
import React from 'react'
import Status from './Status'
import { ReqRepInterface } from './Tickets'

type Props = {
  data: ReqRepInterface
  index: number
  Type: "Reports" | "Requests"
  setShowDetails: (value: boolean) => void
  setChoosen: (value: ReqRepInterface) => void
  setFollowupPressed: (value: boolean) => void

}


const TicketCard = (props: Props) => {

  function handleClick() {
    if (props.Type == "Reports") {
      props.setShowDetails(true);
      props.setChoosen(props.data);
    }


  }
  return (
    <tr onClick={handleClick} className={TableRowContainer} >
      <td className={TableDataItem}>
        {props.data.courseTitle}
      </td>
      <td className={TableDataItem}>
        {props.data.startDate.split("T")[0]}
      </td>
      <td className={TableDataItem}>
        {props.data.type}
      </td>
      <td
        className={TableDataItem}

      >
        <Status rounded status={props.data.status.toLocaleLowerCase()}></Status>
      </td>
      {props.Type == "Reports" ? <td className={TableDataItem}>
        {props.data.status.toLocaleLowerCase() === 'resolved' ? "" : <button onClick={() => { props.setFollowupPressed(true) }} className={Button}>Follow Up</button>}
      </td> : <td><div className='bg-white'></div></td>

      }

    </tr>
  )
}

export default TicketCard
const TableRowContainer = classNames('cursor-pointer w-full hover:bg-red-100 transform transition duration-300 ease-in-out')
const TableDataItem = classNames("px-6 py-4 whitespace-nowrap text-sm text-gray-500 ")
const Pending = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800")
const Resolved = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800")
const Unseen = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800")
const Button = classNames("w-15 h-10 flex justify-center py-2 px-4 border-2 rounded-md shadow-sm text-medium font-medium text-white bg-canadian-red  hover:bg-calm-red ")
