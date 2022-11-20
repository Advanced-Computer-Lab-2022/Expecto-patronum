import React, { useContext } from 'react';
import { AddNewCourseContext } from '../../../../pages/Instructor/AddNewCourse';
import SubtitleAlt from '../../SubtitleAlt/SubtitleAlt';

type Props = {}

const CourseSubtitles = React.forwardRef((props: Props, ref) => {

  const { subtitles, setSubtitles } = useContext(AddNewCourseContext);

  return (
    <div ref={ref as any} className='hidden'>
        <h1 className='text-center text-3xl py-6 bg-main relative z-10'>Add Subtitles</h1>
        <hr />
        <p className='text-gray-700 mx-auto pt-3 pb-6'>In this section you are required to add the subtitles for each part of the course where every subtitle is categorized into multiple contents.
            (e.g. A subtitle can contain 'Introduction' & 'What to do next' as content titles for every part of the course).
            Please note that a course must have at least 3 subtitles and each subtitle must have at least 4 contents/categories/parts.
            Please ensure to fill in the fields with the required format, otherwise this may result in inconsistent information of your course.
        </p>
        <hr className='mb-2'/>
        <SubtitleAlt subtitles={subtitles} setSubtitles={setSubtitles} />
    </div>
  )
})

export default CourseSubtitles;