import React from 'react';
import Input from '../../../Input/Input';

type Props = {}

const Choice = (props: Props) => {
  return (
    <>
      <Input placeholder='Choice' inputDivStyle='w-6 h-fit inline-block col' />
      <input className='relative bottom-2 right-7' type="checkbox" name="choice" value="choice" />
    </>
  )
}

export default Choice;