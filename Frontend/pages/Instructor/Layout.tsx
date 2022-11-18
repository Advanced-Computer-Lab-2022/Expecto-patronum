import React, { ReactNode } from 'react'
import InstructorSidebar from '../../components/shared/InstructorSidebar/InstructorSidebar'

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <div className='flex relative'>
        <InstructorSidebar />
        <div className='overflow-hidden sb-max:w-without-instructor-sidebar-closed sb:w-without-instructor-sidebar p-8 pt-2'>
          {props.children}
        </div>
    </div>
  )
}

export default Layout;