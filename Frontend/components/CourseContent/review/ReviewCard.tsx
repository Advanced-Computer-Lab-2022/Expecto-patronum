import classNames from 'classnames';
import React from 'react'
import ProfilePic from '../../shared/ProfilePic/ProfilePic';
import BigRating from '../../shared/rating/BigRating';

type Props = {
  review: {
    username: string,
    reviewBody: string,
    rating: number
  };

}

const ReviewCard = (props: Props) => {
  return (
    <div className={container}>
      <BigRating RateAction={false} Rate={props.review.rating}></BigRating>
      <div className={titlePictureCont}>
        <ProfilePic Size='small' FirstName='mohamed' LastName='salem' ></ProfilePic>
        <p className={title}>{props.review.username}</p>
      </div>
      <p className="w-4/5">
        {props.review.reviewBody}
      </p>
    </div>
  )
}

export default ReviewCard
const container = classNames("flex-cols px-2 items-start mb-5 border-t-2 pt-2")
const title = classNames('text-lg font-semibold   ');
const titlePictureCont = classNames('flex gap-2  items-center mb-2');