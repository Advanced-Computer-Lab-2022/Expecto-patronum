import React, { useRef } from 'react'
import CourseIcon from '../../components/Instructor/AddNewCourse/CourseIcon/CourseIcon';
import CourseInfo from '../../components/Instructor/AddNewCourse/CourseInfo/CourseInfo';
import FormNavigation from '../../components/Instructor/AddNewCourse/FormNavigation/FormNavigation';
import CreateCourse from '../../components/Instructor/CreateCourse/CreateCourse';
import Layout from './Layout';

type Props = {}

const AddNewCourse = (props: Props) => {

    const courseForm = useRef<any>();

  return (
    <Layout>
        <form className='sb-max:min-w-fit' ref={courseForm}>
          <CourseInfo />
          <CourseIcon />
          <FormNavigation />
        </form>
    </Layout>
  )
}

export default AddNewCourse;