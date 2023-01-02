import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/shared/pagination/Pagination';
import ProgressBar2 from '../../components/shared/progress/ProgressBar2';
import BigRating from '../../components/shared/rating/BigRating';
import ReviewsAndQuestions from '../../components/shared/Review/ReviewsAndQuestions';
import Layout from './Layout';

type Props = {}

const RatingsAndReviews = (props: Props) => {

  const [ratings, setRatings] = useState<any>();
  const [reviews, setReviews] = useState<any>();

  const [totalCount, setTotalCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(totalCount/10));
  const [page, setPage] = useState<number>(0);
  
  const [totalRatings, setTotalRatings] = useState<number>(0);

  useEffect(() => {
    const getRatings = async () => {
      axios.defaults.withCredentials = true;
      await axios.get("http://localhost:5000/Instructor/viewInstructorRatingsAndReviews", {
      }).then((res: { data: any }) => {
          setRatings(res.data.instructorRating);
          setReviews(res.data.instructorReview);
          setTotalCount(res.data.instructorReview.length);
        });
    }

    getRatings();
  }, [])

  useEffect(() => {
    if(ratings) {
      setTotalRatings(ratings.one + ratings.two + ratings.three + ratings.four + ratings.five);
    }
  }, [ratings])

  useEffect(() => {
    setNumberOfPages(Math.ceil(totalCount/10));
  }, [totalCount])

  return (
    <Layout>
      {ratings && totalRatings && <div className='sb-max:min-w-without-instructor-sidebar-closed text-center'>
        <div className='mt-10 space-y-2'>
          <h1 className='text-3xl'>Personal Ratings & Reviews</h1>
          <h1 className='text-5xl'>{ratings?.avg.toFixed(1)}</h1>
          <p>{totalRatings?.toLocaleString()} Ratings &#128900; {reviews?.length} Reviews</p>
          <BigRating Rate={ratings?.avg.toFixed(1)} RateAction={false} />
          <div className='mx-auto w-fit'>
              <div className='flex items-center justify-between w-[23rem] sb-max:w-[18rem]'>
                <p className='whitespace-nowrap'>5 stars</p>
                <ProgressBar2 stars={5} percentage={ratings.five/totalRatings} />
              </div>

              <div className='flex items-center justify-between w-[23rem] sb-max:w-[18rem]'>
                <p className='whitespace-nowrap'>4 stars</p>
                <ProgressBar2 stars={4} percentage={ratings.four/totalRatings} />
              </div>

              <div className='flex items-center justify-between w-[23rem] sb-max:w-[18rem]'>
                <p className='whitespace-nowrap'>3 stars</p>
                <ProgressBar2 stars={3} percentage={ratings.three/totalRatings} />
              </div>
              <div className='flex items-center justify-between w-[23rem] sb-max:w-[18rem]'>
                <p className='whitespace-nowrap'>2 stars</p>
                <ProgressBar2 stars={2} percentage={ratings.two/totalRatings} />
              </div>
              <div className='flex items-center justify-between w-[23rem] sb-max:w-[18rem]'>
                <p className='whitespace-nowrap'>1 star</p>
                <ProgressBar2 stars={1} percentage={ratings.one/totalRatings} />
              </div>
          </div>
        </div>

        <hr className='my-4' />

        <div className='px-4'>
          {reviews?.slice(10*page, 10*(page+1)).map((review: any, index: number) => (
            <div key={index}>
              <ReviewsAndQuestions user={review} isReview />
              {(index < reviews.slice(10*page, 10*(page+1)).length-1) && <hr className='my-4 border-2 rounded-full' />}
            </div>
          ))}
        </div>
        <Pagination page={page} setPage={setPage} pageCount={numberOfPages} />
      </div>}
    </Layout>
  )
}

export default RatingsAndReviews