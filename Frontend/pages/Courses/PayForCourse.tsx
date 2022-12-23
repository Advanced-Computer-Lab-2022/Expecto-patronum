import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import CreditCard from '../../components/shared/CreditCard/CreditCard';
import OneStar from '../../components/shared/rating/OneStar';
import { useRouter } from 'next/router';

type Props = {

}

const PayForCourse = (props: Props) => {

    const [course, setCourse] = useState<any>();
    const paymentRef = useRef<HTMLDivElement>(null);
    const paymentTabRef = useRef<HTMLDivElement>(null);
    const summaryTabRef = useRef<HTMLDivElement>(null);

    let router = useRouter();

    useEffect(() => {

        const getCourse = async () => {
            axios.get('http://localhost:5000/Courses/GetCourse', {
                params: {
                    id: '638773fabbdc935c90789419',
                }
            }).then((res) => {
                setCourse(res.data[0]);
                console.log(res.data[0]);
            })
        }

        // getCourse();

        global.window.scrollTo(0, 80);
    }, [])

    function levelColor(level: string) {
        switch(level) {
            case 'Beginner': return 'from-[#2f8608] to-[#52EB0E]';
            case 'Intermediate': return 'from-[#C29904] to-[#FDE143]';
            case 'Advanced': return 'from-[#B20000] to-[#FF4542]';
            case 'AllLevels': return 'from-[#2B32B2] to-[#1488CC]';
            default: return 'from-[#1D948E] to-[#3FE0D0]';
        }
    }

    const goBack = (e: any) => {
        if(!paymentRef.current?.children[0].classList.contains('nv-max:hidden')) {
            return router.back();
        }

        paymentRef.current?.children[1].classList.add('nv-max:hidden');
        paymentRef.current?.children[0].classList.remove('nv-max:hidden');

        summaryTabRef.current?.classList.remove('w-4','bg-gray-400');
        summaryTabRef.current?.classList.add('w-10','bg-[#0B80F3]');

        paymentTabRef.current?.classList.remove('w-10','bg-[#0B80F3]');
        paymentTabRef.current?.classList.add('w-4','bg-gray-400');

        e.target.parentNode.children[1].classList.remove('hidden');
    }

    const proceed = (e: any) => {
        paymentRef.current?.children[0].classList.add('nv-max:hidden');
        paymentRef.current?.children[1].classList.remove('nv-max:hidden');

        summaryTabRef.current?.classList.add('w-4','bg-gray-400');
        summaryTabRef.current?.classList.remove('w-10','bg-[#0B80F3]');

        paymentTabRef.current?.classList.add('w-10','bg-[#0B80F3]');
        paymentTabRef.current?.classList.remove('w-4','bg-gray-400');

        e.target.classList.add('hidden');

    }

  return (
    <div ref={paymentRef} className='h-full relative nv:flex items-start'>
        {<div className='w-[calc(100%-24rem)] nv-max:w-full pt-3 pl-4 nv:h-screen flex flex-col justify-between'>
            <div>
                <h1 className='text-3xl nv-max:text-center'>Payment Summary</h1>
                
                <div className='bg-white shadow-md rounded-md ml-6 mt-3 mr-8 py-4 px-2 mb-3 nv:mb-5 relative'>
                    <OneStar rating={4.2} className='bg-white rounded-bl-xl rounded-tr-md absolute top-0 right-0 py-2 px-3 shadow-md hover:shadow-sm transition-all duration-200' />
                    <div className='flex items-center h-22 mt-3'>
                        <Image width={100} height={100} src='/images/Course Icons/python.png' className={`rounded-md mr-4 nv-max:h-18 nv-max:w-18 w-22 h-22 p-2`} alt='' />
                        <div className='flex flex-col justify-between h-full py-1'>
                            <h1 className='text-2xl nv-max:text-lg font-bold nv:leading-tight line-clamp-2'>Learn Python: The Complete Python Programming Course</h1>
                            <div className='flex items-center space-x-4'>
                                <label className={`bg-black px-1 text-white`}>-20%</label>
                                <label className={`text-lg nv-max:text-base`}>$59.49</label>
                                <label className={`line-through text-[#7580A0]`}>$69.99</label>
                            </div>
                        </div>
                    </div>
                    <div className='nv:ml-22 px-3 mt-3 text-gray-500'>
                        <p><span>Difficulty:</span> <span className='font-bold italic'>All Levels</span></p>
                        <p className='ml-2 -indent-2'>Summary: <br /> Intensive practice in writing poetry. Analysis and criticism of students’ work, as well as some critical study of published verse. May be repeated once for credit.</p>
                    </div>
                </div>
            </div>

            <div className='mt-1 nv:mt-5 mx-8 mb-3'>
                <p className='text-xs mb-3'>By selecting [Confirm Purchase], you agree to complete the purchase on accordance with the <Link className='text-blue-600 hover:text-blue-800' href=''>Terms of Service</Link> before using this course.</p>
                <div className='flex justify-between mx-1'>
                    <p>Subtotal:</p>
                    <p>$69.99</p>
                </div>
                <div className='flex justify-between mx-1'>
                    <p>Tax:</p>
                    <p>$0.00</p>
                </div>
                <div className='flex justify-between mx-1 text-blue-700'>
                    <p>Discount:</p>
                    <p>$10.50</p>
                </div>
                <div className='flex justify-between mx-1 font-bold'>
                    <p>Total Amount:</p>
                    <p>$59.49</p>
                </div>
            </div>
        </div>}
        <CreditCard className='nv-max:hidden nv-max:w-full nv-max:shadow-none' />
        <div className='nv:hidden space-y-5 relative'>
            <div className='flex items-center justify-center space-x-2 ml-10'>
                <div ref={summaryTabRef} className='h-[0.15rem] w-10 bg-[#0B80F3] transition-all duration-200'></div>
                <div ref={paymentTabRef} className='h-[0.15rem] w-4 bg-gray-400 transition-all duration-200'></div>
            </div>
            <div className='flex items-center justify-between space-x-4 mb-4 mx-10'>
                <button onClick={goBack} className='border-[#0B80F3] border-2 hover:bg-[#096BCB] text-[#0B80F3] hover:border-[#096BCB] hover:text-white px-3 py-1.5 rounded-md transition-all duration-200'>Back</button>
                <button onClick={proceed} className='bg-[#0B80F3] hover:bg-[#096BCB] text-white px-[1.328rem] py-2 w-max rounded-md transition-all duration-200'>Proceed to Checkout</button>
            </div>
        </div>
    </div>
  )
}

export default PayForCourse;