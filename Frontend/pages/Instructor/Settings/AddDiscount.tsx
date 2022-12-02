import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '../../../components/shared/Input/Input';
import { BsCalendar } from 'react-icons/bs';

type Props = {}

const AddDiscount = (props: Props) => {

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  useEffect(() => {
    console.log(startDate);
  }, [startDate])

  return (
    <Layout>
      <div className='sb-max:min-w-fit mx-48'>
        <Input placeholder='Course Title' />
        <div className='flex justify-around px-2 mt-8'>
            <DateInput placeholder='Choose Start Date' date={startDate} setDate={setStartDate} />
            <DateInput placeholder='Choose End Date' date={endDate} setDate={setEndDate} />
        </div>
      </div>
    </Layout>
  )
}

type DateProps = {
  placeholder: string,
  date: any,
  setDate: any,
}

const DateInput = (props: DateProps) => {
  return (
    <div className='relative flex items-center'>
      <input className='pl-2 h-12 bg-transparent rounded-md border-2 border-input' type='text' placeholder={props.placeholder} />
      <button className='absolute right-2 hover:text-canadian-red transition-all duration-300'><BsCalendar /></button>
      <Calendar minDate={new Date()} className='absolute left-4 rounded-xl top-10 shadow-md hidden' value={props.date} onChange={props.setDate} />
    </div>
  );
}

export default AddDiscount;