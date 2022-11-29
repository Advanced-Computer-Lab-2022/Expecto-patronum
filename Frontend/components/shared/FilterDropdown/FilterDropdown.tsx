import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

type Props = {
  filter: any,
  setFilter: any,
  submit: any,
}

const FilterDropdown = (props: Props) => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function setSubject(e: React.ChangeEvent<HTMLInputElement>) {
    const values = {...props.filter};
    values.subject = e.target.value;
    props.setFilter(values);
  }

  const setMinPrice = (e: any) => {
    const values = {...props.filter};
    values.price.min = e.target.value;
    props.setFilter(values);
  }

  const setMaxPrice = (e: any) => {
    const values = {...props.filter};
    values.price.max = e.target.value;
    props.setFilter(values);
  }

  function submitFilter() {
    // const values = {...props.filter};
    // values.subject = subject;
    // values.price.min = minPrice;
    // values.price.max = maxPrice;
    props.submit();
  }

  return (
    <div className='relative z-10'>
      <button className={filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)}><FaFilter className='mr-2 sb-max:mr-0' /><span className='sb-max:hidden'>Filter</span><FiChevronDown className='ml-1' /></button>
      <div className={filterOptions + (isFilterOpen ? ' top-8 h-48 opacity-100': ' top-0 h-0 opacity-0')}>
        <ul className='divide-y-2 space-y-3'>
          <li>
            <label>Subject:</label>
            <input value={props.filter.subject} type='text' onChange={setSubject} className={` ${input}`} />
          </li>
          <li className='pt-1'>
            <label>Price:</label>
            <div className='flex justify-between'>
              <div>
                <label className='text-sm opacity-50'>min: </label>
                <input value={props.filter.price.min} onChange={setMinPrice} className={`w-10 ${input}`} />
              </div>
              <div>
                <label className='text-sm opacity-50'>max: </label>
                <input value={props.filter.price.max} onChange={setMaxPrice} className={`w-10 ${input}`} />
              </div>
            </div>
          </li>
        </ul>
        <button onClick={submitFilter} className='text-main bg-gray-600 hover:text-gray-600 hover:bg-main border-1.5 border-opacity-70 border-gray-700 mt-3 w-20 px-1 py-0.5 left-12 rounded-md relative transition-all duration-200'>Submit</button>
      </div>
    </div>
  )
}

const filterButton = classNames('flex items-center bg-main mx-2 border-opacity-70 text-opacity-70 rounded-md border-1.5 border-gray-700 h-8 p-2 text-gray-700 hover:text-main hover:bg-gray-600 transition-all duration-300');
const filterOptions = classNames('bg-main absolute right-0 z-behind shadow-lg border-1.5 border-gray-500 p-3 rounded-lg mt-1.25 mr-2 transition-all duration-500 overflow-hidden');
const input = classNames('rounded-md shadow-md focus:outline-0 pl-1 border-1.5 border-gray-700 border-opacity-50 bg-transparent focus:shadow-sm hover:shadow-sm transition-all duration-200');

export default FilterDropdown;