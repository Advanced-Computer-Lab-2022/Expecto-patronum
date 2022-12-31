import React from 'react';
import RequestComp from '../../components/Request/RequestComp';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import Layout from './Layout';

type Props = {}

const Support = (props: Props) => {
  return (
    <Layout>
      <RequestComp Type={'Report'} />
      {/* <TermsAndConditions /> */}
    </Layout>
  )
}

export default Support;