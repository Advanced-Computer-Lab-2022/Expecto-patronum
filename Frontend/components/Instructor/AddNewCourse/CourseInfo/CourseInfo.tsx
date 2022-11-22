import React, { useContext, useEffect, useRef } from 'react';
import { AddNewCourseContext } from '../../../../pages/Instructor/AddNewCourse';
import Input from '../../../shared/Input/Input';

type Props = {}

const CourseInfo = React.forwardRef((props: Props, ref) => {

  const { newCourseInfo, setNewCourseInfo } = useContext(AddNewCourseContext);

  const getTitle = (e: any) => {
    const info = newCourseInfo;
    info.title = e.target.value;
    setNewCourseInfo(info);
  }

  const getSubject = (e: any) => {
    const info = newCourseInfo;
    info.subject = e.target.value;
    setNewCourseInfo(info);
  }

  const getPrice = (e: any) => {
    const info = newCourseInfo;
    info.price = e.target.value;
    setNewCourseInfo(info);
  }

  const getSummary = (e: any) => {
    const info = newCourseInfo;
    info.summary = e.target.value;
    setNewCourseInfo(info);
  }

  const getCourseVideoURL = (e: any) => {
    const info = newCourseInfo;
    info.courseVideoURL = e.target.value;
    setNewCourseInfo(info);
  }


  const getLevel = (selectedRadio: any) => {
    const info = newCourseInfo;
    info.level = selectedRadio;
    setNewCourseInfo(info);
  }

  return (
    <div ref={ref as any}>
      <h1 className='text-center text-3xl py-4 text-black'>Fill Course Information</h1>
      <hr />
      <Input onChange={getTitle} required placeholder={"Title"} />
      <div className='row mx-0 relative'>
        <Input onChange={getSubject} inputDivStyle='col-12 col-md-6' required placeholder={"Subject"} />
        <div className='col-12 col-md-6 px-0'>
          <label className='text-gray-400 absolute ml-4 mt-9 pt-px'>$</label>
          <Input onChange={getPrice} inputDivStyle='min-w-[6rem]' type="number" labelStyle="ml-3" required placeholder={"Price"} />
        </div>
      </div>
      <Input onChange={getCourseVideoURL} placeholder={"Course Video URL"} />
      <Input onChange={getSummary} type='textarea' placeholder={"Summary"} />
      <Input onChange={getLevel} type='radio' title='Select Level' enum={['Beginner', 'Intermediate', 'Advanced', 'All Levels']} placeholder={"Level"} />
    </div>
  )
})

export default CourseInfo;