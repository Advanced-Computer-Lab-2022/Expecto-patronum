import React, { useState, useRef } from 'react';
import axios from 'axios';
import Input from '../components/Input/Input';

type Props = {}

var isReset = false;
var response = null;

const CreateCourse = (props: Props) => {
    
    const [characterLeft, setCharacterLeft] = useState(250);
    const [index, setIndex] = useState<number>(0);
    const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");


    const labelRef = useRef<any>();
    const textareaRef = useRef<any>();

    function moveLabel() {
        labelRef.current.style.bottom = "9rem";
        labelRef.current.style.color = "rgb(255, 255, 255)";
        labelRef.current.style.fontSize = "0.86rem";
        labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
    }

    function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
        if(e.target.value === "") {
            labelRef.current.style.bottom = "8rem";
            labelRef.current.style.color = "rgb(156, 163, 175)";
            labelRef.current.style.fontSize = "initial";
            labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
        }
    }

    function goToPrev() {
        const tabs = document.getElementsByClassName("tab");

        if(index > 0) {
            tabs[index].setAttribute("style", "display: none");
            tabs[index-1].setAttribute("style", "display: inline-flex");
            setIndex(index-1);
        }

        if(index <= tabs.length - 1) {
            const next = document.getElementById("next-btn");
            
            if(next != undefined) {
                next.style.display = "inline-flex";
            }

            const submit = document.getElementById("submit-btn");
            
            if(submit != undefined) {
                submit.style.display = "none";
            }
        }
    }

    function goToNext() {
        const tabs = document.getElementsByClassName("tab");
        const inputFields = document.getElementsByClassName("create-course-input") as HTMLCollectionOf<HTMLElement>;

        var missing = false;
        if(index === 0) {
            for(let i = 0; i < inputFields.length; i++) {
                const field = inputFields[i] as HTMLTextAreaElement | HTMLInputElement;
                if(field.value === "") {
                    const label = document.getElementsByClassName("create-course-input-label")[i] as HTMLLabelElement;
                    label.style.color = "#B91C1C";
                    missing = true;
                }
            }
            const error = document.getElementById("error-message");
            if(missing) {
                if(error != undefined)
                    error.innerHTML = "Please fill in the required fields marked with a '*'.";
                isReset = false;
                return;
            }
        }

        if(index < tabs.length-1) {
            setType("button");
            tabs[index].setAttribute("style", "display: none");
            tabs[index+1].setAttribute("style", "display: inline-flex");
            setIndex(index+1);
        }

        if(index === tabs.length - 2) {
            const next = document.getElementById("next-btn");
            
            if(next != undefined) {
                next.style.display = "none";
            }

            const submit = document.getElementById("submit-btn");
            
            if(submit != undefined) {
                submit.style.display = "inline-flex";
                setType("submit");
            }
        }
    }

    function resetError(e: React.FormEvent<HTMLFormElement>) {
        const error = document.getElementById("error-message");

        if(error != undefined)
            error.innerHTML = "";

        isReset = true;
    }

    async function createCourse(e: React.FormEvent<HTMLFormElement>) {

        const inputFields = document.getElementsByClassName("create-course-input") as HTMLCollectionOf<HTMLElement>;

        e.preventDefault();
        axios.defaults.withCredentials = true;
        response = await axios.post("http://localhost:5000/Course/CreateCourse", {
            title: (inputFields[0] as HTMLTextAreaElement | HTMLInputElement).value,
            subject: (inputFields[1] as HTMLTextAreaElement | HTMLInputElement).value,
            instructorName: (inputFields[2] as HTMLTextAreaElement | HTMLInputElement).value,
            price: (inputFields[3] as HTMLTextAreaElement | HTMLInputElement).value,
            level: (inputFields[4] as HTMLTextAreaElement | HTMLInputElement).value,
            courseHours: (inputFields[5] as HTMLTextAreaElement | HTMLInputElement).value,
            summary: (inputFields[6] as HTMLTextAreaElement | HTMLInputElement).value,
        }).then(res => {return res.data});

        console.log(response);
    }

  return (
    <form id='course-form' className='row mx-4 py-10' onSubmit={(e) => createCourse(e)} onChange={(e) => !isReset ? resetError(e): {}}>
        <div className='row tab mx-auto pt-10 bg-navbar w-700 rounded-t-2xl shadow-xl'>
                <h1 className='text-center text-3xl pb-6 text-white'>Add Course</h1>
                <div className="col">
                    <Input required={true} placeholder={"Title *"} />
                    <Input required={true} placeholder={"Subject *"} />
                    <Input required={true} placeholder={"Instructor's Name *"} />
                    <Input required={true} placeholder={"Price *"} />
                </div>
                <div className="col">
                    <Input required={true} placeholder={"Level *"} />
                    <Input required={true} placeholder={"Course Hours *"} />
                    <div className='p-2'> 
                        <textarea ref={textareaRef} required onChange={(e) => setCharacterLeft(250 - e.target.value.length)} onFocus={moveLabel} onBlur={(e) => returnToInitial(e)} maxLength={250} className='create-course-input h-32 py-2 focus:outline-none resize-none w-full transition-bg duration-1000 text-white bg-transparent rounded-lg pl-2 shadow-lg border-2 border-navlink-bg'></textarea>
                        <label ref={labelRef} className='create-course-input-label relative h-4 whitespace-nowrap block w-fit pointer-events-none rounded-lg bottom-32 text-gray-400 left-3 bg-navbar px-1 duration-1000'>Summary *</label>
                        <label className='relative text-sm text-gray-400 bottom-5 mr-3 float-right'>{characterLeft} character{characterLeft === 1 ? "": "s"} left</label>
                    </div>
                </div>
        </div>

        <div style={{display: "none"}} className='row tab mx-auto pt-10 bg-navbar w-700 rounded-t-2xl shadow-xl'>
                <h1 className='text-center text-3xl pb-6 text-white'>Add Optional Information</h1>
                <div className="col">
                    <Input placeholder={"Skills"} />
                    <Input placeholder={"Level"} />
                </div>
                <div className='col'>
                    <Input placeholder={"Subtitles"} />
                    <Input placeholder={"Exercises"} />
                </div>
        </div>

        <div style={{display: "none"}} className='row tab mx-auto pt-10 bg-navbar w-700 rounded-t-2xl shadow-xl'>
                <h1 className='text-center text-3xl pb-6 text-white'>Choose Course Icon</h1>
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
                <img className='hover:cursor-pointer' style={{height: "100px", width: "100px"}} src='/images/Brush.png' />
        </div>

        <div className='mx-auto w-700 rounded-b-2xl bg-navbar'>
            <p id='error-message' className='text-red-700 h-auto mb-2 text-center'></p>
            <div className='text-center flex justify-center '>
                <button id='prev-btn' type="button" onClick={goToPrev} className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Previous
                </button>
                <button id='next-btn' type="button" onClick={goToNext} className="inline-flex h-10 mb-4 items-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-800 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Next
                    <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <button id='submit-btn' type={type} className="hidden text-lg hover:bg-navlink-bg hover:text-gray-900 hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
            </div>
        </div>
    </form>
  )
}

export default CreateCourse;