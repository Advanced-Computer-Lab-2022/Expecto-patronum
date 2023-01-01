import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import Input from '../../components/shared/Input/Input';
import SideBar from '../../components/AdminTool/SideBar';
import Layout from './Layout';
import { ApiUrl } from '../../constants/constants';


const index = () => {

  useEffect(() => {
    axios.get(`${ApiUrl}/Admin`, { withCredentials: true }).then((res) => {
      console.log("/////////////////////////////////")
      console.log(res.data)
      console.log("/////////////////////////////////")

    }
    )
  }, [])


  return (
    <Layout>
    </Layout>
  )
}


export default index;
