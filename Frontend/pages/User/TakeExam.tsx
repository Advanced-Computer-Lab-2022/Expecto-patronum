import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import CompPagination from "../../components/shared/pagination/CompPagination";
import ExamQuestionCard from "../../components/exam/ExamQuestionCard";
import ExamHeader from "../../components/exam/ExamHeader";
import classNames from "classnames";
// import { Pagination } from "flowbite-react"
// import Input from "../components/shared/Input/Input";
const wrongAnswer = classNames(
    "inline-flex justify-between items-center p-5 w-full text-red-500 bg-white rounded-lg border-2 border-red-500"
);
const rightAnswer = classNames(
    "inline-flex justify-between items-center p-5 w-full text-green-500 bg-white rounded-lg border-2 border-green-500"
);
const notChosen = classNames(
    "inline-flex justify-between items-center p-5 w-full text-black-600 bg-white rounded-lg border-2 border-black-600"
);

const Exam = () => {
    const [index, setIndex] = useState<number>(0);
    const [totalGrade, settotalGrade] = useState<number>(0);
    const [totalQuestions, settotalQuestions] = useState<number>(0);
    const [skipped, setSkipped] = useState([""]);
    const [type, setType] = useState<"button" | "submit" | "reset" | undefined>(
        "button"
    );
    const [questions, setQuestions] = useState([{
        question: "",
        choices: ["", ""],
        answer: "",
        isVisible: false,
    }]
    ); // or use effect or use context
    // 👇️ this only runs once
    useEffect(() => {
        const questionsDummyData = [
            { question: "what about ur first oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
            { question: "testDiffNumber?", choices: ["easy", "what"], answer: "what", isVisible: false },
            { question: "testDiffNumber?", choices: ["easy", "what", "about"], answer: "about", isVisible: false },
            { question: "what about ur second oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
            { question: "what about ur 3rd oscar?", choices: ["easy", "what", "about", "it"], answer: "it", isVisible: false },
            { question: "what about ur 4th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
            { question: "what about ur 5th oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
            { question: "what about ur 6th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true }];
        setQuestions(questionsDummyData);
    }, [])
    useEffect(() => {
        settotalQuestions(questions.length);
    }, [questions])


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

    // let Questions = questions.map((question, index) => {
    //     return <ExamQuestionCard key={index} QuestionData={question} Index={index} />
    // })

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
        const QuestionChoices = document.getElementsByClassName("Q" + index) as any;
        var answerflag = false;
        var flag = false;
        for (var j = 0; j < QuestionChoices.length; j++) {
            if (QuestionChoices[j].checked == true) {
                answerflag = true;
            }
        }
        if (!answerflag) {
            if (skipped.indexOf(`${index + 1}`) == -1) {
                setSkipped(oldArray => [...oldArray, `${index + 1}`])
            }
        } else {
            if (skipped.indexOf(`${index + 1}`) != -1) {
                setSkipped(skipped.filter(item => item !== `${index + 1}`))
            }
        }
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
        const AnswerLabel = document.getElementsByClassName("answer") as HTMLCollectionOf<HTMLLabelElement>;

        if (AnswerLabel != undefined) {
            for (var i = 0; i < AnswerLabel.length; i++) {
                AnswerLabel[i].style.display = "";
            }
            var correctAnswers = 0;
            for (var i = 0; i < questions.length; i++) {
                const QuestionChoices = document.getElementsByClassName("Q" + i) as any;
                var chosenAnswerIndex = 100; // out of bounds
                for (var j = 0; j < QuestionChoices.length; j++) {
                    if (QuestionChoices[j].nextElementSibling != null) {
                        QuestionChoices[j].nextElementSibling.className = notChosen;
                        if (QuestionChoices[j].checked) {
                            chosenAnswerIndex = j;
                        }
                    }
                }
                if (chosenAnswerIndex >= 0 && chosenAnswerIndex <= 3) {
                    if (questions[i].answer === questions[i].choices[chosenAnswerIndex]) {
                        correctAnswers++;
                        if (QuestionChoices[chosenAnswerIndex].nextElementSibling != null) {
                            QuestionChoices[chosenAnswerIndex].nextElementSibling.className = rightAnswer;
                        }
                    } else {
                        if (QuestionChoices[chosenAnswerIndex].nextElementSibling != null) {
                            QuestionChoices[chosenAnswerIndex].nextElementSibling.className = wrongAnswer;
                        }
                    }
                }
            }
            const questionsCards = document.getElementsByClassName("question") as any;
            if (questionsCards != undefined) {
                for (var i = 0; i < questionsCards.length; i++) {
                    questionsCards[i].style.display = "";
                }
            }
            settotalGrade((correctAnswers / questions.length) * 100);
            const grade = document.getElementById("grade") as HTMLParagraphElement;
            grade.style.display = "";
            const submit = document.getElementById("submit-btn");
            if (submit != undefined) {
                submit.style.display = "none";
            }
            const timer = document.getElementById("timer");
            if (timer != undefined) {
                timer.style.display = "none";
            }
            const info = document.getElementById("info");
            if (info != undefined) {
                info.style.display = "none";
            }
            const pagination = document.getElementById("pagination");
            if (pagination != undefined) {
                pagination.style.display = "none";
            }
            const prev = document.getElementById("prev-btn");
            if (prev != undefined) {
                prev.style.display = "none";
            }
            const goback = document.getElementById("go-back");
            if (goback != undefined) {
                goback.style.display = "";
            }
        }

        // axios.defaults.withCredentials =true;
        // Response = await axios
        //     .post("http://localhost:5000/", {
        //     })
        //     .then((res) => {
        //         return res.data;
        //     });
    }

    return (
        <form
            id="Exam-form"
            className="row mx-4  h-full"
            onSubmit={(e) => submitExam(e)}
        >

            <ExamHeader></ExamHeader>
            <div id="info" className="flex justify-center gap-8 ">
                <p style={{ display: '' }} className="mb-2 text-black-700 h-auto"> total Questions: {totalQuestions}</p>
                <p style={{ display: '' }} className="mb-2 text-orange-500 h-auto">Skipped Questions Numbers:{skipped}</p>
            </div>


            {questions.map((question, index) => (
                <ExamQuestionCard key={index} QuestionData={question} Index={index} />
            ))}

            <div className="mx-auto w-700 py-8 rounded-b-2xl">
                <p
                    style={{ display: 'none' }}
                    id="grade"
                    className="text-black-700 h-auto mb-2 text-center"
                >total Grade: {totalGrade}%</p>
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
                    <button
                        style={{ display: 'none' }}
                        id="go-back"
                        type="button"
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
                        Go Back
                    </button>
                    <div id="pagination"><CompPagination totalCount={20 * 5} /></div>

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
