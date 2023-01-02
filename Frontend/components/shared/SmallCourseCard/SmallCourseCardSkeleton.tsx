import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
    count: number,
    className?: string,
}

const SmallCourseCardSkeleton: React.FC<Props> = ({count, className}) => {
  return (
    <>
        {
            Array(count).fill(0).map((_: any, index: number) => (
                <div key={index} className={`${className ? `${className + (index == 0 ? '': ' -ml-4')}`: 'mr-4'} rounded-2xl z-10 relative bg-white shadow-md min-w-[14rem] h-[17rem] hover:shadow-lg transition-all duration-200`}>
                    <div>
                    <div className='relative flex h-24 mb-6 justify-center items-center rounded-t-2xl'>
                        <div className='relative bg-white rounded-full top-6 p-3'>
                        <Skeleton circle width={90} height={90} />
                        </div>
                        <p className="absolute italic top-3 text-xs left-4 text-white"><Skeleton height={10} width={60} /></p>
                    </div>
            
                    <div className="px-3 pt-2 flex flex-col justify-between h-32">
                        <div className='space-y-2'>
                            <h1><Skeleton height={20} count={2} /></h1>
                            <p className="text-sm text-gray-500"><Skeleton width={120} /></p>
                        </div>
                        <Skeleton className='mb-3' />
                    </div>
                    </div>
                    <p className="italic text-right absolute bottom-2 right-4"><Skeleton height={14} width={60} /></p>
                </div>
            ))
        }
    </>
  )
}

export default SmallCourseCardSkeleton;