import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import CompPagination from "../../components/shared/pagination/CompPagination";
import ExamQuestionCard from "../../components/exam/ExamQuestionCard";
import { QuestionData } from "../../Interface/QuestionDataInterface";
// import { Pagination } from "flowbite-react"
// import Input from "../components/shared/Input/Input";



const navbar = classNames(
    "relative z-50 flex justify-between items-center nv:px-2 h-16 py-8 shadow-sm"
);
const navLogoDiv = classNames(
    "nv-max:absolute z-behind 1030:overflow-hidden 1030:w-[3.75rem] transition-all duration-300"
);
const navLogo = classNames("h-20 w-fit min-w-fit");
const navContentDiv = classNames(
    " nv-max:absolute z-50 h-full mob:w-screen nv-max-mob:w-fullscreen nv-max:block nv-max:p-2 flex items-center transition-navbar-anime duration-1000 nv-max:bottom-20 nv-max:left-0 nv-max:bg-main "
);



const Exam = () => {
    const [index, setIndex] = useState<number>(0);
    const [type, setType] = useState<"button" | "submit" | "reset" | undefined>(
        "button"
    );
    const [questions, setQuestions] = useState([{
        question: "",
        choices:[""],
        answer: "",
        isVisible: false,
      }]
    ); // or use effect or use context
     // 👇️ this only runs once
     const questionsDummyData=[  { question: "what about ur first oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
     { question: "what about ur second oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
     { question: "what about ur 3rd oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
     { question: "what about ur 4th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
     { question: "what about ur 5th oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
     { question: "what about ur 6th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true } ];
    useEffect(() => {

        setQuestions(questionsDummyData);},[])

    //on Clicking on the exer we call api takeexam by giving exercise/course id as input and it returns all exam questions+total number of questions
    //then we will loop creating exam questions cards 

    const getQuestions = async () => { //need to be callled on loading page


        await axios.get('http://localhost:5000/').then(
            (res) => {
                const questions = res.data.questions;
                console.log(questions);
                setQuestions(questions);

            });

    }

    let Questions = questions.map((question, index) => {
        return  <div
        style={index!=0 ? {display:"none"} : {}}
        className="row tab mx-auto pt-8 pb-12 w-700 rounded-t-2xl shadow-xl">
        <h2 className="mb-5 text-lg pt-4 font-medium text-gray-900 dark:text-black">{index+1}.{question.question}</h2>
        <ul className="grid gap-6 w-full md:grid-cols-4">
            <li>
                <input type="radio" id={"A"+index} name={"Q"+index} value={"A"+index} className="hidden peer" required />
                <label htmlFor={"A"+index} className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">A)</div>
                        <div className="w-full">{question.choices[0]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id={"B"+index} name={"Q"+index} value={"B"+index} className="hidden peer" />
                <label htmlFor={"B"+index} className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">B)</div>
                        <div className="w-full">{question.choices[1]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id={"C"+index} name={"Q"+index} value={"C"+index} className="hidden peer" />
                <label htmlFor={"C"+index} className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">C)</div>
                        <div className="w-full">{question.choices[2]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id={"D"+index} name={"Q"+index} value={"D"+index} className="hidden peer" />
                <label htmlFor={"D"+index} className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">D)</div>
                        <div className="w-full">{question.choices[3]}</div>
                    </div>
                </label>
            </li>
        </ul>
    </div>
    })

    function goToPrev() {
       
        const tabs = document.getElementsByClassName("tab");

        if (index > 0) {
            tabs[index].setAttribute("style", "display: none");
            tabs[index - 1].setAttribute("style", "display: inline-flex");
            setIndex(index - 1);
        }

        if (index <= tabs.length - 1) {
            const next = document.getElementById("next-btn");

            if (next != undefined) {
                next.style.display = "inline-flex";
            }

            const submit = document.getElementById("submit-btn");

            if (submit != undefined) {
                submit.style.display = "none";
            }
        }
    }

    function goToNext() {


        const tabs = document.getElementsByClassName("tab");

        if (index < tabs.length - 1) {
            setType("button");
            tabs[index].setAttribute("style", "display: none");
            tabs[index + 1].setAttribute("style", "display: inline-flex");
            setIndex(index + 1);
        }

        if (index === tabs.length - 2) {
            const next = document.getElementById("next-btn");

            if (next != undefined) {
                next.style.display = "none";
            }

            const submit = document.getElementById("submit-btn");

            if (submit != undefined) {
                submit.style.display = "inline-flex";
                setType("submit");
            }
        }
    }
    function goPage(page: number) {
        const tabs = document.getElementsByClassName("tab");
        if (index < tabs.length - 1) {
            setType("button");
            tabs[index].setAttribute("style", "display: none");
            tabs[page].setAttribute("style", "display: inline-flex");
            setIndex(page);
        }

        if (page === tabs.length - 1) {
            const next = document.getElementById("next-btn");

            if (next != undefined) {
                next.style.display = "none";
            }

            const submit = document.getElementById("submit-btn");

            if (submit != undefined) {
                submit.style.display = "inline-flex";
                setType("submit");
            }
        } else {
            const next = document.getElementById("next-btn");

            if (next != undefined) {
                next.style.display = "inline-flex";
            }

            const submit = document.getElementById("submit-btn");

            if (submit != undefined) {
                submit.style.display = "none";
            }
        }
    }
    async function submitExam(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        Response = await axios
            .post("http://localhost:5000/", {
            })
            .then((res) => {
                return res.data;
            });
    }

    return (
        <form
            id="Exam-form"
            className="row mx-4  h-full"
            onSubmit={(e) => submitExam(e)}

        >
            <div className={navbar}>
                <div className={navLogoDiv}>
                    <img className={navLogo} src="/images/logo.png" />
                </div>

                <div className="flex">
                    <div className={navContentDiv}>
                        <Timer active duration={null}>
                            <Timecode />
                        </Timer>
                        <div className="flex items-center space-x-4">
                            <img id="avatarButton" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="/images/x8PhM.png" alt="" />
                            <div id="userDropdown" className="hidden z-10 w-44 bg-white rounded ">
                                <div className="py-3 px-4 text-sm text-gray-900 dark:text-black">
                                    <div className="font-medium truncate">Rodin@3azma.com</div>
                                </div>
                                <ul className="py-1 text-sm text-gray-700 dark:text-black" aria-labelledby="avatarButton">
                                    <li>
                                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-red-600 dark:hover:text-white">Home</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-red-600 dark:text-black dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                            <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
                            <div className="font-medium dark:text-black">
                                <div>Rodin Salem</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
          {Questions}

            <div className="mx-auto w-700 py-8 rounded-b-2xl">
                <p
                    id="error-message"
                    className="text-red-700 h-auto mb-2 text-center"
                ></p>
                <div className="text-center flex justify-center ">
                    <button
                        id="prev-btn"
                        type="button"
                        onClick={goToPrev}
                        className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-[#222222] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className="mr-2 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Previous
                    </button>
                    <CompPagination totalCount={20 * 5} />
                    <button
                        id="next-btn"
                        type="button"
                        onClick={goToNext}
                        className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white-800 dark:border-gray-700 dark:text-black dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                        Next
                        <svg
                            aria-hidden="true"
                            className="ml-2 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <button
                        id="submit-btn"
                        type={type}
                        className="hidden text-lg hover:bg-red-600 hover:text-white hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-red-600 bg-transparent"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </div>
            </div>

        </form>
    );
};

export default Exam;
