import React from 'react'
import Input from '../../../shared/Input/Input'

type Props = {}

const CourseInfo = (props: Props) => {
  return (
    <div className='tab'>
      <Input required placeholder={"Title"} />
      <div className='row mx-0'>
        <Input inputDivStyle='col-12 col-sm-6' required placeholder={"Subject"} />
        <Input inputDivStyle='col-12 col-sm-6' required placeholder={"Instructor's Name"} />
      </div>
      <label className='text-gray-400 absolute ml-4 mt-9 pt-px'>$</label>
      <Input type="number" labelStyle="ml-3" required placeholder={"Price"} />
      <Input type='textarea' placeholder={"Summary"} />
      <Input type='radio' title='Select Level' enum={['Beginner', 'Intermediate', 'Advanced', 'All Levels']} placeholder={"Level"} />
    </div>
  )
}

export default CourseInfo