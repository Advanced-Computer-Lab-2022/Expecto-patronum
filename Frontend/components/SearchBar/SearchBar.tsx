import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <form className='flex items-center'>
        <input className='rounded-full text-white nv-max:hidden w-96 h-8 pl-2.5 bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 transition-outline-width duration-200 focus:outline focus:outline-2 outline-searchFocus' placeholder='Search for anything'/>
        <button className='rounded-full nv-max:bg-white bg-navlink-bg p-2 relative right-8' type='submit'>
            <BiSearchAlt2 className='text-white z-10 nv-max:text-navlink-bg scale-150 hover:scale-160 transition-all duration-200 rotate-90' />
        </button>
    </form>
  )
}

export default SearchBar;