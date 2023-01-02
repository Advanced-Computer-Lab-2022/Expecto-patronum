import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
    count: number,
    isViewList: boolean,
}


const InstructorCourseCardSkeleton = (props: Props) => {
  return (
    <div>
            {
                Array(props.count).fill(0).map((_, index) => (
                    <div key={index} className={`${!props.isViewList ? 'flex-col h-96 pt-2': 'sb-max:flex-col sb-max:h-96 sb-max:pt-2 h-56'} flex items-center relative bg-white rounded-xl mb-10 shadow-md justify-between w-full px-8`}>
                            <div className={`${!props.isViewList ? 'w-full pr-18 ml-20 right-10' : 'sb-max:w-full sb-max:pr-18 sb-max:ml-20 sb-max:right-10 w-64'} relative`}>
                                <Skeleton count={3} height={20} className={!props.isViewList ? 'my-2' : 'my-2.5 sb-max:my-2'}/>
                            </div>
                            <div className={`${!props.isViewList ? 'mb-8': 'sb:ml-12 sb:mr-44 sb-max:mb-8'} w-full`}>
                                <Skeleton count={4} height={24} className={!props.isViewList ? 'my-2.5' : 'my-1.5 sb-max:my-2.5'} />
                            </div>
                            <div className='absolute right-0 top-0 flex items-center space-x-4'>
                                <Skeleton className={`${!props.isViewList ? '-right-11 top-32' : 'right-8 top-1.5 sb-max:-right-11 sb-max:top-32'} absolute`} width={65} height={16} />
                                <Skeleton className={`${!props.isViewList ? 'right-4' : 'right-8 sb-max:right-4'} absolute top-1.5`} width={45} height={25} />
                            </div>
                    </div>
                ))
            }
    </div>
  )
}

export default InstructorCourseCardSkeleton;