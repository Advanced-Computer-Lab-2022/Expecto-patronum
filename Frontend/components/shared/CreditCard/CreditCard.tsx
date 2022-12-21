import React, { useEffect, useState } from 'react';
import { BsFillCalendarFill, BsFillCreditCardFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import Input from '../Input/Input';
import CreditCardBack from './CreditCardBack';
import CreditCardFront from './CreditCardFront';

type Props = {}

const CreditCard = (props: Props) => {

  const [cardDetails, setCardDetails] = useState(
    {
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
      cardholderName: '',
    }
  );

  const [secretCardNumber, setSecretCardNumber] = useState<string>('');

  const [focusCardNumber, setFocusCardNumber] = useState<boolean>(false);
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
      const num = e.target.value.replaceAll(' ', '').length <= 12 ? "*".repeat(e.target.value.replaceAll(' ', '').length): e.target.value.replaceAll(' ', '');
      const viewedNum = num.match(/.{1,4}/g)?.join(' ');
      setSecretCardNumber(viewedNum === undefined ? '': viewedNum);
    }
  }

  const setExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const details = {...cardDetails};
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
    setCardDetails(details);
  }

  return (
    <div className='flex items-center space-y-4 p-3 flex-col relative w-[24rem] rounded-xl shadow-md'>
      <div className='flip-card'>
        <div className={`${focusSecurityCode ? 'rotate-y-180': ''} flip-card-inner`}>
          <CreditCardFront cardDetails={cardDetails} setCardDetails={setCardDetails} secretCardNumber={secretCardNumber} setSecretCardNumber={setSecretCardNumber} />
          <CreditCardBack cardDetails={cardDetails} setCardDetails={setCardDetails} secretCardNumber={secretCardNumber} setSecretCardNumber={setSecretCardNumber} />
        </div>
      </div>

      <form className='w-full'>
        <div className='-space-y-2'>
          <div className='relative'>
            <Input onKeyDown={setCardNumber} onChange={secureCardNumber} value={secretCardNumber} setFocus={setFocusCardNumber} maxLength={19} placeholder='Card Number' />
            <BsFillCreditCardFill className={`absolute right-4 top-10 ${focusCardNumber ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300 scale-110`} />
          </div>
          <div className='flex items-center justify-center space-x-4'>
            <div className='relative'>
              <Input onChange={setExpiryDate} setFocus={setFocusExpiryDate} maxLength={5} placeholder='Expiry Date' />
              <BsFillCalendarFill className={`absolute right-4 top-10 ${focusExpiryDate ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
            </div>
            <div className='relative'>
              <Input onChange={setSecurityCode} setFocus={setFocusSecurityCode} maxLength={3} placeholder='Security Code' />
              <BsFillInfoCircleFill className={`absolute right-4 top-10 ${focusSecurityCode ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
            </div>
          </div>
          <div className='relative'>
            <Input onChange={setCardholderName} setFocus={setFocusCardName} placeholder='Cardholder Name' />
            <FaUserAlt className={`absolute right-4 top-10 ${focusCardName ? 'text-[#0B80F3]': 'text-[#7580A0]'} transition-all duration-300`} />
          </div>
        </div>
        <button type='submit' className='rounded-md text-white bg-[#0B80F3] px-14 py-2 mt-3 block mx-auto hover:bg-[#096BCB] transition-all duration-200'>Save Card</button>
      </form>
    </div>
  )
}

export default CreditCard;