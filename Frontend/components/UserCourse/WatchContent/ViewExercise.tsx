import classNames from 'classnames'
import { AES } from 'crypto-js';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import DataContext from '../../../context/DataContext';
import MainButton from '../../shared/button/MainButton';

type Props = {
  CourseID: string;
}

const ViewExercise = (props: Props) => {
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);
  const [Loading, SetLoading] = React.useState(false);
  const router = useRouter();

  function HandleClick() {

    SetLoading(true);
    console.log(ContentChoosen)
    console.log("///////////////////////////////////////////")
    console.log(props.CourseID)

    const encryptId = (str: string | CryptoJS.lib.WordArray) => {
      const ciphertext = AES.encrypt(str, 'secretPassphrase');
      return encodeURIComponent(ciphertext.toString());
    }
    const encryptedExerciseID = encryptId(ContentChoosen.ContentID);
    const encryptedCourseID = encryptId(props.CourseID);


    router.push(`/User/TakeExam?CourseID=${encryptedCourseID}&&ExerciseID=${encryptedExerciseID}`).then(() => {
      SetLoading(false)

    })
  }

  return (
    <div className={ExerciseContainer}>
      <div className={Exercise}>
        <p >Html and Css</p>
        {/* <p className='mt-2 text-gray-500'>Previous Score :5/10</p> */}
        {/* <button className={FormButton}>Solve Exercise</button> */}
        <MainButton Size='md' btnText='Solve Exercise' Loading={Loading} HandleClick={HandleClick}></MainButton>

        {/* <button className={FormButton}>Solve it again</button> */}

      </div>
    </div>
  )
}

export default ViewExercise
const FormButton = classNames("w-full bg-canadian-red shadow-lg  text-white px-4 py-2 hover:bg-calm-red mt-8 text-center font-semibold focus:outline-none ")
const ExerciseContainer = classNames("h-[70vh] flex justify-center items-center");
const Exercise = classNames("border-2 rounded-md border-gray-800 p-20 flex flex-col items-center justify-center ");