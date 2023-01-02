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
  const { ContentChoosen, SetContentChoosen, SolvedExercises } = React.useContext(DataContext);
  const [Loading, SetLoading] = React.useState(false);
  const [Solved, SetSolved] = React.useState({ Flag: false, Grade: 0 });
  const router = useRouter();
  //Check if the Content id is in the SolvedExercises array

  useEffect(() => {
    for (let i = 0; i < SolvedExercises.length; i++) {
      if (SolvedExercises[i].excerciseID === ContentChoosen.ContentID) {
        SetSolved({ Flag: true, Grade: SolvedExercises[i].grade });
      }
    }
  }, [])


  async function HandleViewAgain() {
    SetLoading(true);

    const encryptId = (str: string | CryptoJS.lib.WordArray) => {
      const ciphertext = AES.encrypt(str, 'secretPassphrase');
      return encodeURIComponent(ciphertext.toString());
    }
    const encryptedExerciseID = encryptId(ContentChoosen.ContentID);
    const encryptedCourseID = encryptId(props.CourseID);
    await router.push(`/User/SubmittedExam?courseID=${encryptedCourseID}&&exerciseID=${encryptedExerciseID}`)
    SetLoading(false)

  }

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
        {!Solved.Flag ? <div>
          <p >Html and Css</p>
          <MainButton Size='md' btnText='Solve Exercise' Loading={Loading} HandleClick={HandleClick}></MainButton>
        </div> :
          <div className='flex flex-col  justify-center items-center'>
            <p className='mt-2 text-gray-500 mb-2'>Previous Score: {Solved.Grade}% </p>
            <MainButton Size='md' btnText='Solve it again' Loading={Loading} HandleClick={HandleClick}></MainButton>
            <p onClick={HandleViewAgain} className='text-canadian-red cursor-pointer mt-4 font-bold underline text-xs'>View your Answers</p>

          </div>}


      </div>
    </div>
  )
}

export default ViewExercise
const FormButton = classNames("w-full bg-canadian-red shadow-lg  text-white px-4 py-2 hover:bg-calm-red mt-8 text-center font-semibold focus:outline-none ")
const ExerciseContainer = classNames("h-[70vh] flex justify-center items-center");
const Exercise = classNames("border-2 rounded-md border-gray-800 p-20 flex flex-col items-center justify-center ");