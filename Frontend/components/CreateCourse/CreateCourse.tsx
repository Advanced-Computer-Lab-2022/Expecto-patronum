import React, { useState, useRef, forwardRef } from 'react';
import axios from 'axios';
import Input from '../Input/Input';
import Exercise from '../shared/Exercise/Exercise';
import { IoMdClose } from "react-icons/io";

type Props = {}

var isReset = false;
var response = null;

const CreateCourse = React.forwardRef((props: Props, ref) => {

    const [index, setIndex] = useState<number>(0);
    const [selectedRadio, setSelectedRadio] = useState<string>("");
    const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");

    const titleRef = useRef<any>();
    const subjectRef = useRef<any>();
    const instructorNameRef = useRef<any>();
    const priceRef = useRef<any>();
    const courseHoursRef = useRef<any>();
    const summaryRef = useRef<any>();
    const skillsRef = useRef<any>();
    const subtitlesRef = useRef<any>();
    const exerciseRef = useRef<any>();
    const radioRef = useRef<any>();

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
                const field = inputFields[i] as HTMLTextAreaElement | any;
                if(field.nodeName === "DIV") {
                    var selected = false;
                    console.log(field.children[1].children.length);
                    for(let j = 0; j < field.children[1].children.length; j++) {

                        console.log(field.children[1].children[j].children[0].checked);

                        if(field.children[1].children[j].children[0].checked) {
                            setSelectedRadio(field.children[1].children[j].children[2].innerHTML.replace(" ", ""));
                            selected = true;
                            break;
                        }
                    }
                    if(!selected) {
                        field.children[0].style.color = "#B91C1C";
                        missing = true;
                    }
                } else {
                    if(field.value === "") {
                        const label = document.getElementsByClassName("create-course-input-label")[i] as HTMLLabelElement;
                        label.style.color = "#B91C1C";
                        missing = true;
                    }
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

        e.preventDefault();

        console.log(exerciseRef.current.children[2]);

        // axios.defaults.withCredentials = true;
        // response = await axios.post("http://localhost:5000/Course/CreateCourse", {
        //     title: titleRef.current.value,
        //     subject: subjectRef.current.value,
        //     instructorName: instructorNameRef.current.value,
        //     price: priceRef.current.value,
        //     level: selectedRadio,
        //     courseHours: courseHoursRef.current.value,
        //     summary: summaryRef.current.value,
        // }).then(res => {return res.data});

        // console.log(response);
    }


    function closeCourseForm() {
        const courseForm = document.getElementById("course-form");
        if(courseForm != undefined) {
            courseForm.classList.add("hidden");
        }
    }

  return (
    <form id='course-form' ref={ref as any} className='backdrop-blur-sm hidden mx-auto text-left h-screen z-10 nv-max:px-4 px-48 py-2 shadow-md' onSubmit={(e) => createCourse(e)} onChange={(e) => !isReset ? resetError(e): {}}>
        <button type='button' onClick={closeCourseForm} className="text-white relative top-9 left-4 bg-red-600 hover:scale-160 scale-150 transition-all duration-200 rounded-full" ><IoMdClose /></button>
        <div className='row px-0 tab mx-auto pt-8 justify-center bg-navbar rounded-t-2xl shadow-xl'>
                <h1 className='border-gray-700 border-b-px text-center text-3xl pb-2 text-white'>Add Course</h1>
                
                <div className="col-md-6 col-sm-8 px-3">
                    <Input ref={titleRef} required={true} placeholder={"Title*"} />
                    <Input ref={subjectRef} required={true} placeholder={"Subject*"} />
                    <Input ref={instructorNameRef} required={true} placeholder={"Instructor's Name*"} />
                    <div className='row'>
                        <div className='col-6'>
                            <label className='text-white absolute ml-26 mt-9 pt-px'>$</label>
                            <Input type="number" ref={priceRef} required={true} placeholder={"Price*"} />
                        </div>
                        <div className='col-6'><Input type="number" ref={courseHoursRef} required={true} placeholder={"Course Hours*"} /></div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-8 px-3">
                    <Input ref={radioRef} type='radio' title='Select Level*' enum={['Beginner', 'Intermediate', 'Advanced', 'All Levels']} required={true} placeholder={"Level"} />
                    <Input type='textarea' ref={summaryRef} required={true} placeholder={"Summary*"} />
                </div>
        </div>


        <div style={{display: "none"}} className='row w-full divide-y px-0 divide-gray-700 hidden tab mx-auto pt-10 bg-navbar rounded-t-2xl shadow-xl'>
            <h1 className='text-center text-3xl pb-6 text-white'>Add Exercises</h1>
            <Exercise ref={exerciseRef} />
        </div>

        <div style={{display: "none"}} className='row w-full divide-y px-0 divide-gray-700 hidden tab mx-auto pt-10 bg-navbar rounded-t-2xl shadow-xl'>
            <h1 className='text-center text-3xl pb-6 text-white'>Add Subtitles</h1>
            <Input ref={subtitlesRef} placeholder={"Subtitles"} />
        </div>


        <div id='icon-select' style={{display: "none"}} className='row divide-y px-0 divide-gray-700 items-center justify-center tab mx-auto pt-6 bg-navbar rounded-t-2xl shadow-xl'>
                <h1 className='text-center text-3xl pb-4 text-white'>Choose Course Icon</h1>
                <div className='px-4'>
                    <div className='row overflow-y-scroll h-64 p-2'>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                        <div className='col-4 col-md-2'>
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                            <img className='w-20 h-20 hover:scale-105 my-2 hover:bg-navlink-bg transition-all duration-200 border-icon-outline border-semi-transparent-border border-navlink-bg rounded-xl cursor-pointer' src='/images/Brush.png' />
                        </div>
                    </div>
                </div>
        </div>

        <div className='mx-auto w-full divide-y divide-gray-700 px-0 rounded-b-2xl bg-navbar'>
            <p id='error-message' className='text-red-700 h-auto text-center'></p>

            <div className='text-center pt-2 flex justify-center '>
                <button id='prev-btn' type="button" onClick={goToPrev} className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Previous
                </button>

                <button id='next-btn' type="button" onClick={goToNext} className="inline-flex h-10 mb-4 items-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-800 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Next
                    <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>

                <button id='submit-btn' type={type} className="hidden text-lg hover:bg-navlink-bg hover:text-gray-900 hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent">
                    <span />
                    <span />
                    <span />
                    <span />
                    Submit
                </button>

            </div>
        </div>
    </form>
  )
})

export default CreateCourse;