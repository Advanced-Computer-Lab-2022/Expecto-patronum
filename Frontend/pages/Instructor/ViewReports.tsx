import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tickets from '../../components/userProfile/Tickets';
import Layout from './Layout';
import { ApiUrl } from '../../constants/constants'

type Props = {}

const ViewReports = (props: Props) => {

    const [ProfileData, SetProfileData] = useState<any>();

    useEffect(() => {
        async function getData() {
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:5000/User/viewProfile', { withCredentials: true });
            SetProfileData(res.data)
        }

        getData();
    }, [])


  return (
    <Layout>
        <Tickets data={ProfileData} />
    </Layout>
  )
}

export default ViewReports;