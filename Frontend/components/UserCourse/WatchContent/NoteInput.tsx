import classNames from 'classnames'
import React from 'react'
import { FiDownload } from 'react-icons/fi';


type Props = {
  disabled?: boolean
  Time: { hours: number, minutes: number, seconds: number }
  generatePdf: (notes: string[]) => void
  text?: string
  Written?: boolean
}

const NoteInput = (props: Props) => {
  const [wordCountNumber, setWordCountNumber] = React.useState(1000);
  const [NoteText, setNoteText] = React.useState("");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWordCountNumber(1000 - e.target.value.length)
    setNoteText(e.target.value);
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
        <textarea disabled={props.disabled || props.Written} maxLength={1000} className={NoteInputText} placeholder={"Add your Note.."}
          onChange={(e) => { handleChange(e) }}>
          {props.text ? props.text : ""}
        </textarea>
        {!props.disabled && !props.Written && <p className={WordCount}>{wordCountNumber}</p>}
        <button onClick={() => props.generatePdf(props.Written && props.text ? [props.text] : [NoteText])} className={NoteInputButton}><FiDownload /></button>

      </div >

    </div>
  )
}

export default NoteInput

const NoteInputContainer = classNames("flex items-start gap-4 w-[80%] ml-auto relative mr-auto mt-4");
const TimeStamp = classNames(" text-white text-sm  flex justify-center items-center bg-gray-800 px-2 py-2 rounded-full cursor-pointer");
const NoteInputText = classNames("w-full max-h-64  min-h-[5rem]  bg-white border  border-gray-800 rounded-lg p-2 ");
const WordCount = classNames("absolute bottom-1 text-gray-400 z-20 right-14");
const NoteInputButton = classNames("text-white text-sm  flex justify-center items-center bg-canadian-red px-2 py-2 rounded-full cursor-pointer");
