import axios from 'axios'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import DataContext from '../../../context/DataContext'
import Modal from '../Modal/Modal'
import BigRating from '../rating/BigRating'
import Spinner from '../spinner/Spinner'
import TextBox from '../textbox/TextBox'


type Props = {
  setOpen: (Open: boolean) => void
  CurrentRate: number
  SetCurrentRate: (Rate: number) => void
  Type: "instructor" | "course"
}

const RateModal = (props: Props) => {
  const [RateChange, setRateChange] = React.useState(0);
  const ReviewRef = React.useRef<HTMLTextAreaElement>(null)
  const { CourseChoosen, SetCourseChoosen, CurrentRatings, SetCurrentRatings } = React.useContext(DataContext);
  const [Loading, SetLoading] = React.useState(false)
  const [EditReview, SetEditReview] = React.useState(false)




  async function RateOnly() {
    if (props.CurrentRate === 0) return;
    if (props.Type === "instructor") {
      if (props.CurrentRate === CurrentRatings.yourInstructorRating) return
      console.log(props.CurrentRate);
      console.log(CurrentRatings.yourInstructorRating);
      console.log(CourseChoosen._id);
      console.log(CourseChoosen.instructorID);
      console.log("63a59b15f928fa951091f381");
      await axios.put("http://localhost:5000/user/giveInstructorRating", {
        rating: props.CurrentRate,
        oldRating: CurrentRatings.yourInstructorRating,
        courseId: CourseChoosen._id,
        instructorId: CourseChoosen.instructorID,
        userId: "63a59b15f928fa951091f381"
      })
      SetCurrentRatings({
        ...CurrentRatings,
        yourInstructorRating: props.CurrentRate
      })
    } else {
      if (props.CurrentRate === CurrentRatings.yourCourseRating) return
      let res = await axios.put("http://localhost:5000/user/giveCourseRating", {
        rating: props.CurrentRate,
        oldRating: CurrentRatings.yourCourseRating,
        courseId: CourseChoosen._id,
        userId: "63a59b15f928fa951091f381"
      })
      SetCurrentRatings({
        ...CurrentRatings,
        yourCourseRating: props.CurrentRate
      })

    }

  }

  async function RateAndReview() {
    if (ReviewRef.current === null) return
    if (props.Type === "instructor") {
      console.log("///")
      console.log(props.CurrentRate);
      console.log("///")
      if (props.CurrentRate === CurrentRatings.yourInstructorRating && ReviewRef.current.value === CurrentRatings.yourinstructorReview) return
      await axios.put("http://localhost:5000/user/giveInstructorReview", {
        rating: props.CurrentRate,
        oldReview: CurrentRatings.yourinstructorReview,
        courseId: CourseChoosen._id,
        userId: "63a59b15f928fa951091f381",
        review: ReviewRef.current.value,
        username: "mostafa",
        instructorId: CourseChoosen.instructorID
      })
      SetCurrentRatings({
        ...CurrentRatings,
        yourInstructorRating: props.CurrentRate,
        yourinstructorReview: ReviewRef.current.value
      })

    } else {

      if (props.CurrentRate === CurrentRatings.yourCourseRating && ReviewRef.current.value === CurrentRatings.yourCourseReview) return
      await axios.put("http://localhost:5000/user/giveCourseReview", {
        rating: props.CurrentRate,
        oldReview: CurrentRatings.yourCourseReview,
        courseId: CourseChoosen._id,
        userId: "63a59b15f928fa951091f381",
        review: ReviewRef.current.value,
        username: "mostafa",
      })
      SetCurrentRatings({
        ...CurrentRatings,
        yourCourseRating: props.CurrentRate,
        yourCourseReview: ReviewRef.current.value
      })
    }
  }



  async function HandleClick() {
    //Check if the review is empty or not
    //If empty w check the type of the rate modal
    //then we will send the rate to the backend
    //if not empty then we will do the same steps but we will call an api to send the review as well
    if (ReviewRef.current !== null) {
      SetLoading(true)
      if (ReviewRef.current.value === "") {
        await RateOnly();
      } else {
        await RateAndReview();
      }
    }
    SetLoading(false)
    props.setOpen(false);
    SetEditReview(false);
  }


  function HandleEdit() {
    SetEditReview(true)
  }



  return (
    <Modal SetOpen={props.setOpen} CloseBtn={true}>
      <div className={RateModalCont}>
        {EditReview ? <div>
          <p className={Title} >Why did you leave this rating?</p>
          <div>
            <p className={Subtitle}>
              {RateChange ?
                RateChange <= 0.5 ? "Awful, not what I expected at all" :
                  RateChange === 1 ? "Awful / Poor" :
                    RateChange === 1.5 ? "Poor, pretty disappointed" :
                      RateChange === 2 ? "Fair" :
                        RateChange === 2.5 ? "Poor / Average" :
                          RateChange === 3 ? "Average, could be better" :
                            RateChange === 3.5 ? "Average / Good" :
                              RateChange === 4 ? "Good, what I expected" :
                                RateChange === 4.5 ? "Good / Amazing" :
                                  RateChange === 5 ? "Amazing, above expectations!" : ""
                :
                props.CurrentRate <= 0.5 ? "Awful, not what I expected at all" :
                  props.CurrentRate === 1 ? "Awful / Poor" :
                    props.CurrentRate === 1.5 ? "Poor, pretty disappointed" :
                      props.CurrentRate === 2 ? "Fair" :
                        props.CurrentRate === 2.5 ? "Poor / Average" :
                          props.CurrentRate === 3 ? "Average, could be better" :
                            props.CurrentRate === 3.5 ? "Average / Good" :
                              props.CurrentRate === 4 ? "Good, what I expected" :
                                props.CurrentRate === 4.5 ? "Good / Amazing" :
                                  props.CurrentRate === 5 ? "Amazing, above expectations!" : ""}

            </p>
            <BigRating Hover={setRateChange} Setter={props.SetCurrentRate} RateAction={true} Rate={props.CurrentRate} size={50}></BigRating>
          </div>
          {/* <textarea ref={ReviewRef} placeholder='Your Review..' className={TextBox}></textarea> */}
          <TextBox Ref={ReviewRef} HideLabel={true}></TextBox>
          <div onClick={HandleClick} className={ButtonCont}>
            {Loading ? <div role="status">
              <svg aria-hidden="true" className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : <p>Save and Continue</p>
            }

          </div>
        </div> : <div className='flex flex-col items-start'>
          <h1 className='text-2xl font-bold mb-2 mt-2'>Your Review</h1>
          <BigRating Rate={props.Type === 'instructor' ? CurrentRatings.yourInstructorRating || 0 : CurrentRatings.yourCourseRating || 0} size={20} RateAction={false} ></BigRating>
          <div className='w-full'>
            <TextBox HideLabel={true} Text={props.Type === 'instructor' ? CurrentRatings.yourinstructorReview || "" : CurrentRatings.yourCourseReview || ""} ShowOnly={true} />
          </div>
          <div onClick={HandleEdit} className={ButtonCont}>
            <p>Edit Review</p>
          </div>

        </div>}



      </div>
    </Modal>

  )
}

export default RateModal

const RateModalCont = classNames("text-center py-10 bg-white w-[42vw] rounded-md h-[60vh] px-4");
const Title = classNames("text-2xl font-bold mb-4");
const Subtitle = classNames("text-md font-bold");
// const TextBox = classNames("max-h-64  min-h-[5rem] w-[40vw]  bg-white border  border-gray-800 rounded-lg p-2 ");
const ButtonCont = classNames("flex justify-center ml-auto items-center text-sm font-bold mt-2 py-3 px-1 w-1/4 cursor-pointer bg-canadian-red   rounded-md text-white hover:bg-calm-red");
