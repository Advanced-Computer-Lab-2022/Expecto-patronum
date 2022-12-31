import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from './Layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '../../../components/shared/Input/Input';
import { MdCalendarToday } from 'react-icons/md';
import axios from 'axios';
import classNames from 'classnames';
import { PopupMessageContext } from '../../_app';

type Props = {}

const AddDiscount = (props: Props) => {

  const { viewPopupMessage } = useContext(PopupMessageContext);

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const [courses, setCourses] = useState<any>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [input, setInput] = useState<any>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [courseID, setCourseID] = useState<any>(undefined);

  const selectCourseRef = useRef<any>();
  const coursesDropdownRef = useRef<any>();

  const router = useRouter();
  const data = router.query

  useEffect(() => {
    const getCourses = async () => {
      axios.defaults.withCredentials = true;
      await axios.get("http://localhost:5000/Instructor/searchCourses", {
        params: {
          instructorID: '63877fb65c8dac5284aaa3c2',
        },
      }).then((res: { data: any }) => {
        setCourses(res.data);
        if(data.courseID !== undefined) {
          var currentCourse = (res.data).filter((course: any) => course._id === data.courseID);
          setInput(currentCourse[0].title);
          setCourseID(data.courseID);
          selectCourseRef.current.children[1].value = currentCourse[0].title;
          coursesDropdownRef.current.classList.add('hidden');
          selectCourseRef.current.children[0].style.top = "0.55rem";
          selectCourseRef.current.children[0].style.color = "black";
          selectCourseRef.current.children[0].style.fontSize = "0.86rem";
          selectCourseRef.current.children[0].style.transition = "font-size 0.3s, top 0.3s, color 0.3s linear 0.3s";
        }
      });
    }

    getCourses();
  }, [])

  useEffect(() => {
    setSearchResults(courses?.filter((course: any) => course.title.toLowerCase().includes(input.toLowerCase())));
  }, [courses, input])

  async function submitDiscount() {

    if(courseID === undefined || startDate === undefined || endDate === undefined || discount === undefined) {
      viewPopupMessage(false, "Please fill in the required fields.");
      return; 
    }

    axios.defaults.withCredentials = true;
      await axios.post("http://localhost:5000/Instructor/discount", {
          instructorID: '63877fb65c8dac5284aaa3c2',
          courseID: courseID,
          discount: discount,
          startDate: startDate,
          endDate: endDate,
      }).then((res: { data: any }) => {
        console.log(res.data);
        viewPopupMessage(true, "Discount has been added successfully.");
      });

    // console.log(courseID);
    // console.log(startDate);
    // console.log(endDate);
    // console.log(discount);
  }

  const selectCourse = (e: any) => {
    if(e.target.value === '') {
      coursesDropdownRef.current.classList.add('hidden');
    } else {
      coursesDropdownRef.current.classList.remove('hidden');
    }
    setInput(e.target.value);
    setCourseID(undefined);
  }

  function chooseCourse(course: any) {
    setInput(course.title);
    setCourseID(course._id);
    selectCourseRef.current.children[1].value = course.title;
    coursesDropdownRef.current.classList.add('hidden');
  }

  return (
    <Layout>
      <div className='sb-max:min-w-without-instructor-sidebar-closed sb-max:px-3 sb:mx-48 text-center'>
        <div className='relative'>
          <Input placeholder='Course Title' ref={selectCourseRef} onChange={selectCourse} />
          <div ref={coursesDropdownRef} className='hidden flex-col absolute left-4 overflow-y-scroll h-fit max-h-[20rem] w-96 bg-main z-50 rounded-2xl py-3 border-1.5'>
            {
              searchResults?.map((course: any, index: any) => (
                <button key={index} className='relative mx-auto w-full hover:bg-canadian-red hover:text-white rounded-full' onClick={() => chooseCourse(course)}>{course.title}</button>
              ))
            }
          </div>
        </div>
        <div className='space-y-4 mt-4'>
            <Input onChange={(e: any) => setDiscount(e.target.value)} placeholder='Discount %' inputDivStyle='relative bottom-2' />
            <div className='flex justify-between items-center row mx-0 sb-max:space-y-4'>
              <DateInput placeholder='Choose Start Date' date={startDate} setDate={setStartDate} />
              <DateInput placeholder='Choose End Date' date={endDate} setDate={setEndDate} minDate={startDate} />
            </div>
        </div>
        <button onClick={submitDiscount} className={submitButton} id='submit-btn'>
          <span /><span /><span /><span />
          Confirm Changes
        </button>
      </div>
    </Layout>
  )
}
const submitButton = classNames('mt-4 text-lg hover:bg-[#0B80F3] hover:text-white hover:rounded-md h-10 py-2 px-4 font-medium text-[#0B80F3] bg-transparent');


type DateProps = {
  placeholder: string,
  date: any,
  setDate: any,
  minDate?: any,
}

const DateInput = (props: DateProps) => {

  const calendarRef = useRef<any>();

  const toggleCalendar = () => {
    calendarRef.current.children[0].classList.toggle('scale-[85%]');
    calendarRef.current.children[0].classList.toggle('scale-0');
  }
   
  return (
    <div className='relative col-12 col-md-6 p-2'>
      <div className='relative w-full flex items-center' onClick={toggleCalendar}>
        <input className='pl-2 pr-8 w-full h-12 bg-transparent rounded-lg border-1.5 focus:border-[#0B80F3] border-[#A7AEC2] cursor-pointer' disabled type='text' placeholder={props.placeholder} value={props.date?.toLocaleDateString() || ''} />
        <button className='absolute right-2 hover:text-[#0B80F3] transition-all duration-300 scale-125'><MdCalendarToday /></button>
      </div>
      <div ref={calendarRef}>
        <Calendar minDate={props.minDate ? props.minDate :new Date()} className='absolute min-w-fit -left-4 rounded-xl top-9 shadow-md scale-0 transition-all duration-200 ease-in-out z-10' value={props.date ? (props.date < props.minDate ? props.minDate: props.date): props.minDate} onChange={props.setDate} />
      </div>
    </div>
  );
}

export default AddDiscount;