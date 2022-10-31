import { type } from 'os';
import React, { useState, useRef, RefObject, createRef } from 'react'

interface Props {
    type?: string,
    required?: boolean,
    placeholder?: string,
    style?: string,
    inputDivStyle?: string,
    labelStyle?: string,
    enum?: Array<string>,
    title?: string,
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
}

const Input = React.forwardRef((props: Props, ref) => {

    const labelRef = useRef<any>();

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
    
  if(props.type === "textarea") {

    const [characterLeft, setCharacterLeft] = useState(250);

    return (
        <div className={props.inputDivStyle + ' p-2'}> 
            <label ref={labelRef} className={props.labelStyle + ' create-course-input-label relative h-4 whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 text-gray-400 left-3 bg-navbar px-1'}>{props.placeholder}</label>
            <textarea ref={ref as any}  required onChange={(e) => setCharacterLeft(250 - e.target.value.length)} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} maxLength={250} className='create-course-input h-39 py-2 focus:outline-none resize-none w-full transition-bg text-white bg-transparent rounded-lg pl-2 shadow-lg border-2 border-navlink-bg'></textarea>
            <label className='relative text-sm text-gray-400 bottom-0 mr-3 float-right'>{characterLeft} character{characterLeft === 1 ? "": "s"} left</label>
        </div>
    )

  } else if(props.type === "radio") {
    
    return (
        <div onInput={() => labelRef.current.style.color = "rgb(156, 163, 175)"} className={(props.required ? ' create-course-input': "") + ' w-fit row justify-center mx-auto pt-4 min-w-form-input'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label': "") + ' text-gray-400 text-center pb-2'}>{props.title}</label>
            <div className='row'>
                {props.enum?.map((item) => {
                    return (
                        <div key={item} className={props.inputDivStyle + ' col-3 text-center px-0 mx-0 py-2'}>
                            <input ref={ref as any} type="radio" name={props.placeholder + "-button"} className={props.style + ' checked:border-8 checked:border-navbar checked:bg-navlink-bg transition-all duration-300 h-8 w-8 bg-transparent shadow-radio-button rounded-half border-navlink-bg border-radio-border-width appearance-none'}></input>
                            <br />
                            <label className={props.labelStyle + ' pointer-events-none text-gray-400 text-xs h-4 px-1'}>{item}</label>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )

  } else {
    
    return (
        <div className={props.inputDivStyle + ' w-auto p-2 min-w-form-input'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label ': "") + props.labelStyle + ' relative whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 text-gray-400 h-4 left-2 bg-navbar px-1'}>{props.placeholder}</label>
            <input ref={ref as any} type={props.type} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} className={props.style + (props.required ? ' create-course-input': "") + ' focus:outline-none appearance-none w-full transition-bg text-white bg-transparent rounded-lg pl-2 shadow-lg border-2 h-12 border-navlink-bg'}></input>
        </div>
    )

  }
})

Input.defaultProps = defaultProps;
export default Input;