import { GetServerSidePropsContext } from 'next/types'
import React from 'react'
import CertficateTemplate from '../../components/UserCourse/WatchContent/CertficateTemplate'

type Props = {
  data: boolean
}

const Certificate = (props: Props) => {
  return (

    <CertficateTemplate SendEmail={props.data}></CertficateTemplate>
  )
}

export default Certificate


export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { SendEmail } = context.query;
  if (!SendEmail) {
    return {
      props: {
        data: false,
      },

    }

  }
  return {
    props: {
      data: SendEmail,
    },


  }

}