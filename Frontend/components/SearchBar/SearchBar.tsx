import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <form className='flex items-center'>
        <input className='rounded-full w-52 h-8 bg-navlink-bg' placeholder='Start Hacking'/>
        <button type='submit'>
            <BiSearchAlt2 className='text-white z-10 scale-150 relative right-7 rotate-90' />
        </button>
    </form>
  )
}

export default SearchBar;