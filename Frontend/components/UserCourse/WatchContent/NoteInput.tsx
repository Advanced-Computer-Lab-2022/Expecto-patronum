import classNames from 'classnames'
import React from 'react'

type Props = {
  disabled?: boolean
  Time: { hours: number, minutes: number, seconds: number }
}

const NoteInput = (props: Props) => {
  const [wordCountNumber, setWordCountNumber] = React.useState(1000);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWordCountNumber(1000 - e.target.value.length)
  }





  return (
    <div>
      <div className={NoteInputContainer}>
        <div className={TimeStamp}>
          <p>{
            props.Time.hours > 0 ? (props.Time.hours > 10 ? props.Time.hours : "0" + props.Time.hours + ":") : "" +
              (props.Time.minutes > 10 ? props.Time.minutes : "0" + props.Time.minutes) + ":" +
              (props.Time.seconds > 10 ? props.Time.seconds : "0" + props.Time.seconds)}</p>
        </div>
        <textarea disabled={props.disabled} maxLength={1000} className={NoteInputText} placeholder={"Add your Note.."}
          onChange={(e) => { handleChange(e) }}>
        </textarea>
        {!props.disabled && <p className={WordCount}>{wordCountNumber}</p>}

      </div >

    </div>
  )
}

export default NoteInput

const NoteInputContainer = classNames("flex items-start gap-4 w-[80%] ml-auto relative mr-auto mt-4");
const TimeStamp = classNames(" text-white text-sm  flex justify-center items-center bg-gray-800 px-2 py-2 rounded-full cursor-pointer");
const NoteInputText = classNames("w-full max-h-64  min-h-[5rem]  border  border-gray-800 rounded-lg p-2 ");
const WordCount = classNames("absolute bottom-2 text-gray-400 z-20 right-5");
