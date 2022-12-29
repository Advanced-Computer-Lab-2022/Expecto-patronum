import React, { useState } from 'react';
import { BsFillCalendarFill, BsFillCreditCardFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import Input from '../Input/Input';
import CreditCardBack from './CreditCardBack';
import CreditCardFront from './CreditCardFront';

type Props = {
  className?: string
}

const CreditCard = (props: Props) => {

  const [cardDetails, setCardDetails] = useState(
    {
      type: 'Visa',
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
      cardholderName: '',
    }
  );

  const [secretCardNumber, setSecretCardNumber] = useState<string>('');

  const [focusCardNumber, setFocusCardNumber] = useState<boolean>(false);
  const [viewCardNumber, setViewCardNumber] = useState<boolean>(false);
  const [focusExpiryDate, setFocusExpiryDate] = useState<boolean>(false);
  const [focusSecurityCode, setFocusSecurityCode] = useState<boolean>(false);
  const [focusCardName, setFocusCardName] = useState<boolean>(false);

  const setCardNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const data = {...cardDetails};
    const isAdding = e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57;

    if(e.key === 'Backspace' && data.cardNumber.length !== 0) {
      data.cardNumber = data.cardNumber.slice(0, data.cardNumber.length - 1);
    } else if(isAdding && data.cardNumber.length < 16) {
      data.cardNumber += e.key;
    } else {
      return;
    }

    setCardDetails(data);
  }

  const secureCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isAdding = e.target.value.length > secretCardNumber.length;
    const isValid = isAdding ? (e.target.value.slice(-1).charCodeAt(0) >= 48 && e.target.value.slice(-1).charCodeAt(0) <= 57): true;

    if(isValid) {
      const num = e.target.value.replaceAll(' ', '');
      const viewedNum = num.match(/.{1,4}/g)?.join(' ');
      setSecretCardNumber(viewedNum === undefined ? '': viewedNum);
    }
  }

  const setExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const details = {...cardDetails};
    e.target.value = e.target.value.replace(
        /[^0-9]/g, '' // To allow only numbers
    ).replace(
        /^([2-9])$/g, '0$1' // To handle 3 > 03
    ).replace(
        /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^0{1,}/g, '0' // To handle 00 > 0
    ).replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
    );

    details.expiryDate = e.target.value;
    setCardDetails(details);
  }

  const setSecurityCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const details = {...cardDetails};
    details.securityCode = e.target.value;
    setCardDetails(details);
  }

  const setCardholderName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const details = {...cardDetails};
    details.cardholderName = e.target.value;
    e.target.value = e.target.value.toLocaleUpperCase();
    setCardDetails(details);
  }

  const setCardType = (selectedRadio: any) => {
    const details = {...cardDetails};
    details.type = selectedRadio;
    setCardDetails(details);
  }

  return (
    <div className={`${props.className} relative flex items-center h-screen space-y-4 px-3 pt-3 pb-4 flex-col justify-around bg-main w-[24rem] nv-max:h-[37.5rem] shadow-md`}>
      <div>
        <h1 className='text-center text-3xl'>Payment Details</h1>
        <div className='flip-card relative z-20 mt-3'>
          <div className={`${focusSecurityCode ? 'rotate-y-180': ''} flip-card-inner`} onMouseDown={() => setViewCardNumber(true)} onMouseUp={() => setViewCardNumber(false)}>
            <CreditCardFront cardDetails={cardDetails} setCardDetails={setCardDetails} secretCardNumber={secretCardNumber} setSecretCardNumber={setSecretCardNumber} />
            <CreditCardBack viewCardNumber={viewCardNumber} cardDetails={cardDetails} setCardDetails={setCardDetails} secretCardNumber={secretCardNumber} setSecretCardNumber={setSecretCardNumber} />
          </div>
        </div>
      </div>

      <form className='w-full relative 4lg:h-full'>
        <div className='nv:-space-y-2'>
          <div className='absolute -top-10 nv-max:-top-14 mob:left-2 not-mob:-left-7 z-10'>
            <Input type='radio' onChange={setCardType} inputDivStyle='flex items-center not-mob:mx-2 w-full ' style='mr-1 scale-[0.6]' enum={['Visa', 'Mastercard']} />
          </div>
          <div className='relative mt-2'>
            <Input onChange={setCardholderName} setFocus={setFocusCardName} placeholder='Cardholder Name' />
            <FaUserAlt className={`absolute right-4 top-10 ${focusCardName ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
          </div>
          <div className='relative'>
            <Input onKeyDown={setCardNumber} onChange={secureCardNumber} value={secretCardNumber} setFocus={setFocusCardNumber} maxLength={19} placeholder='Card Number' />
            <BsFillCreditCardFill className={`absolute right-4 top-10 ${focusCardNumber ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300 scale-110`} />
          </div>
          <div className='flex items-center justify-center space-x-4'>
            <div className='relative w-full'>
              <Input onChange={setExpiryDate} setFocus={setFocusExpiryDate} maxLength={5} placeholder='Expiry Date' />
              <BsFillCalendarFill className={`absolute right-4 top-10 ${focusExpiryDate ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
            </div>
            <div className='relative w-full'>
              <Input onChange={setSecurityCode} setFocus={setFocusSecurityCode} maxLength={3} type='password' placeholder='Security Code' />
              <BsFillInfoCircleFill className={`absolute right-4 top-10 ${focusSecurityCode ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
            </div>
          </div>
        </div>
        <button type='submit' className='rounded-md text-white bg-[#0B80F3] px-8 py-2 nv:mt-2 z-10 nv-max:absolute nv-max:-bottom-[6.23rem] nv-max:right-6 block mx-auto hover:bg-[#096BCB] transition-all duration-200'>Confirm Purchase</button>
      </form>
    </div>
  )
}

export default CreditCard;