import React, { ReactElement, useContext, useRef, useState } from 'react';
import Input from '../../Input/Input';
import Choice from '../Choice/Choice';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { QuestionCount } from "../Exercise";

type Props = {}


const Question = React.forwardRef((props: Props, ref) => {

  const [numberOfChoices, setNumberOfChoices] = useState<number>(2);
  const [choices, setChoices] = useState<Array<ReactElement>>([<Choice key={numberOfChoices-1} />, <Choice key={numberOfChoices} />]);
  const maxChoicesRef = useRef<HTMLLabelElement>(null);
  const [visible, setVisible] = useState(true);
  const {numberOfQuestions} = useContext(QuestionCount);
  const {setNumberOfQuestions} = useContext(QuestionCount);

  function generateChoice() {
    if(choices.length === 4) {
      displayErrorMessage("You have reached the maximum number of choices.");
      return;
    }
    setChoices([...choices, <Choice key={numberOfChoices+1} />]);
    setNumberOfChoices(numberOfChoices+1);
  }

  function removeChoice() {
    if(numberOfChoices > 2) {
      const newChoices = choices.filter(item => item.key !==  numberOfChoices.toString());
      setNumberOfChoices(numberOfChoices-1);
      setChoices(newChoices);
    } else {
      displayErrorMessage("A question can have at least 2 choices.");
    }
  }

  function displayErrorMessage(message: string) {
    if(maxChoicesRef.current != null){
      maxChoicesRef.current.innerText = message;
      maxChoicesRef.current.style.opacity = "initial";
      maxChoicesRef.current.style.display = "initial";
      setTimeout(() => {
        if(maxChoicesRef.current != null){
          maxChoicesRef.current.style.opacity = "0%";
          maxChoicesRef.current.style.transition = "all 2s linear";
        }
      }, 5000)

      setTimeout(() => {
        if(maxChoicesRef.current != null)
          maxChoicesRef.current.style.display = "none";
      }, 7200)
    }
  }

  const removeElement = () => {
    if(numberOfQuestions === 1) {
      displayErrorMessage("An exercise can have at least one question.");
      return;
    }
    setNumberOfQuestions(numberOfQuestions - 1);
    setVisible((prev) => !prev);
  };


  if(!visible) {
    return (<></>);
  } else {
    return (
      <div className='text-center' ref={ref as any}>
          <div className='flex items-center text-center'>
            <button type='button' onClick={removeElement} className='text-white mt-3 mx-1 rounded-md bg-slate-600 p-2'><AiOutlineMinus /></button>
            <Input placeholder='Question' inputDivStyle='col w-screen pb-0' />
          </div>
          <div className='flex'>
            <button type='button' onClick={generateChoice} className='hover:text-searchFocus ml-14 mt-1 text-navlink-bg block text-xs'>Add Choice</button>
            <button type='button' onClick={removeChoice} className='hover:text-searchFocus ml-14 mt-1 text-navlink-bg block text-xs'>Remove Choice</button>
          </div>
          {choices}
          <br />
          <label className='text-red-700' ref={maxChoicesRef}></label>
      </div>
    )
  }
})

export default Question;