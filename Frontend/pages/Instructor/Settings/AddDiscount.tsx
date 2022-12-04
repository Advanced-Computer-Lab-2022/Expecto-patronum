import React, { useEffect, useRef, useState } from 'react'
import Layout from './Layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '../../../components/shared/Input/Input';
import { BsCalendar } from 'react-icons/bs';
import { MdCalendarToday } from 'react-icons/md';

type Props = {}

const AddDiscount = (props: Props) => {

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  return (
    <Layout>
      <div className='sb-max:min-w-fit mx-48'>
        <Input placeholder='Course Title' />
        <div className='flex justify-around items-center px-2 mt-4'>
            <Input placeholder='Discount %' inputDivStyle='h-12' />
            <DateInput placeholder='Choose Start Date' date={startDate} setDate={setStartDate} />
            <DateInput placeholder='Choose End Date' date={endDate} setDate={setEndDate} minDate={startDate} />
        </div>
      </div>
    </Layout>
  )
}

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
    <div className='relative p-2'>
      <div className='relative flex items-center' onClick={toggleCalendar}>
        <input className='pl-2 pr-8 h-12 bg-transparent rounded-lg border-2 border-input cursor-pointer' disabled type='text' placeholder={props.placeholder} value={props.date?.toLocaleDateString()} />
        <button className='absolute right-2 hover:text-canadian-red transition-all duration-300 scale-125'><MdCalendarToday /></button>
      </div>
      <div className='w-full' ref={calendarRef}>
        <Calendar minDate={props.minDate ? props.minDate :new Date()} className='absolute min-w-fit -left-4 rounded-xl top-7 shadow-md scale-0 transition-all duration-200 ease-in-out' value={props.date ? (props.date < props.minDate ? props.minDate: props.date): props.minDate} onChange={props.setDate} />
      </div>
    </div>
  );
}

export default AddDiscount;