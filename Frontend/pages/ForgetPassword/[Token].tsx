import axios from 'axios';
import Router, { useRouter } from 'next/router';
import React from 'react'
import ResetPassword from '../../components/ForgetPassword/ResetPassword';
import { ApiUrl } from '../../constants/constants';

type Props = {
  data:[
    VerfiyTokendata:{Error:boolean,Message:string},
    token:string
  ]}


const Token = (props: Props) => {
  let {Error,Message}=props.data[0];
  let token=props.data[1];
  if(!Error){
    return (
      <div>
        <ResetPassword token={token}></ResetPassword>
      </div>
    )
  }
  else{
    return (
      <div>
        <h1>{Message}</h1>
      </div>
    )
  }

}


export async function getServerSideProps(UrlInfo: { resolvedUrl: string }) {
  let res = await fetch (ApiUrl+"/User/forgetPassword/"+UrlInfo.resolvedUrl.split("/")[2]);
  let VerfiyTokendata=await res.json();
  return {
    props: {
      data:[VerfiyTokendata,UrlInfo.resolvedUrl.split("/")[2]],
    },
  };
}

export default Token