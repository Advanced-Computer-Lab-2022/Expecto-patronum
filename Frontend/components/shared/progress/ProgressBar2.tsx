import React, { useEffect, useRef, useState } from 'react';

type Props = {
    stars: number,
    percentage: number,
}

const ProgressBar2 = (props: Props) => {

    const [color, setColor] = useState<any>();
    const progressRef = useRef<any>();
    
    useEffect(() => {
        switch(props.stars) {
            case 5: setColor('bg-[#4AA54A]');break;
            case 4: setColor('bg-[#A5D631]');break;
            case 3: setColor('bg-[#F7E632]');break;
            case 2: setColor('bg-[#F7A521]');break;
            case 1: setColor('bg-[#EF3A10]');break;
        }
        
        progressRef.current.style.width = (props.percentage*100).toFixed(0) + '%';

    }, [])

  return (
    <div className="w-72 h-3 sb-max:w-52 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden">
        <div ref={progressRef} className={`${color} rounded-l-full transition-all duration-700`} style={{width: '0%'}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
    </div>
  )
}

export default ProgressBar2;