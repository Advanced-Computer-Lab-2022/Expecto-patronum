import React, { ReactNode } from 'react'
import InstructorSidebar from '../../components/shared/InstructorSidebar/InstructorSidebar'

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <div className='flex'>
        <InstructorSidebar />
        {props.children}
    </div>
  )
}

export default Layout;