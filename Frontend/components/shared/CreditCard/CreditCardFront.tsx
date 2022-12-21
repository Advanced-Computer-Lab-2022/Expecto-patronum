import React from 'react';
import Image from 'next/image';
import { IoMdArrowDropright } from 'react-icons/io';
import { SiContactlesspayment } from 'react-icons/si';

type Props = {
    cardDetails: {
        cardNumber: string;
        expiryDate: string;
        securityCode: string;
        cardholderName: string;
    },
    setCardDetails: React.Dispatch<React.SetStateAction<{
        cardNumber: string;
        expiryDate: string;
        securityCode: string;
        cardholderName: string;
    }>>,
    secretCardNumber: string,
    setSecretCardNumber: React.Dispatch<React.SetStateAction<string>>,
}

const CreditCardFront = (props: Props) => {

    const setCardNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const data = {...props.cardDetails};
        const isAdding = e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57;
    
        if(e.key === 'Backspace' && data.cardNumber.length !== 0) {
          data.cardNumber = data.cardNumber.slice(0, data.cardNumber.length - 1);
        } else if(isAdding && data.cardNumber.length < 16) {
          data.cardNumber += e.key;
        } else {
          return;
        }
    
        props.setCardDetails(data);
    }
    
    const secureCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isAdding = e.target.value.length > props.secretCardNumber.length;
      const isValid = isAdding ? (e.target.value.slice(-1).charCodeAt(0) >= 48 && e.target.value.slice(-1).charCodeAt(0) <= 57): true;

      if(e.target.value.length <= 19 && isValid) {
        const num = e.target.value.replaceAll(' ', '').length <= 12 ? "*".repeat(e.target.value.replaceAll(' ', '').length): e.target.value.replaceAll(' ', '');
        const viewedNum = num.match(/.{1,4}/g)?.join(' ');
        props.setSecretCardNumber(viewedNum === undefined ? '': viewedNum);
      }
    }

  return (
    <div className='flip-card-front credit-card relative text-white w-[20.5rem] z-10 h-52 overflow-hidden rounded-xl shadow-lg drop-shadow-md'>
      {/* <Image className='w-[20.5rem] left-0 top-0 absolute z-behind' height='300' width='300' src='/images/Credit Card Background.png' alt='' /> */}
      <svg id="visual" viewBox="0 0 328 208" width="328" height="208" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><g strokeWidth="1" strokeLinejoin="bevel"><path d="M182 105.3L191 124.3L215 114Z" fill="#3b3b3d" stroke="#3b3b3d"></path><path d="M188 176.7L196 140.7L106 118.7Z" fill="#414143" stroke="#414143"></path><path d="M191 124.3L221 136L215 114Z" fill="#414143" stroke="#414143"></path><path d="M196 140.7L221 136L191 124.3Z" fill="#303032" stroke="#303032"></path><path d="M246 72L201 57.7L215 114Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M215 114L201 57.7L182 105.3Z" fill="#202022" stroke="#202022"></path><path d="M274 87.7L246 72L215 114Z" fill="#303032" stroke="#303032"></path><path d="M246 72L210 43.3L201 57.7Z" fill="#2b2b2d" stroke="#2b2b2d"></path><path d="M106 118.7L196 140.7L191 124.3Z" fill="#464749" stroke="#464749"></path><path d="M196 140.7L188 176.7L221 136Z" fill="#303032" stroke="#303032"></path><path d="M252 179.3L272 128L221 136Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M221 136L272 128L215 114Z" fill="#161618" stroke="#161618"></path><path d="M246 72L218 35.3L210 43.3Z" fill="#252527" stroke="#252527"></path><path d="M272 128L274 87.7L215 114Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M246 72L243 29.3L218 35.3Z" fill="#464749" stroke="#464749"></path><path d="M188 176.7L252 179.3L221 136Z" fill="#202022" stroke="#202022"></path><path d="M274 87.7L243 29.3L246 72Z" fill="#464749" stroke="#464749"></path><path d="M106 63.3L106 118.7L182 105.3Z" fill="#464749" stroke="#464749"></path><path d="M182 105.3L106 118.7L191 124.3Z" fill="#202022" stroke="#202022"></path><path d="M106 63.3L182 105.3L201 57.7Z" fill="#252527" stroke="#252527"></path><path d="M106 63.3L109 32.3L98 52Z" fill="#6b1316" stroke="#6b1316"></path><path d="M188 176.7L217 208L252 179.3Z" fill="#353638" stroke="#353638"></path><path d="M164 208L217 208L188 176.7Z" fill="#3b3b3d" stroke="#3b3b3d"></path><path d="M106 63.3L201 57.7L109 32.3Z" fill="#202022" stroke="#202022"></path><path d="M117 190.3L164 208L188 176.7Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M106 63.3L92 82.7L106 118.7Z" fill="#6b1316" stroke="#6b1316"></path><path d="M243 29.3L215 0L218 35.3Z" fill="#464749" stroke="#464749"></path><path d="M218 35.3L215 0L210 43.3Z" fill="#353638" stroke="#353638"></path><path d="M79 89L90 139.3L106 118.7Z" fill="#ae2a30" stroke="#ae2a30"></path><path d="M106 118.7L117 190.3L188 176.7Z" fill="#252527" stroke="#252527"></path><path d="M328 136L312 113.7L272 128Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M272 128L312 113.7L274 87.7Z" fill="#464749" stroke="#464749"></path><path d="M300 0L257 7.7L243 29.3Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M90 139.3L117 190.3L106 118.7Z" fill="#76171a" stroke="#76171a"></path><path d="M106 63.3L98 52L92 82.7Z" fill="#6b1316" stroke="#6b1316"></path><path d="M158 0L201 57.7L210 43.3Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M215 0L158 0L210 43.3Z" fill="#202022" stroke="#202022"></path><path d="M243 29.3L257 7.7L215 0Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M267 -10.3L257 7.7L300 0Z" fill="#202022" stroke="#202022"></path><path d="M98 52L84 85.7L92 82.7Z" fill="#811b1e" stroke="#811b1e"></path><path d="M92 82.7L84 85.7L106 118.7Z" fill="#76171a" stroke="#76171a"></path><path d="M158 0L109 32.3L201 57.7Z" fill="#2b2b2d" stroke="#2b2b2d"></path><path d="M39 52.3L79 89L84 85.7Z" fill="#a2262b" stroke="#a2262b"></path><path d="M84 85.7L79 89L106 118.7Z" fill="#610f12" stroke="#610f12"></path><path d="M125 208L142 218.3L164 208Z" fill="#353638" stroke="#353638"></path><path d="M164 208L142 218.3L217 208Z" fill="#414143" stroke="#414143"></path><path d="M117 190.3L125 208L164 208Z" fill="#252527" stroke="#252527"></path><path d="M82 207.3L125 208L117 190.3Z" fill="#6b1316" stroke="#6b1316"></path><path d="M252 179.3L295 195.3L272 128Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M300 208L295 195.3L252 179.3Z" fill="#464749" stroke="#464749"></path><path d="M328 150.7L328 136L272 128Z" fill="#202022" stroke="#202022"></path><path d="M328 57.7L243 29.3L274 87.7Z" fill="#3b3b3d" stroke="#3b3b3d"></path><path d="M79 89L70 145.7L90 139.3Z" fill="#4d0807" stroke="#4d0807"></path><path d="M90 139.3L70 145.7L117 190.3Z" fill="#a2262b" stroke="#a2262b"></path><path d="M295 195.3L328 150.7L272 128Z" fill="#464749" stroke="#464749"></path><path d="M328 57.7L274 87.7L312 113.7Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M257 7.7L267 -10.3L215 0Z" fill="#464749" stroke="#464749"></path><path d="M215 0L268 -16.3L158 0Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M328 136L328 57.7L312 113.7Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M142 218.3L300 208L217 208Z" fill="#464749" stroke="#464749"></path><path d="M217 208L300 208L252 179.3Z" fill="#2b2b2d" stroke="#2b2b2d"></path><path d="M295 195.3L328 187.3L328 150.7Z" fill="#202022" stroke="#202022"></path><path d="M300 0L268 -16.3L267 -10.3Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M267 -10.3L268 -16.3L215 0Z" fill="#161618" stroke="#161618"></path><path d="M268 -16.3L105 0L158 0Z" fill="#161618" stroke="#161618"></path><path d="M158 0L105 0L109 32.3Z" fill="#252527" stroke="#252527"></path><path d="M109 32.3L64 31.7L98 52Z" fill="#570c0d" stroke="#570c0d"></path><path d="M98 52L64 31.7L84 85.7Z" fill="#570c0d" stroke="#570c0d"></path><path d="M268 -16.3L100 0L105 0Z" fill="#252527" stroke="#252527"></path><path d="M105 0L100 0L109 32.3Z" fill="#76171a" stroke="#76171a"></path><path d="M328 57.7L300 0L243 29.3Z" fill="#464749" stroke="#464749"></path><path d="M328 15.3L303 0L300 0Z" fill="#414143" stroke="#414143"></path><path d="M300 0L303 0L268 -16.3Z" fill="#414143" stroke="#414143"></path><path d="M315 208L328 187.3L295 195.3Z" fill="#2b2b2d" stroke="#2b2b2d"></path><path d="M70 145.7L82 207.3L117 190.3Z" fill="#6b1316" stroke="#6b1316"></path><path d="M125 208L82 207.3L142 218.3Z" fill="#3b3b3d" stroke="#3b3b3d"></path><path d="M142 218.3L315 208L300 208Z" fill="#252527" stroke="#252527"></path><path d="M300 208L315 208L295 195.3Z" fill="#202022" stroke="#202022"></path><path d="M74 0L64 31.7L109 32.3Z" fill="#4d0807" stroke="#4d0807"></path><path d="M79 89L0 97.3L70 145.7Z" fill="#570c0d" stroke="#570c0d"></path><path d="M328 57.7L328 15.3L300 0Z" fill="#1b1b1d" stroke="#1b1b1d"></path><path d="M142 218.3L328 208L315 208Z" fill="#ae2a30" stroke="#ae2a30"></path><path d="M315 208L328 208L328 187.3Z" fill="#353638" stroke="#353638"></path><path d="M100 0L74 0L109 32.3Z" fill="#811b1e" stroke="#811b1e"></path><path d="M268 -16.3L74 0L100 0Z" fill="#570c0d" stroke="#570c0d"></path><path d="M31 179.7L64 208L70 145.7Z" fill="#570c0d" stroke="#570c0d"></path><path d="M70 145.7L64 208L82 207.3Z" fill="#6b1316" stroke="#6b1316"></path><path d="M82 207.3L64 208L142 218.3Z" fill="#76171a" stroke="#76171a"></path><path d="M328 15.3L328 0L303 0Z" fill="#4c4d4f" stroke="#4c4d4f"></path><path d="M303 0L328 0L268 -16.3Z" fill="#6b1316" stroke="#6b1316"></path><path d="M0 54.7L39 52.3L0 0Z" fill="#a2262b" stroke="#a2262b"></path><path d="M64 31.7L39 52.3L84 85.7Z" fill="#811b1e" stroke="#811b1e"></path><path d="M0 152.7L31 179.7L70 145.7Z" fill="#76171a" stroke="#76171a"></path><path d="M31 179.7L35 208L64 208Z" fill="#76171a" stroke="#76171a"></path><path d="M64 208L35 208L142 218.3Z" fill="#6b1316" stroke="#6b1316"></path><path d="M0 80L0 97.3L39 52.3Z" fill="#570c0d" stroke="#570c0d"></path><path d="M39 52.3L0 97.3L79 89Z" fill="#76171a" stroke="#76171a"></path><path d="M31 179.7L0 208L35 208Z" fill="#811b1e" stroke="#811b1e"></path><path d="M0 54.7L0 80L39 52.3Z" fill="#4d0807" stroke="#4d0807"></path><path d="M0 97.3L0 152.7L70 145.7Z" fill="#811b1e" stroke="#811b1e"></path><path d="M0 0L39 52.3L64 31.7Z" fill="#811b1e" stroke="#811b1e"></path><path d="M0 152.7L0 165.3L31 179.7Z" fill="#a2262b" stroke="#a2262b"></path><path d="M0 0L-13 53L0 54.7Z" fill="#440500" stroke="#440500"></path><path d="M0 54.7L-13 53L0 80Z" fill="#76171a" stroke="#76171a"></path><path d="M0 80L-13 53L0 97.3Z" fill="#440500" stroke="#440500"></path><path d="M0 97.3L-13 53L0 152.7Z" fill="#440500" stroke="#440500"></path><path d="M0 152.7L-13 53L0 165.3Z" fill="#76171a" stroke="#76171a"></path><path d="M-13 53L0 208L0 165.3Z" fill="#ae2a30" stroke="#ae2a30"></path><path d="M0 165.3L0 208L31 179.7Z" fill="#6b1316" stroke="#6b1316"></path><path d="M35 208L0 208L142 218.3Z" fill="#811b1e" stroke="#811b1e"></path><path d="M74 0L0 0L64 31.7Z" fill="#6b1316" stroke="#6b1316"></path><path d="M268 -16.3L0 0L74 0Z" fill="#ae2a30" stroke="#ae2a30"></path></g></svg>
      <div className='py-5 pl-5 pr-4'>
        <div className='overflow-hidden absolute right-7 top-[5.85rem] scale-[4.5] scale-y-[5] h-[0.4rem] w-1.5'>
          <SiContactlesspayment className='text-white relative bottom-[0.285rem] right-[0.16rem]' />
        </div>
        <Image className='w-18 absolute bottom-[1.425rem] right-[0.78rem]' priority height='50' width='50' src='/images/Visa.png' alt='' />
        <Image className='w-12 absolute top-18' height='50' width='50' src='/images/Credit Card Chip.png' alt='' />
        <h1 className='metallic text-[1rem] w-[17rem] absolute bottom-16 ml-1 tracking-widest pointer-events-auto cursor-pointer'>{props.secretCardNumber === '' ? '**** ****  ****  3517': props.secretCardNumber}</h1>
        <div className='flex justify-center text-xs absolute left-24 ml-1 bottom-8 scale-75 pointer-events-auto'>
          <h1 className='metallic'>VALID <span className='flex items-center'>THRU <IoMdArrowDropright className='relative top-[0.075rem] scale-x-200'/></span></h1>
          <h1 className='metallic relative top-4 w-12 cursor-pointer'>{props.cardDetails.expiryDate === ''? '02/21': props.cardDetails.expiryDate}</h1>
        </div>
        <h1 className='metallic text-xs absolute bottom-4 tracking-widest pointer-events-auto w-28 uppercase cursor-pointer'>{props.cardDetails.cardholderName === ''? 'JOHN CARTER': props.cardDetails.cardholderName}</h1>
      </div>
    </div>
  )
}

export default CreditCardFront;