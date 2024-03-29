import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SubmittedExamCards from "../../components/exam/SubmittedExamCards";
import classNames from "classnames";
import { PopupMessageContext } from '../_app';
import { useRouter } from "next/router";
import html2canvas from 'html2canvas';

const wrongAnswer = classNames(
    "inline-flex justify-between items-center p-5 w-full text-red-500 bg-white rounded-lg border-2 border-red-500"
);
const rightAnswer = classNames(
    "inline-flex justify-between items-center p-5 w-full text-green-500 bg-white rounded-lg border-2 border-green-500"
);

const SubmittedFinalExam = () => {
    const [totalGrade, settotalGrade] = useState<number>(0);
    const [questions, setQuestions] = useState([{
        problem: "",
        choices: ["", ""],
        answer: "",
    }]);
    const [myAnswers, setMyAnswers] = useState([""]);
    const { viewPopupMessage } = useContext(PopupMessageContext);
    const router = useRouter();
    useEffect(() => {
        // const questionsDummyData = [
        //     { question: "what about ur first oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
        //     { question: "testDiffNumber?", choices: ["easy", "what"], answer: "what", isVisible: false },
        //     { question: "testDiffNumber?", choices: ["easy", "what", "about"], answer: "about", isVisible: false },
        //     { question: "what about ur second oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
        //     { question: "what about ur 3rd oscar?", choices: ["easy", "what", "about", "it"], answer: "it", isVisible: false },
        //     { question: "what about ur 4th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
        //     { question: "what about ur 5th oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
        //     { question: "what about ur 6th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true }];
        // setQuestions(questionsDummyData);
        // const choicesDummyData = ["it", "what", "about", "it","","it","easy","what"];
        // setMyAnswers(choicesDummyData);
        getQuestionsAnswers();
    }, [])

    const getQuestionsAnswers = async () => { //need to be callled on loading page
        // console.log(router.query.courseID);
        // console.log(router.query.exerciseID);
        await axios.get('http://localhost:5000/User/viewAnswers', {
            params: {
                courseID: router.query.courseID,
                exerciseID: router.query.exerciseID,
            },
        }).then(
            (res) => {

                console.log(res);
                const q = res.data.questions;
                setQuestions(q);
                const a = res.data.yourAnswers;
                setMyAnswers(a);

            });

    }
    function GetChosenAnswerIndex(McQ: string[], Answer: String) {
        for (var i = 0; i < McQ.length; i++) {
            if (McQ[i] == Answer) {
                return i;
            }
        }
        return -1;
    }
    useEffect(() => {
        var correctAnswers = 0;
        for (var i = 0; i < questions.length; i++) {
            const QuestionChoices = document.getElementsByClassName("Q" + i) as any;
            var x = GetChosenAnswerIndex(questions[i].choices, myAnswers[i]);
            console.log(x);
            if (questions[i].answer === myAnswers[i] && questions[i].answer != "") {
                correctAnswers++;
                if (QuestionChoices[x].nextElementSibling != null) {
                    QuestionChoices[x].nextElementSibling.className = rightAnswer;
                }
            } else if (x != -1 && questions[i].answer != "") {
                if (QuestionChoices[x].nextElementSibling != null) {
                    QuestionChoices[x].nextElementSibling.className = wrongAnswer;
                }
            }
        }
        settotalGrade((correctAnswers / questions.length) * 100);
        // const timer = document.getElementById("timer");
        // if (timer != undefined) {
        //     timer.style.display = "none";
        // }
        const goback = document.getElementById("go-back");
        if (goback != undefined) {
            goback.style.display = "";
        }
    }, [questions])

    useEffect(() => {
        if (totalGrade >= 50) {
            viewPopupMessage(true, "Congratulations You have Passed The Exam and Received certificate on Your Mail!");
            // html2canvas(document.querySelector('#certificate-template')).then(async canvas => {
            //     console.log(canvas.toDataURL('image/jpeg', 0.5));
            //     Response = await axios.post("http://localhost:5000/User/RecieveMail", {
            //       dataUrl: canvas.toDataURL('image/jpeg', 0.5),
            //     })
            //   });
        } else {
            viewPopupMessage(false, "You have Failed The Exam,heads Up you can retake it later!");
        }
    }, [totalGrade])
    return (
        <form
            id="Exam-form"
            className="row mx-4  h-full"
        >
            {questions.map((question, index) => (
                <SubmittedExamCards key={index} QuestionData={question} Index={index} />
            ))}

            <div className="mx-auto w-700 py-8 rounded-b-2xl">
                <p
                    id="grade"
                    className="text-black-700 h-auto mb-2 text-center"
                >total Grade: {totalGrade}%</p>
                <div className="text-center flex justify-center ">
                    <button
                        style={{ display: 'none' }}
                        id="go-back"
                        type="button"
                        className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500s rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-[#222222] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                </div>
            </div>

        </form>
    );
};

export default SubmittedFinalExam;
