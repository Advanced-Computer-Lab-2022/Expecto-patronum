import React, { useState, useRef, ReactElement, createContext } from 'react';
import Input from '../Input/Input';
import Question from './Question/Question';

interface ContextState {
  numberOfQuestions: any,
  setNumberOfQuestions: any,
}

const QuestionCount = createContext({} as ContextState);

type Props = {}

const Exercises = React.forwardRef((props: Props, ref) => {

  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(1);
  const [questions, setQuestions] = useState<Array<ReactElement>>([<Question key={numberOfQuestions} />]);

  function generateExercise() {
    setQuestions([...questions, <Question key={numberOfQuestions+1} />]);
    setNumberOfQuestions(numberOfQuestions + 1);
  }

  return (
    <QuestionCount.Provider value={{numberOfQuestions, setNumberOfQuestions}} >
      <div id='exercises' ref={ref as any}>
        <Input style='focus:bg-opacity-20 hover:bg-gray-500 hover:bg-opacity-20 border-x-0 border-t-0 rounded-b-none bg-gray-600 bg-opacity-20' labelStyle="bg-transparent" placeholder='Exercise Title' />
        <button type='button' onClick={generateExercise} className='hover:text-searchFocus ml-4 pb-1 text-navlink-bg block text-xs'>Add Question</button>
        <div id='questions-section' className='h-auto min-h-40 max-h-96 border-2 rounded-lg mb-4 border-neutral-700 overflow-y-scroll'>
          {questions}
        </div>
      </div>
    </QuestionCount.Provider>
  )
})

export default Exercises;
export { QuestionCount };