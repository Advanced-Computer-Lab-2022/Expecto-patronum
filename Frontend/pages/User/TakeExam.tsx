import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

var response = null;

import CompPagination from "../../components/shared/pagination/CompPagination";
import ExamQuestionCard from "../../components/exam/ExamQuestionCard";
import ExamHeader from "../../components/exam/ExamHeader";
import classNames from "classnames";
import Link from "next/link";
import AdminHeader from '../../components/AdminTool/AdminHeader';
import { PopupMessageContext } from '../_app';
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
    const [userID, setUserID] = useState<string>("");
    const [exerciseID, setExerciseID] = useState<string>("");
    const [courseID, setCourseID] = useState<string>("");
    const [totalQuestions, settotalQuestions] = useState<number>(0);
    const [skipped, setSkipped] = useState([""]);
    const { viewPopupMessage } = useContext(PopupMessageContext);
    const [questions, setQuestions] = useState([{
        problem: "",
        choices: ["", ""],
        answer: "",
        isVisible: false,
    }]
    );

    useEffect(() => {
        // const questionsDummyData = [
        //     {problem: "what about ur first oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
        //     { problem:"testDiffNumber?", choices: ["easy", "what"], answer: "what", isVisible: false },
        //     { problem:"testDiffNumber?", choices: ["easy", "what", "about"], answer: "about", isVisible: false },
        //     { problem:"what about ur second oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
        //     { problem:"what about ur 3rd oscar?", choices: ["easy", "what", "about", "it"], answer: "it", isVisible: false },
        //     { problem:"what about ur 4th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true },
        //     { problem:"what about ur 5th oscar?", choices: ["easy", "what", "about", "it"], answer: "easy", isVisible: false },
        //     { problem:"what about ur 6th oscar?", choices: ["hard", "what", "about", "it"], answer: "what", isVisible: true }];
        // setQuestions(questionsDummyData);
        setUserID("6383d9da6670d09304d2b016");
        setExerciseID("6383e073de30152bc8991dc9");
        setCourseID("6383e073de30152bc8991dd5");
        getQuestions();
    }, [])
    useEffect(() => {
        settotalQuestions(questions.length);
    }, [questions])
    const getQuestions = async () => { //need to be callled on loading page
        await axios.get('http://localhost:5000/User/takeExam', {
            params: {
                examID: "6383e073de30152bc8991dd5",
            },
        }).then(
            (res) => {
                console.log(res.data[0]);
                const q = res.data[0].questions;
                console.log(q);
                setQuestions(q);

            });

    }
    function goPage(page: number) {
        
        const tabs = document.getElementsByClassName("tab");
        if (index < tabs.length - 1) {
    
            tabs[index].setAttribute("style", "display: none");
            tabs[page-1].setAttribute("style", "display: inline-flex");
            setIndex(page-1);
        }
        if (index > 0) {
            tabs[index].setAttribute("style", "display: none");
            tabs[page - 1].setAttribute("style", "display: inline-flex");
            setIndex(page - 1);
        }

        if (page-1 === tabs.length - 1) {
            const next = document.getElementById("next-btn");

            if (next != undefined) {
                next.style.display = "none";
            }

            const submit = document.getElementById("submit-btn");

            if (submit != undefined) {
                submit.style.display = "inline-flex";
            
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
        const QuestionChoices = document.getElementsByClassName("Q" + index) as any;
        var answerflag = false;
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
    }
    async function submitExam(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var empty = new Array(questions.length);
        for (var i = 0; i < empty.length; i++) {
            empty[i] = '';
        }
        for (var i = 0; i < questions.length; i++) {
            const QuestionChoices = document.getElementsByClassName("Q" + i) as any;
            var chosenAnswerIndex = 100; // out of bounds
            for (var j = 0; j < QuestionChoices.length; j++) {
                if (QuestionChoices[j].nextElementSibling != null) {
                    if (QuestionChoices[j].checked) {
                        chosenAnswerIndex = j;
                        var selected = questions[i].choices[chosenAnswerIndex];
                        empty[i] = selected;
                    }
                }
            }
        }
            console.log(empty); 
            e.preventDefault();
            response = await axios.put("http://localhost:5000/User/submitAnswer", {
                userID: "6383d9da6670d09304d2b016",
                courseID: "6383e073de30152bc8991dc9",
                excerciseID: "6383e073de30152bc8991dd5",
                answers: empty,
            }).then((res: { data: any; }) => { return res.data });
            viewPopupMessage(true, "Answers Submitted successfully");
    }

    return (
        <form
            id="Exam-form"
            className="row mx-4  h-full"
        >
            <ExamHeader></ExamHeader>
            <div id="info" className="flex justify-center gap-8 ">
                <p style={{ display: '' }} className="mb-2 text-black h-auto">Skipped Questions Numbers:{skipped.toString()}</p>
            </div>

            {questions.map((question, index) => (
                <ExamQuestionCard key={index} QuestionData={question} Index={index} />
            ))}
            <div className="mx-auto w-700 py-4 rounded-b-2xl">
                <div className="text-center flex justify-center">
                    {/* <Link href={/User/SubmittedExam/${user}?id=${CourseData._id}} as={/Courses/${CourseData.title}}>  */}
                    {/* <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link> */}
                     <div id="pagination"><CompPagination totalCount={totalQuestions * 5} Setter={goPage} FromLink={false} /></div>
                    <button
                        id="submit-btn"
                        type="button"
                        onClick={(e) => submitExam(e)}
                        className="hidden text-lg hover:bg-red-600 hover:text-white hover:rounded-md h-10 items-center mt-13 px-4 font-medium text-red-600 bg-transparent"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                    {/* </Link> */}
                </div>
            </div>

        </form>
    );
};

export default Exam;
