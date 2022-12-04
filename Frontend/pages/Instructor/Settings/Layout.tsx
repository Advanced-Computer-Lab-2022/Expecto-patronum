import React, { ReactNode } from 'react';
import SettingsNavigation from '../../../components/Instructor/SettingsNavigation/SettingsNavigation';
import MainLayout from '../Layout';

type Props = {
    children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <MainLayout>
        <SettingsNavigation />
        {props.children}
    </MainLayout>
  )
}

export default Layout;