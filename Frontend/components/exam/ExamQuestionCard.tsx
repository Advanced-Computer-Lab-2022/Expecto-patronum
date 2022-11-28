import { type } from 'os';
import React, { useState, useRef,useEffect } from 'react';
import { QuestionData } from "../../Interface/QuestionDataInterface";
import classNames from "classnames";
import { ChoiceCount } from '../shared/Exercise/Question/Question';


const choosing = classNames(
    "inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500"
)
const ExamQuestionCard: React.FC<{ QuestionData: QuestionData, Index: number }> = ({ QuestionData, Index }) => {
    const {
        question,
        choices,
        answer,
        isVisible,
    } = QuestionData;



    function getChoiceInitial(ChoiceIndex: number) {
        switch (ChoiceIndex) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            default:
                return 'A';
        }

    }
    function getAnswerInitial(Answer: String) {
        var AnswerIndex=0;
        for(var i=0; i<choices.length; i++) {
            if(choices[i]===Answer)
            AnswerIndex=i;
        }

  
       switch (AnswerIndex) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return 'D';
        default:
            return 'A';
    }

    }
    // let Choices = choices.map((choice, ChoiceIndex) => {
    //     return (

    //         <li key={ChoiceIndex}>
    //             <input type="radio" id={getChoiceInitial(ChoiceIndex)+ Index} name={"Q" + Index} value={getChoiceInitial(ChoiceIndex) + Index} className="hidden peer" required />
    //             <label htmlFor={getChoiceInitial(ChoiceIndex) + Index} className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
    //                 <div className="block">
    //                     <div className="w-full text-lg font-semibold">{getChoiceInitial(ChoiceIndex)})</div>
    //                     <div className="w-full">{choice}</div>
    //                 </div>
    //             </label>
    //         </li>)
    // })
    return (
        <div
            style={Index != 0 ? { display: "none" } : {}}
            className="question row tab mx-auto pt-8 pb-12 w-700 rounded-t-2xl shadow-xl">
            <h2 className="mb-5 text-lg pt-4 font-medium text-gray-900 dark:text-black">{Index + 1}.{question}</h2>
            <ul className={"row gap-6 w-full"}>
               { choices.map((choice, ChoiceIndex) => (
     
            <li className="col " key={ChoiceIndex}>
                <input type="radio" id={getChoiceInitial(ChoiceIndex)+ Index} name={"Q" + Index} value={getChoiceInitial(ChoiceIndex) + Index} className={"Q" +Index+" hidden peer"}/>
                <label htmlFor={getChoiceInitial(ChoiceIndex) + Index} className={choosing}>
                    <div className="flex items-center">
                        <div className="w-full text-lg font-semibold mr-2">{getChoiceInitial(ChoiceIndex)})</div>
                        <div className="w-full">{choice}</div>
                    </div>
                </label>
            </li>
    ))}
            </ul>
            <div className="flex justify-center">
            <label style={{display:"none"}} className="answer pt-20 text-green-500">The Correct Answer Is:{getAnswerInitial(answer)}</label>
            </div>
            
        </div>
    )
}


export default ExamQuestionCard;