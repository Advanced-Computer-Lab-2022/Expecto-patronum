import { useRouter } from 'next/router';
import React from 'react'
import RequestComp from '../../components/Request/RequestComp'

type Props = {}

const Request = (props: Props) => {
  const router = useRouter();
  const { Type } = router.query;

  return (
    <RequestComp Type={typeof Type == 'string' && Type == 'Refund' || Type == 'Report' ? Type : 'Refund'}></RequestComp>
  )
}

export default Request