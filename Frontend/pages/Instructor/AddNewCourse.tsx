import React, { useRef } from 'react'
import CreateCourse from '../../components/CreateCourse/CreateCourse';
import Layout from './Layout';

type Props = {}

const AddNewCourse = (props: Props) => {

    const courseForm = useRef<any>();

  return (
    <Layout>
        <CreateCourse ref={courseForm} />
    </Layout>
  )
}

export default AddNewCourse;