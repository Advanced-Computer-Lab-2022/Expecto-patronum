import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext } from 'react';
import DataContext from '../../context/DataContext';
import BigRating from '../shared/rating/BigRating';
import { SiCisco, SiCplusplus, SiHtml5, SiIntellijidea, SiJava, SiJavascript, SiNodedotjs, SiPhp, SiPython, SiReact } from 'react-icons/si';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsCpu } from 'react-icons/bs';
import { CourseData } from '../../Interface/CourseDataInterface';
import { AES } from 'crypto-js';
import { Router } from 'next/router';

type Props = {
    course: CourseData,
    isViewList: boolean,
    index: number,
}

const CourseCard2 = (props: Props) => {
    console.log("TATATATATATATATA")
    console.log(props.course);
    console.log("TATATATATATATATA")



    const { Rate } = useContext(DataContext);
    const saleRibbon = classNames(`after:content-[""] absolute -left-3 -top-10 after:absolute after:border-y-[32px] after:rotate-45 after:left-0 after:top-0 after:h-30 after:border-x-[32px] after:border-l-transparent after:border-r-canadian-red after:border-y-transparent`);

    const icons = [
        <SiReact className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiPhp className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiJava className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiCplusplus className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiHtml5 className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiPython className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiIntellijidea className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiJavascript className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiNodedotjs className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <SiCisco className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <RiFileExcel2Line className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
        <BsCpu className='text-white scale-[5] inline-block relative top-[4.25rem]' />,
    ];

    function levelColor(level: string) {
        switch (level) {
            case 'Beginner': return <svg className={`absolute ${!props.isViewList ? '-bottom-12' : 'sb-max:-bottom-12 sb-max:w-full'}`} id="visual" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="160" height="160" fill="#52eb0e"></rect><path d="M0 42L5.3 44.8C10.7 47.7 21.3 53.3 32 61C42.7 68.7 53.3 78.3 64 82.3C74.7 86.3 85.3 84.7 96 75.7C106.7 66.7 117.3 50.3 128 43.3C138.7 36.3 149.3 38.7 154.7 39.8L160 41L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#51e207"></path><path d="M0 73L5.3 73.7C10.7 74.3 21.3 75.7 32 74.8C42.7 74 53.3 71 64 76.8C74.7 82.7 85.3 97.3 96 101C106.7 104.7 117.3 97.3 128 95.2C138.7 93 149.3 96 154.7 97.5L160 99L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#52e60b"></path><path d="M0 118L5.3 116.8C10.7 115.7 21.3 113.3 32 116.3C42.7 119.3 53.3 127.7 64 127.2C74.7 126.7 85.3 117.3 96 111.3C106.7 105.3 117.3 102.7 128 106.2C138.7 109.7 149.3 119.3 154.7 124.2L160 129L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#52eb0e"></path></svg>;
            case 'Intermediate': return <svg className={`absolute ${!props.isViewList ? '-bottom-12' : 'sb-max:-bottom-12 sb-max:w-full'}`} id="visual" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="160" height="160" fill="#fde143"></rect><path d="M0 42L5.3 44.8C10.7 47.7 21.3 53.3 32 61C42.7 68.7 53.3 78.3 64 82.3C74.7 86.3 85.3 84.7 96 75.7C106.7 66.7 117.3 50.3 128 43.3C138.7 36.3 149.3 38.7 154.7 39.8L160 41L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#fddd2d"></path><path d="M0 73L5.3 73.7C10.7 74.3 21.3 75.7 32 74.8C42.7 74 53.3 71 64 76.8C74.7 82.7 85.3 97.3 96 101C106.7 104.7 117.3 97.3 128 95.2C138.7 93 149.3 96 154.7 97.5L160 99L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#fddf39"></path><path d="M0 118L5.3 116.8C10.7 115.7 21.3 113.3 32 116.3C42.7 119.3 53.3 127.7 64 127.2C74.7 126.7 85.3 117.3 96 111.3C106.7 105.3 117.3 102.7 128 106.2C138.7 109.7 149.3 119.3 154.7 124.2L160 129L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#fde143"></path></svg>;
            case 'Advanced': return <svg className={`absolute ${!props.isViewList ? '-bottom-12' : 'sb-max:-bottom-12 sb-max:w-full'}`} id="visual" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="160" height="160" fill="#ff4542"></rect><path d="M0 42L5.3 44.8C10.7 47.7 21.3 53.3 32 61C42.7 68.7 53.3 78.3 64 82.3C74.7 86.3 85.3 84.7 96 75.7C106.7 66.7 117.3 50.3 128 43.3C138.7 36.3 149.3 38.7 154.7 39.8L160 41L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#ff2d28"></path><path d="M0 73L5.3 73.7C10.7 74.3 21.3 75.7 32 74.8C42.7 74 53.3 71 64 76.8C74.7 82.7 85.3 97.3 96 101C106.7 104.7 117.3 97.3 128 95.2C138.7 93 149.3 96 154.7 97.5L160 99L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#ff3a36"></path><path d="M0 118L5.3 116.8C10.7 115.7 21.3 113.3 32 116.3C42.7 119.3 53.3 127.7 64 127.2C74.7 126.7 85.3 117.3 96 111.3C106.7 105.3 117.3 102.7 128 106.2C138.7 109.7 149.3 119.3 154.7 124.2L160 129L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#ff4542"></path></svg>;
            case 'AllLevels': return <svg className={`absolute ${!props.isViewList ? '-bottom-12' : 'sb-max:-bottom-12 sb-max:w-full'}`} id="visual" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="160" height="160" fill="#006ee6"></rect><path d="M0 42L5.3 44.8C10.7 47.7 21.3 53.3 32 61C42.7 68.7 53.3 78.3 64 82.3C74.7 86.3 85.3 84.7 96 75.7C106.7 66.7 117.3 50.3 128 43.3C138.7 36.3 149.3 38.7 154.7 39.8L160 41L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#204fdf"></path><path d="M0 73L5.3 73.7C10.7 74.3 21.3 75.7 32 74.8C42.7 74 53.3 71 64 76.8C74.7 82.7 85.3 97.3 96 101C106.7 104.7 117.3 97.3 128 95.2C138.7 93 149.3 96 154.7 97.5L160 99L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#085fe3"></path><path d="M0 118L5.3 116.8C10.7 115.7 21.3 113.3 32 116.3C42.7 119.3 53.3 127.7 64 127.2C74.7 126.7 85.3 117.3 96 111.3C106.7 105.3 117.3 102.7 128 106.2C138.7 109.7 149.3 119.3 154.7 124.2L160 129L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#006ee6"></path></svg>;
            default: return <svg className={`absolute ${!props.isViewList ? '-bottom-12' : 'sb-max:-bottom-12 sb-max:w-full'}`} id="visual" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="160" height="160" fill="#006ee6"></rect><path d="M0 42L5.3 44.8C10.7 47.7 21.3 53.3 32 61C42.7 68.7 53.3 78.3 64 82.3C74.7 86.3 85.3 84.7 96 75.7C106.7 66.7 117.3 50.3 128 43.3C138.7 36.3 149.3 38.7 154.7 39.8L160 41L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#204fdf"></path><path d="M0 73L5.3 73.7C10.7 74.3 21.3 75.7 32 74.8C42.7 74 53.3 71 64 76.8C74.7 82.7 85.3 97.3 96 101C106.7 104.7 117.3 97.3 128 95.2C138.7 93 149.3 96 154.7 97.5L160 99L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#085fe3"></path><path d="M0 118L5.3 116.8C10.7 115.7 21.3 113.3 32 116.3C42.7 119.3 53.3 127.7 64 127.2C74.7 126.7 85.3 117.3 96 111.3C106.7 105.3 117.3 102.7 128 106.2C138.7 109.7 149.3 119.3 154.7 124.2L160 129L160 161L154.7 161C149.3 161 138.7 161 128 161C117.3 161 106.7 161 96 161C85.3 161 74.7 161 64 161C53.3 161 42.7 161 32 161C21.3 161 10.7 161 5.3 161L0 161Z" fill="#006ee6"></path></svg>;
        }
    }

    function subjectColor() {
        switch (props.course.level) {
            case 'Beginner': return 'bg-[#51e207]';
            case 'Intermediate': return 'bg-[#fddd2d]';
            case 'Advanced': return 'bg-[#ff2d28]';
            case 'AllLevels': return 'bg-[#204fdf]';
            default: return 'bg-[#204fdf]';
        }
    }

    function getDiscountPrice() {
        const price = Math.max((Math.floor(props.course.discountPrice * Rate.rate) - 0.01), 0);
        return price === 0 ? 'FREE' : Rate.curr + " " + price.toLocaleString();
    }

    function getCourseHours() {
        const hours = Math.floor(props.course.courseHours);
        const minutes = ((props.course.courseHours - hours) * 60).toFixed(0);
        return `${hours}h ${minutes}m`;
    }

    function getTotalRatings() {
        const { one, two, three, four, five } = props.course.rating;
        return (one + two + three + four + five).toLocaleString();
    }

    const encryptId = (str: string | CryptoJS.lib.WordArray) => {
        const ciphertext = AES.encrypt(str, 'secretPassphrase');
        return encodeURIComponent(ciphertext.toString());
    }

    const encryptedId = encryptId(props.course._id);


    return (
        <Link href={`/Courses/${encryptedId}`} >
            <div className={`${!props.isViewList ? 'flex-col' : 'sb-max:flex-col'} flex p-3 relative bg-white mb-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}>
                <div className={`${!props.isViewList ? 'w-full' : 'sb-max:w-full w-40 min-w-[10rem]'} rounded-3xl relative bg-gradient-to-br text-white h-44 flex flex-col`}>
                    <div className={`${!props.isViewList ? 'w-full' : 'sb-max:w-full w-40'} h-40 relative mx-auto text-center rounded-t-3xl overflow-hidden`}>
                        {levelColor(props.course.level)}
                        {icons[(props.index % 11)]}
                    </div>
                    <p className={`text-sm py-1.5 relative z-10 ${subjectColor()} w-full mx-auto text-center rounded-b-3xl`}>{props.course.subject}</p>
                </div>

                <div className={`${!props.isViewList ? 'mb-4' : 'sb-max:mb-4 ml-3'} flex-col w-full min-w-0 justify-between h-fit text-[#384557]`}>
                    <h1 className={`${!props.isViewList ? '' : 'sb:mr-22'} mt-3 text-xl w-full font-bold tracking-wide`}>{props.course.title}</h1>
                    <div className='min-w-0 row p-0 flex items-center justify-between text-sm'>
                        <div className='flex col items-center justify-center mb-0.5 -space-x-8'>
                            <label className={`${props.course.rating.avg === 0.0 ? 'hidden': ''} text-sm mt-0.5 font-bold`}>{props.course.rating.avg.toFixed(1)}</label>
                            <div className={`${props.course.rating.avg === 0.0 ? 'hidden': ''}`}><BigRating className='scale-50 whitespace-nowrap' Rate={props.course.rating.avg} RateAction={false} /></div>
                            <label className='text-xs text-[#b2b6bb] mt-px whitespace-nowrap'>{props.course.rating.avg === 0.0 ? 'Not yet rated': `(${getTotalRatings()} ratings)`}</label>
                        </div>
                        <p className='whitespace-nowrap text-[#8d95a1] col'>Level: <span className='italic font-bold text-[#384557] tracking-wide'>{props.course.level === 'AllLevels' ? 'All Levels' : props.course.level}</span></p>
                        <label className='whitespace-nowrap text-[#8d95a1] col'>Time: <span className='font-bold text-[#384557]'>{getCourseHours()}</span></label>
                        <label className='whitespace-nowrap text-[#8d95a1] col'>Students: <span className='font-bold text-[#384557]'>{props.course.purchases}</span></label>
                    </div>
                    <p className={`${!props.isViewList ? '' : 'sb:mr-10'} text-[#72767b] line-clamp-2`}>In this course you are going to learn about how to test you web application using testNG. Using intelliJ, you could automate your web application and any other project. {props.course.summary}</p>
                </div>

                <label className='right-3 bottom-3 whitespace-nowrap absolute text-sm font-bold text-[#038470] bg-[#D7FFE0] px-2 py-0.5 rounded-full'>
                    <span className={`${props.course.discount.discount === 0 ? '' : `${lineThrough} text-xs text-gray-500`} relative`}>{Rate.curr} {(Math.floor(props.course.price * Rate.rate) - 0.01).toLocaleString()}</span>
                    <span className={`${props.course.discount.discount === 0 ? 'hidden' : ''} ml-2`}>{getDiscountPrice()}</span>
                </label>
                <label className={`${props.course.discount?.discount === 0 ? 'hidden' : saleRibbon}`}><span className='absolute text-white top-[3.75rem] left-2 z-[1] whitespace-nowrap -rotate-45'>{props.course.discount?.discount === 100 ? 'FOR FREE' : `SAVE ${props.course.discount?.discount}%`}</span></label>
            </div>
        </Link>
    )
}

const lineThrough = classNames('after:content-[""] after:pointer-events-none after:absolute after:h-[0.075rem] after:w-full after:bg-gray-500 after:left-0 after:rotate-[-10deg] after:top-1');

export default CourseCard2;