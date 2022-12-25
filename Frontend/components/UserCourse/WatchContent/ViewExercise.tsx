import classNames from 'classnames'
import React from 'react'

type Props = {}

const ViewExercise = (props: Props) => {
  return (
    <div className={ExerciseContainer}>
      <div className={Exercise}>
        <p >Html and Css</p>
        {/* <p className='mt-2 text-gray-500'>Previous Score :5/10</p> */}
        <button className={FormButton}>Solve Exercise</button>

        {/* <button className={FormButton}>Solve it again</button> */}

      </div>
    </div>
  )
}

export default ViewExercise
const FormButton = classNames("w-full bg-canadian-red shadow-lg  text-white px-4 py-2 hover:bg-calm-red mt-8 text-center font-semibold focus:outline-none ")
const ExerciseContainer = classNames("h-[70vh] flex justify-center items-center");
const Exercise = classNames("border-2 rounded-md border-gray-800 p-20 flex flex-col items-center justify-center ");