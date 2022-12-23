import classNames from 'classnames'
import React from 'react'

type Props = {
  report: {
    title: string
    date: string
    type: string
    status: string
    body: string
  }
  index: number

}

const TicketCard = (props: Props) => {
  return (
    <tr className={TableRowContainer} >
      <td className={TableDataItem}>
        {props.report.title}
      </td>
      <td className={TableDataItem}>
        {props.report.date}
      </td>
      <td className={TableDataItem}>
        {props.report.type}
      </td>
      <td
        className={TableDataItem}

      >
        <span
          className={props.report.status == "Pending" ? Pending : props.report.status == "Resolved" ? Resolved : Unseen}
        >
          {props.report.status}
        </span>
      </td>
      <td className={TableDataItem}>
        {props.report.status === 'Resolved' ? "" : <button className={Button}>Follow Up</button>}

      </td>
    </tr>
  )
}

export default TicketCard
const TableRowContainer = classNames('cursor-pointer hover:bg-red-100 transform transition duration-300 ease-in-out')
const TableDataItem = classNames("px-6 py-4 whitespace-nowrap text-sm text-gray-500 ")
const Pending = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800")
const Resolved = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800")
const Unseen = classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800")
const Button = classNames("w-15 h-10 flex justify-center py-2 px-4 border-2 rounded-md shadow-sm text-medium font-medium text-white bg-canadian-red  hover:bg-calm-red ")
