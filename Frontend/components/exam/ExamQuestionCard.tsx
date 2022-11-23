import { type } from 'os';
import React, { useState, useRef } from 'react';


const ExamQuestionCard = () => {
    const [question, setQuestion] = useState(0);
    const [choices, setChoices] = useState([]);

    return (
        <div
            style={{ display: "none" }}
            className="row tab mx-auto pt-10 bg-[#01091F] w-700 rounded-t-2xl shadow-xl h-full"
        >
            <h2 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">{question}</h2>
            <ul className="grid gap-6 w-full md:grid-cols-2">
                <li>
                    <input type="radio" id="A1" name="Q1" value="A1" className="hidden peer" required />
                    <label htmlFor="A1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-[#03DAC5] peer-checked:border-[#03DAC5] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 bg-[#141B2E] dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">A)</div>
                            <div className="w-full">{choices[0]}</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="B1" name="Q1" value="B1" className="hidden peer" />
                    <label htmlFor="B1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">B)</div>
                            <div className="w-full">Good for large websites</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="C1" name="Q1" value="C1" className="hidden peer" />
                    <label htmlFor="C1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">C)</div>
                            <div className="w-full">Good for small websites</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input type="radio" id="D1" name="Q1" value="D1" className="hidden peer" />
                    <label htmlFor="D1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">D)</div>
                            <div className="w-full">Good for large websites</div>
                        </div>
                    </label>
                </li>
            </ul>
        </div>
    )
}


export default ExamQuestionCard;