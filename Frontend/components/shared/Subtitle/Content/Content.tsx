import React, { useContext, useRef, useState } from 'react';
import Input from '../../Input/Input';
import { AiOutlineMinus } from "react-icons/ai";
import { ContentCount } from "../Subtitle";

type Props = {}


const Content = React.forwardRef((props: Props, ref) => {

  const maxContentsRef = useRef<HTMLLabelElement>(null);
  const descriptionRef = useRef<any>();
  const [visible, setVisible] = useState(true);
  const {numberOfContents, setNumberOfContents} = useContext(ContentCount);

  function displayErrorMessage(message: string) {
    if(maxContentsRef.current != null){
      maxContentsRef.current.innerText = message;
      maxContentsRef.current.style.opacity = "initial";
      maxContentsRef.current.style.display = "initial";
      setTimeout(() => {
        if(maxContentsRef.current != null){
          maxContentsRef.current.style.opacity = "0%";
          maxContentsRef.current.style.transition = "all 2s linear";
        }
      }, 5000)

      setTimeout(() => {
        if(maxContentsRef.current != null)
          maxContentsRef.current.style.display = "none";
      }, 7200)
    }
  }

  const removeElement = () => {
    if(numberOfContents === 1) {
      displayErrorMessage("The subtitle section can have at least one subtitle.");
      return;
    }
    setNumberOfContents(numberOfContents - 1);
    setVisible((prev) => !prev);
  };


  if(!visible) {
    return (<></>);
  } else {
    return (
        <div className='text-center'>
            <div className='flex items-center text-center'>
                <button type='button' onClick={removeElement} className='text-white mt-3 mx-1 rounded-md bg-slate-600 p-2'><AiOutlineMinus /></button>
                <Input inputDivStyle='col w-screen pb-0' placeholder='Subtitle Heading' />
            </div>
            <Input placeholder='Title' inputDivStyle='px-4' />
            <Input type='textarea' placeholder='Description' ref={descriptionRef} style="h-24" inputDivStyle='px-4' />
            <div className='fluid-container nv:flex px-0 mx-3'>
                <Input placeholder='Video URL' inputDivStyle='col-12' />
                <div className='row nv-max:px-3'>
                  <Input type='number' placeholder='Duration' inputDivStyle='col-6' />
                  <Input type='checkbox' placeholder='Allow Preview?' inputDivStyle='col-6 nv:ml-6' />
                </div>
            </div>
            <br />
            <label className='text-red-700' ref={maxContentsRef}></label>
        </div>
    )
  }
})

export default Content;