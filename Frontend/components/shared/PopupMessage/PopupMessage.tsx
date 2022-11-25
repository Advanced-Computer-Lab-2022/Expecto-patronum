import React from 'react';
import { GrFormClose } from 'react-icons/gr';

type Props = {
  ticker: any,
  icon: any,
  setIsPopupOpen: any,
}

const PopUpMessage = React.forwardRef((props: Props, ref) => {

  function closeMessage() {
    (ref as any).current.classList.toggle("-right-[21rem]");
    (ref as any).current.classList.toggle("right-2");
    clearTimeout(props.ticker.current);
    props.setIsPopupOpen(false);
  }

  return (
    <div ref={ref as any} className="fixed flex items-center w-[20rem] text-left -right-[21rem] transition-all duration-500 top-22 rounded-md drop-shadow-md shadow-lg h-16 z-30 text-sm whitespace-nowrap bg-white">
        <div className='absolute min-w-[6px] min-h-full rounded-l-md'></div>
        {props.icon}
        <h1 className='text-2xl absolute left-16 top-2 font-bold text-dark'></h1>
        <p className='w-0 mt-4 text-xs text-gray-700 absolute left-16'></p>
        <GrFormClose onClick={closeMessage} className='absolute right-3 top-3 scale-155 opacity-50 hover:opacity-100 hover:scale-160 transition-all duration-200 cursor-pointer' />
    </div>
  )
})

export default PopUpMessage;