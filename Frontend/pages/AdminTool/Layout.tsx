import React, { ReactNode } from 'react';
import SideBar from '../../components/AdminTool/SideBar';
import Sidebar from '../../components/Instructor/Sidebar/Sidebar';

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <aside>
    <div className="flex">
      <SideBar></SideBar>
      <div className='overflow-hidden sb-max:w-without-instructor-sidebar-closed sb:w-without-instructor-sidebar'>
          {props.children}
        </div>
    </div>
    <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
    </aside>
  )
}

export default Layout;