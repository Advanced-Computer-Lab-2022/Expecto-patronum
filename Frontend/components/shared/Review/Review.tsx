import React from 'react'
import { BsReply } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import BigRating from '../rating/BigRating';

type Props = {
    reviewer: any,
}

const Review = (props: Props) => {
  return (
    <div className='mb-10 text-left relative'>
        <div className='flex items-center'>
            <img className='h-8 w-8 rounded-full border-1.5 border-canadian-red mr-4' src='/images/ProfileIcon.jpg' />
            <h1 className='text-lg'>{props.reviewer.username}</h1>
        </div>
        <BigRating className='scale-75 relative right-5' Rate={props.reviewer.rating} RateAction={false}  />
        <p>{props.reviewer.reviewBody} The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.</p>
        <button className='flex items-center relative top-2 rounded-full bg-input text-main shadow-md hover:shadow-lg border-1.5 border-input hover:bg-main hover:text-input transition-all duration-300 px-2 py-0.5'><BsReply className='relative bottom-0.5 scale-120 mr-2' /> Reply</button>
        <button className='absolute right-2 top-2 scale-135 hover:bg-gray-300 rounded-full w-2 transition-all duration-300 hover:text-gray-700'><HiOutlineDotsVertical className='relative right-1' /></button>
        <hr className='my-4 border-2 rounded-full' />
    </div>
  )
}

export default Review;