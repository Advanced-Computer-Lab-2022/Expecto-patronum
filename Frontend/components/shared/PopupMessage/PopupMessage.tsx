import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';

type Props = {
  ticker: any,
}

const PopUpMessage = React.forwardRef((props: Props, ref) => {

  function closeMessage() {
    (ref as any).current.classList.toggle("-right-[21rem]");
    (ref as any).current.classList.toggle("right-2");
    clearTimeout(props.ticker);
  }

  return (
    <div ref={ref as any} className="fixed flex items-center w-[20rem] text-left -right-[21rem] transition-all duration-500 top-22 rounded-md drop-shadow-md shadow-lg h-16 z-30 text-sm whitespace-nowrap bg-white">
        <div className='absolute min-w-[6px] min-h-full bg-canadian-red rounded-l-md'></div>
        <FiAlertTriangle className='text-red-700 relative left-6 scale-[2.5]' />
        <h1 className='text-2xl relative left-12 bottom-1.5 font-bold text-dark'>Alert</h1>
        <p className='w-0 mt-4 text-xs text-gray-700 relative right-2'></p>
        <GrFormClose onClick={closeMessage} className='absolute right-3 top-3 scale-155 opacity-50 hover:opacity-100 hover:scale-160 transition-all duration-200 cursor-pointer' />
    </div>
  )
})

export default PopUpMessage;