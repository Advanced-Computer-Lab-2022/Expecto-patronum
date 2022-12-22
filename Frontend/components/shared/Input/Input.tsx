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
    setFocus?: any,
    maxLength?: number
    onKeyDown?: any,
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
    value: undefined,
    name: "",
    checked: false,
    setFocus: null,
    maxLength: undefined,
    onKeyDown: undefined,
}

const Input = React.forwardRef((props: Props, ref) => {

    const labelRef = useRef<any>();
    const [characterLeft, setCharacterLeft] = useState(250);

    function moveLabel() {
        labelRef.current.style.top = "0.55rem";
        labelRef.current.style.color = "#0B80F3";
        labelRef.current.style.fontSize = "0.86rem";
        !props.setFocus || props.setFocus(true);
    }

    function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element> | React.FocusEvent<HTMLInputElement, Element>) {
        if(e.target.value === "") {
            labelRef.current.style.top = "1.75rem";
            labelRef.current.style.fontSize = "initial";
        }
        labelRef.current.style.color = "#858FAB";
        !props.setFocus || props.setFocus(false);
    }
    
  if(props.type === "textarea") {

    return (
        <div ref={ref as any}  className={props.inputDivStyle + (props.required ? ' create-course-input': "") + ' p-2 relative'}> 
            <label ref={labelRef} className={props.labelStyle + (props.required ? ' create-course-input-label ': "") + ' relative h-4 whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 left-3 bg-main text-[#858FAB] px-1 transition-all duration-300'}>{props.placeholder}</label>
            <textarea onChange={(e) => {setCharacterLeft(250 - e.target.value.length); props.onChange ? props.onChange(e): null}} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} maxLength={250} className={props.style + ' h-20 sb-max:h-39 py-2 focus:outline-none resize-none w-full transition-bg bg-transparent rounded-lg pl-2 border-1.5 focus:border-[#0B80F3] border-[#A7AEC2]'}></textarea>
            <label className='absolute text-xs text-gray-400 -bottom-2 right-3 whitespace-nowrap'>{characterLeft} character{characterLeft === 1 ? "": "s"} left</label>
        </div>
    )

  } else if(props.type === "radio") {
    
    return (
        <div ref={ref as any} onInput={() => labelRef.current.style.color = "rgb(156, 163, 175)"} className={(props.required ? ' create-course-input ': "") + ' w-fit row justify-center mx-auto relative pt-4 min-w-[8.9rem]'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label': "") + (!props.title && ' hidden ') + ' text-gray-400 text-center pb-2'}>{props.title}</label>
            {props.enum?.map((item) => {
                return (
                    <div key={item} className={`${props.inputDivStyle} col-6 col-sm-3 text-center px-0 py-2`}>
                        <input onChange={() => props.onChange(item)} type="radio" name={props.placeholder + "-button"} className={props.style + ' checked:border-8 checked:border-main checked:bg-[#0B80F3] transition-all duration-300 h-8 w-8 min-h-[2rem] min-w-[2rem] bg-transparent shadow-[0px_0px_5px_#A7AEC2] rounded-[50%] border-[#A7AEC2] border-[0.2vw] appearance-none'}></input>
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
            <label className={props.labelStyle + ' pointer-events-none text-xs h-4 whitespace-nowrap text-[#858FAB] px-1 transition-all duration-300'}>{props.placeholder}</label>
            <input onChange={props.onChange} type='checkbox' checked={props.checked} placeholder='Allow Preview' className='h-fit mx-2 align-middle' />
        </div>
    )
    
  } else {
    
    return (
        <div ref={ref as any} className={props.inputDivStyle + ' w-auto p-2 min-w-[8.9rem]'}>
            <label ref={labelRef} className={(props.required ? 'create-course-input-label ': "") + props.labelStyle + ' relative whitespace-nowrap block w-fit pointer-events-none rounded-lg top-7 h-4 left-2 bg-main text-[#858FAB] px-1 transition-all duration-300'}>{props.placeholder}</label>
            <input value={props.value} onKeyDown={props.onKeyDown} onChange={props.onChange} maxLength={props.maxLength} type={props.type} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} onInput={props.type === 'number' ? (e) => e.currentTarget.value = e.currentTarget.value.replace('-', ''): undefined} className={props.style + (props.required ? ' create-course-input': "") + ' focus:outline-none appearance-none w-full transition-bg bg-transparent rounded-lg pl-5 border-1.5 h-12 focus:border-[#0B80F3] border-[#A7AEC2]'}></input>
        </div>
    )

  }
})

Input.defaultProps = defaultProps;
export default Input;