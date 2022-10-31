import React from 'react';
import Input from '../../../Input/Input';

type Props = {}

const SingleExercise = (props: Props) => {
  return (
    <div>
        <Input placeholder='Question' />
        <Input style='relative bottom-11 px-2 scale-75' type='radio' enum={["API", "Frontend", "Backend", "Compiler"]} />
        <label className='answer hidden'></label>
    </div>
  )
}

export default SingleExercise;