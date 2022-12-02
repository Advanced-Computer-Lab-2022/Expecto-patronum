import { type } from 'os';
import React, { useState, useRef,useEffect } from 'react';
import { QuestionData } from "../../Interface/QuestionDataInterface";
import classNames from "classnames";
import { ChoiceCount } from '../shared/Exercise/Question/Question';

const notChosen = classNames(
    "inline-flex justify-between items-center p-5 w-full text-black-600 bg-white rounded-lg border-2 border-black-600"
);

const SubmittedExamCards: React.FC<{ QuestionData: QuestionData, Index: number }> = ({ QuestionData, Index }) => {
    const {
        problem,
        choices,
        answer,
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
    return (
        <div
            className="question row tab mx-auto pt-8 pb-12 w-700 rounded-t-2xl shadow-xl">
            <h2 className="mb-5 text-lg pt-4 font-medium text-gray-900 dark:text-black">{Index + 1}.{problem}</h2>
            <ul className={"row gap-6 w-full"}>
               { choices.map((choice, ChoiceIndex) => (
     
            <li className="col " key={ChoiceIndex}>
                <input type="radio" id={getChoiceInitial(ChoiceIndex)+ Index} name={"Q" + Index} value={getChoiceInitial(ChoiceIndex) + Index} className={"Q" +Index+" hidden peer"}/>
                <label htmlFor={getChoiceInitial(ChoiceIndex) + Index} className={notChosen}>
                    <div className="flex items-center">
                        <div className="w-full text-lg font-semibold mr-2">{getChoiceInitial(ChoiceIndex)})</div>
                        <div className="w-full">{choice}</div>
                    </div>
                </label>
            </li>
    ))}
            </ul>
            <div className="flex justify-center">
            <label className="answer pt-20 text-green-500">The Correct Answer Is:{getAnswerInitial(answer)}</label>
            </div>
            
        </div>
    )
}


export default SubmittedExamCards;