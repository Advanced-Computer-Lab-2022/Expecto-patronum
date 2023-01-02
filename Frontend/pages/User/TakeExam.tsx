import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from 'next/router';


var response = null;

import CompPagination from "../../components/shared/pagination/CompPagination";
import ExamQuestionCard from "../../components/exam/ExamQuestionCard";
import { PopupMessageContext } from '../_app';
import { AES, enc } from "crypto-js";
import { GetServerSidePropsContext } from "next/types";

interface dataInterface {
    data: {
        DeccourseID: string;
        DecexerciseID: string;

    }
}



const Exam = (props: dataInterface) => {
    console.log(props.data.DeccourseID);
    console.log(props.data.DecexerciseID);

    const [index, setIndex] = useState<number>(0);
    const [userID, setUserID] = useState<string>("");
    const [exerciseID, setExerciseID] = useState<string>("");
    const [courseID, setCourseID] = useState<string>("");
    const [totalQuestions, settotalQuestions] = useState<number>(0);
    const [skipped, setSkipped] = useState([""]);
    const [isFinalExam, setIsFinalExam] = useState<boolean>(false);
    const { viewPopupMessage } = useContext(PopupMessageContext);
    const [questions, setQuestions] = useState([{
        problem: "",
        choices: ["", ""],
        answer: "",
        isVisible: false,
    }]
    );
    let router = useRouter();

    const decryptId = (str: string) => {
        const decodedStr = decodeURIComponent(str);
        return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
    }

    const encryptId = (str: string | CryptoJS.lib.WordArray) => {
        const ciphertext = AES.encrypt(str, 'secretPassphrase');
        return encodeURIComponent(ciphertext.toString());
    }



    useEffect(() => {
        getQuestions();
    }, [])
    useEffect(() => {
        settotalQuestions(questions.length);
    }, [questions])
    const getQuestions = async () => { //need to be callled on loading page
        await axios.get('http://localhost:5000/User/takeExam', {
            params: {
                examID: props.data.DecexerciseID,
            },
        }).then(
            (res) => {
                console.log("////////////////////////")
                console.log(res.data[0]);
                console.log("////////////////////////")
                if (!res.data[0].subtitleName) {
                    setIsFinalExam(true);
                }

                const q = res.data[0].questions;
                console.log(q);
                setQuestions(q);

            });

    }
    function goPage(page: number) {

        const tabs = document.getElementsByClassName("tab");
        if (index < tabs.length - 1) {

            tabs[index].setAttribute("style", "display: none");
            tabs[page - 1].setAttribute("style", "display: inline-flex");
            setIndex(page - 1);
        }
        if (index > 0) {
            tabs[index].setAttribute("style", "display: none");
            tabs[page - 1].setAttribute("style", "display: inline-flex");
            setIndex(page - 1);
        }

        if (page - 1 === tabs.length - 1) {
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
        let response = await axios.put("http://localhost:5000/User/submitAnswer", {
            courseID: props.data.DeccourseID,
            excerciseID: props.data.DecexerciseID,
            answers: empty,
        })
        // console.log("//////////////////////Sad///////////////////////////")
        // console.log(response.data.grade);
        // console.log("//////////////////////Sad///////////////////////////")
        //check if final exam or not 
        // if  final exam check grade if greate than 50 then route him to the certifcate page with SendMail query to true
        //else show him a pop up saying try again or sth 
        //if not final exam then route him to the submitted exam 

        if (isFinalExam) {
            console.log("//////////////////////Crying///////////////////////////")
            console.log(response.data.grade);
            console.log("//////////////////////Crying///////////////////////////")

            if (response.data.grade >= 50) {
                router.push(`/User/Certificate?SendEmail=${true}`);
            }
            else {
                alert("You failed the final exam, try again");
                router.push(`/User/UserCourse/${encryptId(props.data.DeccourseID)}`);
            }
        }
        else {
            router.push({
                pathname: 'http://localhost:3000/User/SubmittedExam',
                query: { courseID: encryptId(props.data.DeccourseID), exerciseID: encryptId(props.data.DecexerciseID) }
            });
        }
    }
    return (
        <form
            id="Exam-form"
            className="row mx-4  h-full"
        >
            <div id="info" className="flex justify-center gap-8 ">
                <p style={{ display: '' }} className="mb-2 text-black h-auto">Skipped Questions Numbers:{skipped.toString()}</p>
            </div>

            {questions.map((question, index) => (
                <ExamQuestionCard key={index} QuestionData={question} Index={index} />
            ))}
            <div className="mx-auto w-700 py-4 rounded-b-2xl">
                <div className="text-center flex justify-center">
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


export async function getServerSideProps(context: GetServerSidePropsContext) {
    let { CourseID, ExerciseID } = context.query;


    const decryptId = (str: string) => {
        const decodedStr = decodeURIComponent(str);
        return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
    }
    const DeccourseID = decryptId(CourseID as string);
    const DecexerciseID = decryptId(ExerciseID as string);
    console.log(DeccourseID);
    console.log(DecexerciseID);

    return {
        props: {
            data: { DeccourseID, DecexerciseID }
        }
    }


}


