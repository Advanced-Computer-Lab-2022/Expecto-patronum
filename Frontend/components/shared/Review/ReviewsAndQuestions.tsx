import React, { useRef } from 'react'
import { BsReply } from 'react-icons/bs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import BigRating from '../rating/BigRating';

type Props = {
    user: any,
    isReview: boolean,
}

const ReviewsAndQuestions = (props: Props) => {

  const replyRef = useRef<any>();

  function openInput() {
    replyRef.current.classList.toggle('hidden');
  }

  return (
    <div className='mb-10 text-left relative sb:mx-3'>
        <div className='flex items-center'>
            <img className='h-8 w-8 rounded-full border-1.5 border-canadian-red mr-4' src='/images/ProfileIcon.jpg' />
            <h1 className='text-lg'>{props.user.username}</h1>
        </div>
        {props.isReview && <BigRating className='scale-75 relative right-5' Rate={props.user.rating} RateAction={false}  />}
        <p>{props.isReview ? props.user.reviewBody: props.user.question} The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.</p>
        <input ref={replyRef} type='text' placeholder='Reply' className='hidden pl-2 py-1 my-1.5 w-full rounded-full outline-none' />
        <button onClick={openInput} className='flex items-center relative top-2 rounded-full bg-input text-main shadow-md hover:shadow-lg border-1.5 border-input hover:bg-main hover:text-input transition-all duration-300 px-2 py-0.5'><BsReply className='relative bottom-0.5 scale-120 mr-2' /> Reply</button>
        <button className='absolute right-2 top-2 scale-135 hover:scale-150 rounded-full w-2 transition-all duration-300'><HiOutlineDotsVertical className='relative right-1' /></button>
    </div>
  )
}

export default ReviewsAndQuestions;