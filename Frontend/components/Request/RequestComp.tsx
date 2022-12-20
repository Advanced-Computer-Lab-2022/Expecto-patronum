import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
  Type: "Report" | "Refund"
}

const RequestComp = (props: Props) => {

  const [wordCountNumber, setWordCountNumber] = React.useState(1000);
  const [ReportType, setReportType] = React.useState("Technical");
  const [Description, setDescription] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWordCountNumber(1000 - e.target.value.length)
    setDescription(e.target.value)
  }
  function handleReportTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setReportType(e.target.value)
  }
  //when submit we check if the type report then we call the report api sending the type of problem and the description
  //if the type is refund we call the refund api sending the description
  function handleSubmit() {
    if (props.Type == 'Report') {
      console.log(ReportType, Description)
      //call report api
    } else {
      //call refund api
      console.log(Description)
    }
    setIsSubmitted(true)
  }



  return (

    <div className={Container}>
      {isSubmitted ? <div>

        <div className='w-30 h-30 relative ml-auto mr-auto mb-4'>
          <Image
            src="/images/Report.png"
            alt={"CGP"}
            fill
            quality={100}
            priority
          />
        </div>
        <p>We will Respond with in 3 to 5 working days</p>
        <p>Thank you for your patience.</p>

        <Link href='/User/Profile'>
          <button className={FormButton}>{props.Type === 'Report' ? "View My Reports" : "View my Refund State"}</button>

        </Link>


      </div> : <div>
        <h1 className={title}>{props.Type == 'Report' ? "Report a problem" : "Refund"}</h1>

        {props.Type == 'Report' &&
          <div className={OptionsCont}>
            <p className={OptionLabel}>Type of problem </p>
            <select value={ReportType} onChange={handleReportTypeChange} className={SelectorContainer}>
              <option className={Options} value="Technical" selected>Technical</option>
              <option className={Options} value="Financial">Financial</option>
              <option className={Options} value="other">other</option>
            </select>
          </div>
        }

        <div className={DescContainer}>
          <label htmlFor="description" className={DescLabel}>Description</label>
          <div className='relative'>
            <textarea maxLength={1000} value={Description} className={ReportForm} placeholder={props.Type == "Refund" ? "Reason of Refund.." : "Report your problem.."}
              onChange={(e) => { handleChange(e) }}>
            </textarea>
            <p className={WordCount}>{wordCountNumber}</p>
          </div>
        </div>
        <button onClick={handleSubmit} className={FormButton}>Submit</button>
      </div>}

    </div>


  )
}

export default RequestComp
const Container = classNames("bg-white max-w-md  pb-24 px-5  pt-10   md:rounded-lg md:my-18 mx-auto")
const title = classNames('font-bold text-center');
const OptionsCont = classNames("md:flex md:space-x-6 text-sm items-center text-gray-700 mt-4")
const OptionLabel = classNames("w-1/2 mb-2 md:mb-0")
const Options = classNames("hover:bg-canadian-red")
const SelectorContainer = classNames("w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-gray-500")
const DescContainer = classNames("text-sm flex flex-col mt-3")
const DescLabel = classNames("font-bold mt-4 mb-2")
const WordCount = classNames("absolute text-xs bottom-2 text-gray-400 z-20 right-5");
const ReportForm = classNames("appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500");
const FormButton = classNames(" w-full bg-canadian-red shadow-lg  text-white px-4 py-2 hover:bg-calm-red mt-8 text-center font-semibold focus:outline-none ")

