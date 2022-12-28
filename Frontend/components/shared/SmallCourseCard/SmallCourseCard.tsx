import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import BigRating from '../rating/BigRating';
import DataContext from '../../../context/DataContext';

type Props = {
    addToWishlist?: any,
    className?: string,
    course: any,
    courseColor: any,
    index: number,
}

const SmallCourseCard = (props: Props) => {

    const { Rate } = useContext(DataContext);

    const icons = [
        'python.png', 'structure.png', 'java.png', 'c-.png', 'c-sharp.png', 'ai.png', 'cisco.png', 'coding.png', 'cpu.png', 
        'css-3.png', 'cyber-security.png', 'cyber-security (1).png', 'excel.png', 'hacker.png', 'html (1).png', 
        'js.png', 'motherboard.png', 'neural.png', 'node-js.png', 
        'programming-language.png', 'programming.png', 'python.png', 'structure.png', 'java.png', 'c-.png', 'c-sharp.png', 'ai.png', 'cisco.png', 'coding.png', 'cpu.png', 
        'css-3.png', 'cyber-security.png',
    ];
  
    function kFormatter(number: number) {
      return Math.abs(number) > 999 ? (Math.sign(number)*(Math.abs(number)/1000)).toFixed(0) + 'K' : Math.sign(number)*Math.abs(number);
    }
  
    return (
    <div className={`${props.className ? props.className: 'mr-4 hover:scale-[1.01]'} rounded-2xl z-10 relative bg-white shadow-md max-w-[15rem] h-[17rem] hover:shadow-lg transition-all duration-200`}>
        <Link href={`/Courses/${props.course._id ? props.course._id: '638773fbbbdc935c907894ce'}`} className="cursor-pointer relative">
          <div className={`bg-gradient-to-r relative flex h-24 mb-6 justify-center items-center rounded-t-2xl ${props.courseColor(props.course.level)}`}>
            <div className={`relative bg-white rounded-full top-6 p-3`}>
              <Image as='image' height={50} width={50} className='min-h-[4rem] min-w-[4rem] pointer-events-none' src={`/images/Course Icons/${icons[props.index]}`} alt={""} />
              <div className={`absolute rounded-full min-h-[6.25rem] -top-0.5 -left-0.5 z-behind min-w-[6.25rem] bg-gradient-to-r ${props.courseColor(props.course.level)}`}></div>
            </div>
            <p className="absolute italic top-3 text-xs left-2 text-white">{kFormatter(props.course.purchases ? props.course.purchases: 213000)} Views</p>
          </div>
  
          <div className="px-3 pt-2 flex flex-col justify-between h-32">
            <div>
              <h1 className="text-lg font-semibold line-clamp-2">{props.course.title}</h1>
              <p className="text-sm text-gray-500">{props.course.instructorName}</p>
            </div>
            <div className="flex items-center justify-around text-sm">
              <p>{props.course.rating ? parseFloat(props.course.rating.avg.toFixed(1)): 4.6}</p>
              <BigRating className='scale-75 whitespace-nowrap w-40' Rate={props.course.rating ? parseFloat(props.course.rating.avg.toFixed(1)): 4.6} RateAction={false} />
            </div>
          </div>
        </Link>
        <p className="italic text-right absolute bottom-2 right-4 text-[#00A15D]">{Rate.curr} {Math.floor(props.course.price * Rate.rate)}</p>
        <button onClick={props.addToWishlist} title="Add to Wishlist" className={`${props.addToWishlist ? '': 'hidden'} absolute shadow-md right-2 top-2 z-50 rounded-full bg-white h-7 w-7 p-2 hover:scale-110 hover:shadow-lg transition-all duration-200`}>
          <MdOutlineFavoriteBorder className="scale-125 absolute right-1.5 top-1.5 transition-all duration-200" />
          <MdOutlineFavorite className="scale-125 absolute text-calm-red right-1.5 top-1.5 opacity-0 transition-all duration-200" />
        </button>
    </div>
    );
}

export default SmallCourseCard;