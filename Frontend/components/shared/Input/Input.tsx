import React, { useState, useRef } from 'react'

interface Props {
    placeholder?: string,
    height?: string,
    required?: boolean
}

const defaultProps: Props = {
    placeholder: '',
    height: 'h-12',
    required: false
}

const Input: React.FC<Props> = (props) => {

    const labelRef = useRef<any>();
    const inputRef = useRef<any>();

    function moveLabel() {
        labelRef.current.style.bottom = "3.65rem";
        labelRef.current.style.color = "rgb(255, 255, 255)";
        labelRef.current.style.fontSize = "0.86rem";
        labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
    }

    function returnToInitial(e: React.FocusEvent<HTMLInputElement, Element>) {
        if(e.target.value === "") {
            labelRef.current.style.bottom = "2.25rem";
            labelRef.current.style.color = "rgb(156, 163, 175)";
            labelRef.current.style.fontSize = "initial";
            labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
        }
    }

  return (
    <div className='w-full p-2 min-w-form-input'>
        <input ref={inputRef} type="text" onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} className={props.height + (props.required ? ' create-course-input': "") + ' focus:outline-none w-full transition-bg duration-1000 text-white bg-transparent rounded-lg pl-2 shadow-lg border-2 h-12 border-navlink-bg'}></input>
        <label ref={labelRef} className={(props.required ? 'create-course-input-label': "") + ' relative whitespace-nowrap block w-fit pointer-events-none rounded-lg bottom-9 text-gray-400 h-4 left-3 bg-navbar px-1 duration-1000'}>{props.placeholder}</label>
    </div>
  )
}

Input.defaultProps = defaultProps;
export default Input;