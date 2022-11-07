import { type } from 'os';
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
    checked?: boolean,
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
    checked: false,
}

const Input = React.forwardRef((props: Props, ref) => {

    const labelRef = useRef<any>();
    const [characterLeft, setCharacterLeft] = useState(250);

    function moveLabel() {
        labelRef.current.style.top = "0.45rem";
        labelRef.current.style.fontSize = "0.86rem";
        labelRef.current.style.transition = "font-size 0.3s, top 0.3s, color 0.3s linear 0.3s";
    }

    function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element> | React.FocusEvent<HTMLInputElement, Element>) {
        if(e.target.value === "") {
            labelRef.current.style.top = "1.75rem";
            labelRef.current.style.fontSize = "initial";
            labelRef.current.style.transition = "font-size 0.3s, top 0.3s, color 0.3s linear 0.3s";
        }
        
    }
    
  if(props.type === "textarea") {

    return (
        <div ref={ref as any}  className={props.inputDivStyle + (props.required ? ' create-course-input': "") + ' p-2'}> 
            <label ref={labelRef} className={props.labelStyle + (props.required ? ' create-course-input-label ': "") + ' relative h-4 whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 left-3 bg-white px-1'}>{props.placeholder}</label>
            <textarea onChange={(e) => {setCharacterLeft(250 - e.target.value.length); props.onChange}} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} maxLength={250} className={props.style + ' h-39 py-2 focus:outline-none resize-none w-full transition-bg bg-transparent rounded-lg pl-2 shadow-lg border-2 border-navlink-bg'}></textarea>
            <label className='relative text-sm text-gray-400 bottom-0 mr-3 float-right'>{characterLeft} character{characterLeft === 1 ? "": "s"} left</label>
        </div>
    )

  } else if(props.type === "radio") {
    
    return (
        <div ref={ref as any} onInput={() => labelRef.current.style.color = "rgb(156, 163, 175)"} className={(props.required ? ' create-course-input ': "") + ' w-fit row justify-center mx-auto pt-4 min-w-form-input'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label': "") + ' text-gray-400 text-center pb-2'}>{props.title}</label>
            {props.enum?.map((item) => {
                return (
                    <div key={item} className={props.inputDivStyle + ' col-3 text-center px-0 mx-0 py-2'}>
                        <input onChange={props.onChange} type="radio" name={props.placeholder + "-button"} className={props.style + ' checked:border-8 checked:border-white checked:bg-navlink-bg transition-all duration-300 h-8 w-8 bg-transparent shadow-radio-button rounded-half border-navlink-bg border-radio-border-width appearance-none'}></input>
                        <br />
                        <label className={props.labelStyle + ' pointer-events-none text-gray-400 text-xs h-4 px-1'}>{item}</label>
                    </div>
                )
            }
            )}
        </div>
    )

  } else if(props.type === 'checkbox') {
    return (
        <div ref={ref as any} className={props.inputDivStyle + ' flex ml-4 items-center mt-3'}>
            <label className={props.labelStyle + ' pointer-events-none text-xs h-4 whitespace-nowrap px-1'}>{props.placeholder}</label>
            <input onChange={props.onChange} type='checkbox' checked={props.checked} placeholder='Allow Preview' className='h-fit mx-2 align-middle' />
        </div>
    )
  } else {
    
    return (
        <div ref={ref as any} className={props.inputDivStyle + ' w-auto p-2 min-w-form-input'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label ': "") + props.labelStyle + ' relative whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 h-4 left-2 bg-white px-1'}>{props.placeholder}</label>
            <input onChange={props.onChange} type={props.type} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} className={props.style + (props.required ? ' create-course-input': "") + ' focus:outline-none appearance-none w-full transition-bg bg-transparent rounded-lg pl-2 shadow-lg border-2 h-12 border-navlink-bg'}></input>
        </div>
    )

  }
})

Input.defaultProps = defaultProps;
export default Input;