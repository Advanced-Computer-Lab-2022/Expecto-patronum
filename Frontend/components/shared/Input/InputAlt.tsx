import React, { useState, useRef } from 'react';

interface Props {
    type?: string,
    required?: boolean,
    placeholder?: string,
    style?: string,
    inputDivStyle?: string,
    labelStyle?: string,
    enum?: Array<string>,
    title?: string,
    onChange?: any,
    onClick?: any,
    value?: any,
    name?: string,
}

const defaultProps: Props = {
    type: "text",
    required: false,
    placeholder: '',
    style: '',
    inputDivStyle: "",
    labelStyle: "",
    enum: [""],
    title: "",
    onChange: null,
    onClick: null,
    value: null,
    name: "",
}

const InputAlt = (props: Props) => {

    const labelRef = useRef<any>();
    const [characterLeft, setCharacterLeft] = useState(250);

    function moveLabel() {
        labelRef.current.style.top = "0.45rem";
        labelRef.current.style.color = "rgb(255, 255, 255)";
        labelRef.current.style.fontSize = "0.86rem";
        labelRef.current.style.transition = "font-size 0.3s, top 0.3s, color 0.3s linear 0.3s";
    }

    function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element> | React.FocusEvent<HTMLInputElement, Element>) {
        if(e.target.value === "") {
            labelRef.current.style.top = "1.75rem";
            labelRef.current.style.color = "rgb(156, 163, 175)";
            labelRef.current.style.fontSize = "initial";
            labelRef.current.style.transition = "font-size 0.3s, top 0.3s, color 0.3s linear 0.3s";
        }
        
    }

  return (
    <div className={props.inputDivStyle + ' w-auto p-2 min-w-[8.9rem]'}>
        <label ref={labelRef} className={(props.required ? 'create-course-input-label ': "") + props.labelStyle + ' relative whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 text-gray-400 h-4 left-2 bg-navbar px-1'}>{props.placeholder}</label>
        <input type={props.type} name={props.name} value={props.value} onClick={props.onClick} onChange={props.onChange} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} className={props.style + (props.required ? ' create-course-input': "") + ' focus:outline-none appearance-none w-full transition-bg text-white bg-transparent rounded-lg pl-2 shadow-lg border-2 h-12 border-navlink-bg'}></input>
    </div>
  )
}

export default InputAlt;