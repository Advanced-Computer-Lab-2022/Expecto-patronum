import classNames from 'classnames'
import React, { useState } from 'react'
import TextBox from '../shared/textbox/TextBox'
import SectionTitle from './SectionTitle'
import { AiFillPlusCircle } from 'react-icons/ai';
import MainButton from '../shared/button/MainButton';
import { ReqRepInterface } from './Tickets';
import { IoIosArrowRoundBack } from 'react-icons/io';
import axios from 'axios';

type Props = {
  data: ReqRepInterface,
  SetBack: () => void

}

const TicketDetails = (props: Props) => {
  const [ShowFollowUp, SetShowFollowUp] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const FollowUpRef = React.createRef<HTMLTextAreaElement>();

  function handleClick() {
    SetShowFollowUp(true)
  }
  async function HandleFollowBack() {

    const value = FollowUpRef.current?.value || "";
    setLoading(true);
    console.log(props.data._id)
    try {
      await axios.put("http://localhost:5000/user/followUpOnProblem", {
        problemID: props.data._id,
        followUp: FollowUpRef.current?.value || ""
      })


      props.data.comment.push(value);
      SetShowFollowUp(false)
      setLoading(false);



    } catch (err) {
      console.log(err)

    }


    //call follow up api



  }
  return (

    <div className='relative'>
      <div onClick={props.SetBack} className="flex absolute items-center left-10 cursor-pointer"><IoIosArrowRoundBack></IoIosArrowRoundBack><p>Back</p></div>

      <div className={Container}>

        <div
          className={"absolute top-0 right-0 w-18 h-8 shadow-md cursor-pointer ease-in duration-300 hover:shadow-sm flex items-center justify-center rounded-b-lg" + " " + (props.data.status == "Pending" ? Pending : props.data.status == "Resolved" ? Resolved : Unseen)}
        >
          {props.data.status}
        </div>

        <div className={OptionsCont}>
          <p className={OptionLabel}>Type of problem </p>
          <select disabled className={SelectorContainer}>
            {props.data.status == "Pending" ?
              <option className={Options} value="Technical" selected>Technical</option> :
              <option className={Options} value="Technical" >Technical</option>}
          </select>
        </div>
        <TextBox ShowOnly={true} Text={props.data.body} ></TextBox>
        <div>
          {props.data.comment.map((item, index) => {
            return (
              <div className="mt-4" key={index}>
                <TextBox ShowOnly Text={item} LabelTitle={"Follow Up" + " ." + index} ></TextBox>
              </div>
            )

          })}

        </div>

        {
          !ShowFollowUp &&
          <div onClick={handleClick} className={CreateFollowUp}>
            <p className={CreateNoteText}>Follow up</p>
            <AiFillPlusCircle fontSize={20} ></AiFillPlusCircle>
          </div>
        }
        {
          ShowFollowUp &&
          <div>
            <div className="mt-4">
              <TextBox Ref={FollowUpRef} LabelTitle="Follow Up" ></TextBox>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => { SetShowFollowUp(false) }} className="font-bold ">Cancel</button>
              <MainButton btnText="Save" Loading={Loading} HandleClick={HandleFollowBack} Size="sm"></MainButton>

            </div>

          </div>


        }

      </div>
    </div >
  )
}

export default TicketDetails

// const CreateNote = classNames("w-[80%] ml-auto mr-auto mt-4 border-2  border-gray-800 rounded-lg p-2 cursor-pointer flex items-center justify-between hover:bg-gray-300")
// const CreateNoteText = classNames("text-gray-400 ml-5 text-lg")
const Container = classNames("bg-white max-w-md  pb-24 px-5  pt-10 relative rounded-lg mt-4 mx-auto")
const OptionsCont = classNames("md:flex md:space-x-6 text-sm items-center mb-10 text-gray-700 mt-4")
const OptionLabel = classNames("w-1/2 mb-2 md:mb-0")
const Options = classNames("hover:bg-canadian-red")
const SelectorContainer = classNames("w-full rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-gray-500")
const CreateFollowUp = classNames("w-[80%] ml-auto mr-auto mt-4 border-2  border-gray-800 rounded-lg p-2 cursor-pointer flex items-center justify-between hover:bg-gray-300")
const CreateNoteText = classNames("text-gray-400 ml-5 text-lg")
const Pending = classNames(" bg-yellow-100 text-yellow-800")
const Resolved = classNames(" bg-green-100 text-green-800")
const Unseen = classNames("bg-red-100 text-red-800")