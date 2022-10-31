import React, { useRef } from 'react';
import CreateCourse from '../components/CreateCourse/CreateCourse';

type Props = {}

const Instructor = (props: Props) => {

    const courseForm = useRef<any>();

    function openCreateCourse() {
        courseForm.current.classList.remove("hidden");
    }

  return (
    <div className='bg-cover text-center w-full h-800 bg-no-repeat' style={{backgroundImage: "url('/images/CreateCourseBg.jpg')"}}>
        <button onClick={openCreateCourse} className="rounded-lg hover:bg-searchFocus my-4 p-4 text-white bg-navlink-bg border-searchFocus border-2">Add A New Course</button>
        <CreateCourse ref={courseForm} />
    </div>
  )
}

export default Instructor;