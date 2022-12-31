import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import TextBox from '../shared/textbox/TextBox';
import { AiFillPlusCircle } from 'react-icons/ai';
import MainButton from '../shared/button/MainButton';
import axios from 'axios';

type Props = {
  Type: "Report" | "Refund",
  ShowOnly?: boolean,
}

const RequestComp = (props: Props) => {

  const [ReportType, setReportType] = React.useState("Technical");
  const [Description, setDescription] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [ShowFollowUp, setShowFollowUp] = React.useState(false);

  let DescriptionRef = React.useRef<HTMLTextAreaElement>(null);

  function handleReportTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setReportType(e.target.value)
  }
  //when submit we check if the type report then we call the report api sending the type of problem and the description
  //if the type is refund we call the refund api sending the description
  async function handleSubmit() {

    SetLoading(true)
    if (props.Type == 'Report') {
      // console.log(ReportType, Description)
      await axios.post("http://localhost:5000/user/reportProblem", {
        userID: "63a59b15f928fa951091f381",
        courseID: "63a59c15e3b96b22a1dc828a",
        type: ReportType,
        body: DescriptionRef.current?.value || ""
      })

      //call report api
    } else {
      //call refund api
      await axios.post('http://localhost:5000/user/requestCourse', {
        userID: "63a59b15f928fa951091f381",
        courseID: "63a59c15e3b96b22a1dc828a",
        request: "Refund",
        body: DescriptionRef.current?.value || ""
      })

    }
    setIsSubmitted(true)
    SetLoading(false)
  }


  useEffect(() => {
    setIsSubmitted(false)


  }, [props.Type])


  return (

    <div className={Container} >
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


      </div> :
        <div >
          <h1 className={title}>{props.Type == 'Report' ? !props.ShowOnly ? "Report a problem" : 'Your Report' : "Refund"}</h1>
          {props.Type == 'Report' &&
            <div className={OptionsCont}>
              <p className={OptionLabel}>Type of problem </p>
              <select disabled={props.ShowOnly} value={ReportType} onChange={handleReportTypeChange} className={SelectorContainer}>
                <option className={Options} value="Technical">Technical</option>
                <option className={Options} value="Financial">Financial</option>
                <option className={Options} value="other">other</option>
              </select>
            </div>
          }

          <TextBox ShowOnly={props.ShowOnly} Ref={DescriptionRef} placeHolder={props.Type == "Refund" ? "Reason of Refund.." : "Report your problem.."} ></TextBox>

          <MainButton Size='full' HandleClick={handleSubmit} Loading={Loading} btnText={"Submit"}></MainButton>

          {ShowFollowUp && <TextBox Text='Follow up...' ></TextBox>
          }
        </div>
      }
    </div>


  )
}

export default RequestComp
const Container = classNames(" max-w-md pb-18 pt-4 px-5 nv:shadow-md nv:border-1.5 my-6 md:rounded-lg mx-auto")
const title = classNames('font-bold text-center text-2xl');
const OptionsCont = classNames("md:flex md:space-x-6 text-sm items-center mb-10 text-gray-700 mt-4")
const OptionLabel = classNames("w-1/2 mb-2 md:mb-0")
const Options = classNames("hover:bg-canadian-red")
const SelectorContainer = classNames("w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-gray-500")
const FormButton = classNames(" w-full rounded-md bg-canadian-red shadow-lg  text-white px-4 py-2 hover:bg-calm-red mt-8 text-center font-semibold focus:outline-none ")

const CreateNote = classNames("w-[80%] ml-auto mr-auto mt-4 border-2  border-gray-800 rounded-lg p-2 cursor-pointer flex items-center justify-between hover:bg-gray-300")
const CreateNoteText = classNames("text-gray-400 ml-5 text-lg")