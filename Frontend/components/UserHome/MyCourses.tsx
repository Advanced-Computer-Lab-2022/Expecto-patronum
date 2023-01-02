import classNames from 'classnames'
import React, { useEffect } from 'react'
import ProgressBar from '../shared/progress/ProgressBar'
import BigRating from '../shared/rating/BigRating'
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import Image from 'next/image';
import UserCourseCard from './UserCourseCard';
import CompPagination from '../shared/pagination/CompPagination';
import axios from 'axios';
import { UserCourseDataInterface } from '../../Interface/NotPurchasedCourse/UserCourseDataInterface';
import Spinner from '../shared/spinner/Spinner';
import { useQuery } from 'react-query';
import ErrorComp from '../shared/Error/ErrorComp';
import { ApiUrl } from '../../constants/constants';
import { useRouter } from 'next/router';
import { AllCourseDataMiniInterface } from '../../Interface/PurchasedCourse/AllCourseDataMiniInterface';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';



type Props = {}

const MyCourses = (props: Props) => {



  const [Loading, SetLoading] = React.useState(true);
  const [Courses, SetCourses] = React.useState<AllCourseDataMiniInterface[]>([]);
  const [Error, SetError] = React.useState({ hasError: false, Message: '' });
  let router = useRouter();


  function handleCourseClick(CourseID: string) {

    const encryptId = (str: string | CryptoJS.lib.WordArray) => {
      const ciphertext = AES.encrypt(str, 'secretPassphrase');
      return encodeURIComponent(ciphertext.toString());
    }
    const encryptedId = encryptId(CourseID);
    router.push(`/User/UserCourse/${encryptedId}`)
    SetLoading(true);
  }


  useEffect(() => {
    async function GetData() {
      try {
        SetLoading(true);
        const res = await axios.get(`${ApiUrl}/User/viewMyCourses`, { withCredentials: true })
        SetCourses(res.data);
        SetLoading(false);
        console.log(res.data)

      } catch (error) {
        //@ts-ignore
        SetError({ hasError: true, Message: error + "" })
        SetLoading(false);

      }
    }
    GetData();

  }, [])


  if (Error.hasError) {
    return <ErrorComp ErrorMessage={Error.Message}></ErrorComp>
  }

  if (Loading) {
    return <Spinner></Spinner>
  }


  return (
    <div className='min-h-[50vh] mt-5'>
      {Courses.length === 0 && <div className="text-center h-[50vh]  text-2xl font-bold  mt-16">No Courses Found</div>}
      {Courses.map((course, index) => {
        return (
          <UserCourseCard handleCourseClick={(CourseID: string) => { handleCourseClick(CourseID) }} key={index} course={course}></UserCourseCard>
        )
      })}

    </div>


  )
}

export default MyCourses

const MyCourseCard = classNames(`ml - auto mr - auto w - [80 %] flex p - 2 shadow - md gap - 8 items - center mb - 10 rounded - xl bg - white cursor - pointer hover: shadow - lg transition duration - 300 ease -in -out`)

const ImageColorBox = classNames(`px - 2 bg - All rounded - xl`)
const ImageContainer = classNames(`w - 32`)

const TextBox = classNames('border-r-2 w-2/4')
const CardTitle = classNames("text-xl font-bold line-clamp-1 w-4/5")
const CardDescription = classNames("text-md line-clamp-2 w-4/5 mt-2")


const StartCourse = classNames("font-bold")
const ProgressContainer = classNames("px-4  w-1/4")
const ProgressContainerZero = classNames("w-1/4 flex justify-center ")


