import { type } from 'os';
import React, { useState, useRef } from 'react';
import { QuestionData } from "../../Interface/QuestionDataInterface";


const ExamQuestionCard : React.FC<{ QuestionData: QuestionData }> = ({ QuestionData }) => {
    const {
            question,
            choices,
            answer,
            isVisible,
    } = QuestionData;

    return (
        <div
        style={{ display: "none" }}
        className="row tab mx-auto pt-8 pb-12 w-700 rounded-t-2xl shadow-xl">
        <h2 className="mb-5 text-lg pt-4 font-medium text-gray-900 dark:text-black">1.{question}</h2>
        <ul className="grid gap-6 w-full md:grid-cols-4">
            <li>
                <input type="radio" id="A1" name="Q1" value="A1" className="hidden peer" required />
                <label htmlFor="A1" className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">A)</div>
                        <div className="w-full">{choices[0]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="B1" name="Q1" value="B1" className="hidden peer" />
                <label htmlFor="B1" className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">B)</div>
                        <div className="w-full">{choices[1]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="C1" name="Q1" value="C1" className="hidden peer" />
                <label htmlFor="C1" className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">C)</div>
                        <div className="w-full">{choices[2]}</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="D1" name="Q1" value="D1" className="hidden peer" />
                <label htmlFor="D1" className="inline-flex justify-between items-center p-5 w-full text-gray-900 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-900 dark:border-gray-700 dark:peer-checked:text-blue-600 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-white-500 dark:text-gray-500 dark:bg-white-800 dark:hover:bg-white-500">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">D)</div>
                        <div className="w-full">{choices[3]}</div>
                    </div>
                </label>
            </li>
        </ul>
    </div>
    )
}


export default ExamQuestionCard;