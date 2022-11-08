import React, { useState, useRef } from 'react';
import axios from 'axios';
import Input from '../shared/Input/Input';
import { IoMdClose } from "react-icons/io";
import SubtitleAlt from '../shared/SubtitleAlt/SubtitleAlt';

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
    const radioRef = useRef<any>(null);

    const essentialsRef = [titleRef, subjectRef, instructorNameRef, priceRef, courseHoursRef, radioRef, summaryRef];

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

        var missing = false;

        for(let k = 0; k < essentialsRef.length; k++) {
            if(essentialsRef[k].current.children[1].type === "text" || essentialsRef[k].current.children[1].type === "textarea" || essentialsRef[k].current.children[1].type === "number") {
                if(essentialsRef[k].current.children[1].value === "") {
                    essentialsRef[k].current.children[0].style.color = "#B91C1C";
                    missing = true;
                }
            } else {
                var selected = false;
                for(let z = 1; z < essentialsRef[k].current.children.length; z++) {
                    var radioButton = essentialsRef[k].current.children[z].children[0];
                    if(radioButton.checked) {
                        // console.log(essentialsRef[k].current.children[z].children[2].value);
                        setSelectedRadio(essentialsRef[k].current.children[z].children[2].value);
                        selected = true;
                        break;
                    }
                }

                !selected ? missing = true: null; 

                missing ? essentialsRef[k].current.children[0].style.color = "#B91C1C": null;
            }
        }

        const error = document.getElementById("error-message");
        if(missing) {
            if(error != undefined)
                error.innerHTML = "Please fill in the required fields marked with a '*'.";
            isReset = false;
            return;
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

    const subtitle = {
        header: "",
        contents: [
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            }
        ],
        exercise: {
            exerciseTitle: "",
            questions: [
                {
                    question: "",
                    choices: [""],
                    answer: "",
                },
                {
                    question: "",
                    choices: [""],
                    answer: "",
                },
                {
                    question: "",
                    choices: [""],
                    answer: "",
                }
            ],
        },
        totalMinutes: 0,
    }

    const [subtitles, setSubtitles] = useState<any>([subtitle, subtitle, subtitle]);

    async function createCourse(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        console.log(subtitles);

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

  return (
        <form id='course-form' className='w-full sb-max:w-beside-sidebar mr-0 ml-auto' ref={ref as any} onSubmit={(e) => createCourse(e)} onChange={(e) => !isReset ? resetError(e): {}}>
            
            <div className='tab row mx-0 justify-center shadow-xl'>
                        <Input ref={titleRef} required={true} placeholder={"Title*"} />
                        <Input ref={subjectRef} required={true} placeholder={"Subject*"} />
                        <Input ref={instructorNameRef} required={true} placeholder={"Instructor's Name*"} />
                        <div className='row px-0'>
                            <div className='col-6 px-0'>
                                <label className='text-gray-400 absolute ml-4 mt-9 pt-px'>$</label>
                                <Input type="number" ref={priceRef} labelStyle="ml-3" required={true} placeholder={"Price*"} />
                            </div>
                            <div className='col-6 px-0'>
                                <Input type="number" ref={courseHoursRef} required={true} placeholder={"Course Hours*"} />
                            </div>
                        </div>
                        <Input ref={radioRef} type='radio' title='Select Level*' enum={['Beginner', 'Intermediate', 'Advanced', 'All Levels']} required={true} placeholder={"Level"} />
                        <Input type='textarea' ref={summaryRef} required={true} placeholder={"Summary*"} />
            </div>

            <div style={{display: "none"}} className='tab row w-full mx-0 divide-y bg-white divide-gray-200 hidden'>
                <h1 className='text-center text-3xl py-6 bg-white relative z-10'>Add Subtitles</h1>
                <SubtitleAlt subtitles={subtitles} setSubtitles={setSubtitles} />
            </div>

            <div id='icon-select' style={{display: "none"}} className='tab row w-full'>
                    <h1 className='text-center text-3xl pb-4 text-black'>Choose Course Icon</h1>
                    <div className='px-4'>
                        <div className='row p-2'>
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
            <div className='mx-auto divide-y divide-gray-200 px-0 shadow-md'>
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

                    <button id='submit-btn' type={type} className="hidden text-lg hover:bg-navlink-bg hover:text-white hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent">
                        <span /><span /><span /><span />Submit
                    </button>
                </div>
            </div>
        </form>
  )
})

export default CreateCourse;