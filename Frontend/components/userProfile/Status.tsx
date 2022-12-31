import classNames from 'classnames'
import React from 'react'

type Props = {
  status: string
  rounded: boolean
}

const Status = (props: Props) => {
  return (

    <span
      className={"px-2 py-1" + " " + (props.rounded ? "rounded-full" : "rounded-b-md") + " " + (props.status.toLocaleLowerCase() == "pending" ?
        Pending : props.status.toLocaleLowerCase() == "resolved" || props.status.toLocaleLowerCase() == "accepted" ? Resolved : Unseen)}
    >
      {props.status.toLocaleLowerCase()}
    </span>
  )
}

export default Status

const Pending = classNames(" bg-yellow-100 text-yellow-800 ")
const Resolved = classNames(" bg-green-100 text-green-800")
const Unseen = classNames("bg-red-100 text-red-800")