import React from 'react';
import Input from '../../Input/Input';
import SingleExercise from './SingleExercise/SingleExercise';

type Props = {}

const Exercises = (props: Props) => {
  return (
    <div>
        <Input style='border-x-0 border-t-0 rounded-b-none bg-gray-600 opacity-20' labelStyle="bg-transparent" placeholder='Exercise Title' />
        <div id='exercises-section' className='h-48 border-2 rounded-lg mb-4 border-neutral-700 overflow-y-scroll'>
            <SingleExercise />
            <SingleExercise />
        </div>
    </div>
  )
}

export default Exercises;