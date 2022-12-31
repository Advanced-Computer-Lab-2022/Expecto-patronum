import classNames from 'classnames'
import React from 'react'

type Props = {
  ShowOnly?: boolean,
  Text?: string,
  HideLabel?: boolean
  Ref?: React.RefObject<HTMLTextAreaElement>
  placeHolder?: string
  TextBoxClassName?: string
  LabelTitle?: string


}

const TextBox = (props: Props) => {
  const [wordCountNumber, setWordCountNumber] = React.useState(1000);
  const [Description, setDescription] = React.useState(props.Text || "");
  console.log(Description)
  let textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWordCountNumber(1000 - e.target.value.length)
    setDescription(e.target.value)
  }
  return (
    <div className={DescContainer}>
      {!props.HideLabel && <label htmlFor="description" className={DescLabel}>{props.LabelTitle || "Description"}</label>}
      <div className='relative'>
        <textarea autoFocus required ref={props.Ref || textAreaRef} disabled={props?.ShowOnly} style={{ 'resize': 'none', 'overflow': 'auto' }} maxLength={1000} value={Description} className={ReportForm} placeholder={props.placeHolder}
          onChange={(e) => { handleChange(e) }}>
        </textarea>
        {!props.ShowOnly && <p className={WordCount}>{wordCountNumber}</p>}
      </div>
    </div>
  )
}

export default TextBox
const DescContainer = classNames("text-sm flex flex-col mt-2 ")
const DescLabel = classNames("font-bold mb-2")
const WordCount = classNames("absolute text-xs bottom-2 text-gray-400 z-20 right-5");
const ReportForm = classNames("appearance-none w-full border rounded-md border-gray-600 p-2 max-h-80 min-h-[6rem] h-22 focus:outline-none focus:border-gray-500");
