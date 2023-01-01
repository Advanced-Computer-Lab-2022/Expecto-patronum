import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CreditCard from '../../components/shared/CreditCard/CreditCard';
import OneStar from '../../components/shared/rating/OneStar';
import { useRouter } from 'next/router';
import DataContext from '../../context/DataContext';
import { PopupMessageContext } from '../_app';

type Props = {

}

const PayForCourse = (props: Props) => {

    const [course, setCourse] = useState<any>();
    const [cardDetails, setCardDetails] = useState(
        {
          type: 'Visa',
          cardNumber: '',
          expiryDate: '',
          securityCode: '',
          cardholderName: '',
        }
    );
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'wallet'>('credit');
    const [isCredit, setIsCredit] = useState<boolean>(true);
    const paymentRef = useRef<HTMLDivElement>(null);
    const paymentTabRef = useRef<HTMLDivElement>(null);
    const summaryTabRef = useRef<HTMLDivElement>(null);
    const confirmPurchaseRef = useRef<HTMLButtonElement>(null);

    const { Rate } = useContext(DataContext);
    const { viewPopupMessage } = useContext(PopupMessageContext);

    let router = useRouter();

    useEffect(() => {

        const getCourse = async () => {
            axios.defaults.withCredentials = true;
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
        confirmPurchaseRef.current?.classList.add('nv-max:hidden');
    }

    const proceed = (e: any) => {
        paymentRef.current?.children[0].classList.add('nv-max:hidden');
        paymentRef.current?.children[1].classList.remove('nv-max:hidden');

        summaryTabRef.current?.classList.add('w-4','bg-gray-400');
        summaryTabRef.current?.classList.remove('w-10','bg-[#0B80F3]');

        paymentTabRef.current?.classList.add('w-10','bg-[#0B80F3]');
        paymentTabRef.current?.classList.remove('w-4','bg-gray-400');

        e.target.classList.add('hidden');
        confirmPurchaseRef.current?.classList.remove('nv-max:hidden');
    }

    const confirmPurchase = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(paymentMethod === 'credit') {
            if(cardDetails.cardNumber === '' || cardDetails.securityCode === '' || cardDetails.cardholderName === '' || cardDetails.expiryDate === '') {
                viewPopupMessage(false, 'Please fill in the required fields.');
                return;
            } else {
                await axios.put('http://localhost:5000/User/buyCourse', {
                    userID: '63a59b15f928fa951091f381', // User ID
                    courseID: '63b05af10df08615ec9108ea', // Course ID
                    creditCardNumber: cardDetails.cardNumber,
                    ccv: cardDetails.securityCode,
                    cardHolderName: cardDetails.cardholderName,
                    expiration: cardDetails.expiryDate,
                    amount: 69,
                }).then((res) => {
                    if(res.data.error) {
                        viewPopupMessage(false, res.data.message);
                    } else {
                        viewPopupMessage(true, 'Course Bought Successfully.');
                    }
                    router.push(`/Courses/${'63b05af10df08615ec9108ea'}`);
                })
            }
        } else {
            if(true) { // Check on user's balance
                viewPopupMessage(false, "Your wallet balance is insufficient.")
            } else {
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:5000/User/payWithWallet', {
                    userID: '',
                    courseID: '',
                }).then((res) => {
                    
                })
            }
        }
    }

  return (
    <div ref={paymentRef} className='h-full relative nv:flex items-start'>
        {<div className='w-[calc(100%-24rem)] nv-max:w-full pt-3 nv:pl-4 nv:h-screen flex flex-col justify-between nv:border-r-1.5'>
            <div>
                <h1 className='text-3xl nv-max:text-center'>Payment Summary</h1>
                
                <div className='bg-white shadow-md rounded-md nv:ml-6 mt-3 nv:mr-8 nv-max:mx-6 py-4 px-2 mb-3 nv:mb-5 relative'>
                    <OneStar rating={4.2} className='bg-white rounded-bl-xl rounded-tr-md absolute top-0 right-0 py-2 px-3 shadow-md hover:shadow-sm transition-all duration-200' />
                    <div className='flex items-center h-22 mt-3'>
                        <Image width={100} height={100} src='/images/Course Icons/python.png' className={`rounded-md mr-4 nv-max:h-18 nv-max:w-18 w-22 h-22 p-2`} alt='' />
                        <div className='flex flex-col justify-between h-full py-1'>
                            <h1 className='text-2xl nv-max:text-lg font-bold nv:leading-tight line-clamp-2'>Learn Python: The Complete Python Programming Course</h1>
                            <div className='flex items-center space-x-4'>
                                <label className={`bg-black px-1 text-white`}>-20%</label>
                                <label className={`text-lg nv-max:text-base`}>{Rate.curr} {(Rate.rate * 59.49).toFixed(2)}</label>
                                <label className={`line-through text-[#7580A0]`}>{Rate.curr} {(Rate.rate * 69.99).toFixed(2)}</label>
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
                    <p>{Rate.curr} {(Rate.rate * 69.99).toFixed(2)}</p>
                </div>
                <div className='flex justify-between mx-1'>
                    <p>Tax:</p>
                    <p>{Rate.curr} {(Rate.rate * 0.00).toFixed(2)}</p>
                </div>
                <div className='flex justify-between mx-1 text-blue-700'>
                    <p>Discount:</p>
                    <p>{Rate.curr} {(Rate.rate * 10.50).toFixed(2)}</p>
                </div>
                <div className='flex justify-between mx-1 font-bold'>
                    <p>Total Amount:</p>
                    <p>{Rate.curr} {(Rate.rate * 59.49).toFixed(2)}</p>
                </div>
            </div>
        </div>}
        <form className={`nv-max:hidden relative pb-3`}>
            <h1 className='text-center text-3xl mt-4'>Payment Methods</h1>
            <TogglePaymentMethod isCredit={isCredit} setIsCredit={setIsCredit} setPaymentMethod={setPaymentMethod} />
            <div className={`${isCredit ? '' : 'h-40'} flex items-start overflow-hidden relative`}>
                <CreditCard cardDetails={cardDetails} setCardDetails={setCardDetails} className={`${isCredit ? 'right-0' : 'right-96'} relative nv-max:shadow-none transition-all duration-300 nv-max:duration-100`} />
                <div className={`${!isCredit ? 'left-0' : 'left-96'} absolute w-full text-center transition-all duration-300 nv-max:duration-100`}>
                    <div className='shadow-md rounded-lg h-[8rem] w-[19rem] pt-3 text-center mx-auto bg-gradient-to-br from-white to-gray-300'>
                        <h1 className='text-xl tracking-wider mb-2'>Cash:</h1>
                        <label className='text-3xl font-bold space-x-4'>
                            <span>{Rate.curr}</span> 
                            <span>60.00 <span className='text-calm-red text-sm'>-{Rate.curr} 59.49</span></span>
                        </label>
                        <p className='text-right text-xs mr-3 mt-3 italic'>Remaining after purchase: <span className='ml-2 font-bold not-italic'>{Rate.curr} 0.41</span></p>
                    </div>
                </div>
            </div>
            <button onClick={confirmPurchase} ref={confirmPurchaseRef} type='submit' className={`rounded-md nv-max:hidden text-white bg-[#0B80F3] px-8 py-2 nv:mt-2 z-10 nv-max:absolute nv-max:-bottom-[3.93rem] block nv-max:right-10 mx-auto hover:bg-[#096BCB] transition-all duration-200`}>Confirm Purchase</button>
        </form>
        <div className='nv:hidden space-y-5 relative'>
            <div className='flex items-center justify-center space-x-2'>
                <div ref={summaryTabRef} className='h-[0.18rem] w-10 bg-[#0B80F3] transition-all duration-200'></div>
                <div ref={paymentTabRef} className='h-[0.18rem] w-4 bg-gray-400 transition-all duration-200'></div>
            </div>
            <div className='flex items-center justify-between space-x-4 mb-4 mx-10'>
                <button onClick={goBack} className='border-[#0B80F3] border-2 hover:bg-[#096BCB] text-[#0B80F3] hover:border-[#096BCB] hover:text-white px-3 py-1.5 rounded-md transition-all duration-200'>Back</button>
                <button onClick={proceed} className='bg-[#0B80F3] hover:bg-[#096BCB] text-white px-[1.328rem] py-2 w-max rounded-md transition-all duration-200'>Proceed to Checkout</button>
            </div>
        </div>
    </div>
  )
}

type toggleProps = {
    isCredit: boolean,
    setIsCredit: React.Dispatch<React.SetStateAction<boolean>>,
    setPaymentMethod: React.Dispatch<React.SetStateAction<'credit' | 'wallet'>>,
}
const TogglePaymentMethod = (props: toggleProps) => {

    const creditRef = useRef<HTMLButtonElement>(null);
    const walletRef = useRef<HTMLButtonElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);

    function chooseCredit() {
        props.setIsCredit(true);
        props.setPaymentMethod('credit');
        creditRef.current?.classList.add('font-bold', 'tracking-wide');
        creditRef.current?.classList.remove('text-[#433A3E]');
        walletRef.current?.classList.remove('font-bold', 'tracking-wide');
        walletRef.current?.classList.add('text-[#433A3E]');

        if(trackerRef.current != undefined) {
            trackerRef.current.style.width = creditRef.current?.clientWidth + 'px';
            trackerRef.current.style.left = `calc(${creditRef.current?.offsetLeft}px - 11px)`;
            trackerRef.current.style.top = creditRef.current?.offsetTop + 'px';
        }
    }

    function chooseWallet() {
        props.setIsCredit(false);
        props.setPaymentMethod('wallet');
        walletRef.current?.classList.add('font-bold', 'tracking-wide');
        walletRef.current?.classList.remove('text-[#433A3E]');
        creditRef.current?.classList.remove('font-bold', 'tracking-wide');
        creditRef.current?.classList.add('text-[#433A3E]');

        if(trackerRef.current != undefined) {
            trackerRef.current.style.width = walletRef.current?.clientWidth + 'px';
            trackerRef.current.style.left = `calc(${walletRef.current?.offsetLeft}px - 13px)`;
            trackerRef.current.style.top = walletRef.current?.offsetTop + 'px';
        }
    }

    return (
        <div className='text-center relative shadow-sm mx-auto mt-1.5 mb-3 w-fit space-x-3 p-0.5 bg-[#E2DFE3] rounded-full'>
            <button type='button' onClick={chooseCredit} ref={creditRef} className='rounded-full px-2 relative z-10 font-bold tracking-wide transition-all duration-300'>Credit</button>
            <button type='button' onClick={chooseWallet} ref={walletRef} className='rounded-full px-2 relative z-10 text-[#433A3E] transition-all duration-300'>Wallet</button>
            <div ref={trackerRef} className='bg-white absolute h-6 -left-[10px] top-0.5 rounded-full transition-all duration-300 w-[4.057rem]'></div>
        </div>
    );
}

export default PayForCourse;