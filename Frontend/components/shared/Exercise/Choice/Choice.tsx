import React, { useContext } from 'react';
import Input from '../../Input/Input';
import { ChoiceCount } from "../Question/Question";

type Props = {}

const Choice = (props: Props) => {

  const {numberOfChoices, setNumberOfChoices} = useContext(ChoiceCount);

  return (
    <div className='col-sm-6 col-md-3 h-16'>
      <Input placeholder='Choice' inputDivStyle='w-6 h-fit inline-block col-4' />
      <Input type='radio' inputDivStyle='relative bottom-26 left-12 scale-50' />
      {/* <input className='relative bottom-2 right-7' type="checkbox" name="choice" value="1" /> */}
    </div>
  )
}

export default Choice;