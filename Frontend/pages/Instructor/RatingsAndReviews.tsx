import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProgressBar from '../../components/shared/progress/ProgressBar'
import BigRating from '../../components/shared/rating/BigRating'
import Layout from './Layout'

type Props = {}

const RatingsAndReviews = (props: Props) => {

  const [ratings, setRatings] = useState<any>();
  const [reviews, setReviews] = useState<any>();
  
  const [totalRatings, setTotalRatings] = useState<any>();

  useEffect(() => {
    const getRatings = async () => {
      axios.defaults.withCredentials = true;
      await axios.get("http://localhost:5000/Instructor/viewInstructorRatingsAndReviews", {
        params: {
          instructorID: '63877fb65c8dac5284aaa3c2',
        },
      }).then((res: { data: any }) => {
          setRatings(res.data.instructorRating);
          setReviews(res.data.instructorReview);
        });
    }

    getRatings();
  }, [])

  useEffect(() => {
    if(ratings) {
      setTotalRatings(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five);
    }
  }, [ratings])

  return (
    <Layout>
      {ratings && reviews && totalRatings && <div className='sb-max:min-w-[100vw] text-center'>
        <div className='mt-10 space-y-2'>
          <h1 className='text-5xl'>{ratings.avg.toFixed(1)}</h1>
          <p>{totalRatings.toLocaleString()} Ratings &#128900; {reviews.length} Reviews</p>
          <BigRating Rate={ratings.avg.toFixed(1)} RateAction={false} />
          <div className='mx-auto w-fit'>
              <div className='flex items-center justify-between w-[23rem]'>
                <p>5 stars</p>
                <div title={ratings.five + ' Ratings'} className="w-72 h-3 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
                    <div className="bg-[#4AA54A] rounded-l-full transition-all duration-300" style={{width: `${(ratings.five/totalRatings)*100}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>

              <div className='flex items-center justify-between w-[23rem]'>
                <p>4 stars</p>
                <div className="w-72 h-3 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
                    <div className="bg-[#A5D631] rounded-l-full transition-all duration-300" style={{width: `${(ratings.four/totalRatings)*100}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>

              <div className='flex items-center justify-between w-[23rem]'>
                <p>3 stars</p>
                <div className="w-72 h-3 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
                    <div className="bg-[#F7E632] rounded-l-full transition-all duration-300" style={{width: `${(ratings.three/totalRatings)*100}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              <div className='flex items-center justify-between w-[23rem]'>
                <p>2 stars</p>
                <div className="w-72 h-3 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
                    <div className="bg-[#F7A521] rounded-l-full transition-all duration-300" style={{width: `${(ratings.two/totalRatings)*100}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              <div className='flex items-center justify-between w-[23rem]'>
                <p>1 star</p>
                <div className="w-72 h-3 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
                    <div className="bg-[#EF3A10] rounded-l-full transition-all duration-300" style={{width: `${(ratings.one/totalRatings)*100}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
          </div>
        </div>

        <hr className='my-4' />

        <div>

        </div>
      </div>}
    </Layout>
  )
}

export default RatingsAndReviews