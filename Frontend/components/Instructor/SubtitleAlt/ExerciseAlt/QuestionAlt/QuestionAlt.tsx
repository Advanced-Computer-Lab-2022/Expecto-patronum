import React from 'react';

type Props = {
    questions: any,
    exercises: any,
    setExercises: any
    exerciseIndex: number
}

const QuestionAlt = (props: Props) => {

    function setQuestion(exerciseIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const values = [...props.exercises];
        values[exerciseIndex].questions[index].question = e.target.value;
        props.setExercises(values);
      }
    
      function setChoice(exerciseIndex: number, questionIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const values = [...props.exercises];
        values[exerciseIndex].questions[questionIndex].choices[index] = e.target.value;
        props.setExercises(values);
      }
    
      function removeQuestion(exerciseIndex: number, questionIndex: number) {
        const values = [...props.exercises];
        values[exerciseIndex].questions.splice(questionIndex, 1);
        props.setExercises(values);
      }
    
      function addChoice(exerciseIndex: number, questionIndex: number) {
        const values = [...props.exercises];
        values[exerciseIndex].questions[questionIndex].choices.push("");
        props.setExercises(values);
      }
    
      function removeChoice(exerciseIndex: number, questionIndex: number, childIndex: number) {
        const values = [...props.exercises];
        values[exerciseIndex].questions[questionIndex].choices.splice(childIndex, 1);
        props.setExercises(values);
      }
    
      function chooseCorrectAnswer(exerciseIndex: number, questionIndex: number, childIndex: number) {
        const values = [...props.exercises];
        values[exerciseIndex].questions[questionIndex].answer = values[exerciseIndex].questions[questionIndex].choices[childIndex];
        props.setExercises(values);
      }

  return (
    <div>{
        props.questions.map((q: any, questionIndex: number) => (
          <div className='flex justify-center' key={questionIndex}>
            {/* <InputAlt value={q.question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(questionIndex, e)} /> */}
            <input className='border-2 border-black rounded-lg m-2' value={q.question} onChange={e => setQuestion(props.exerciseIndex, questionIndex, e)} />
            <button type='button' onClick={() => addChoice(props.exerciseIndex, questionIndex)} className='bg-navlink-bg rounded-full text-white w-6'>+</button>

            {
              q.choices.map((c: any, childIndex: number) => (
                <div key={childIndex}>
                  {/* <InputAlt value={c} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoice(questionIndex, childIndex, e)} /> */}
                  <input className='bg-navlink-bg border-2 border-black rounded-lg m-2' value={c} onChange={e => setChoice(props.exerciseIndex, questionIndex, childIndex, e)} />
                  <input name={'choices-of-' + questionIndex} onClick={() => chooseCorrectAnswer(props.exerciseIndex, questionIndex, childIndex)} type="radio" />
                  <button type='button' onClick={() => removeChoice(props.exerciseIndex, questionIndex, childIndex)} className='bg-red-600 rounded-full text-white w-6'>-</button>
                </div>  
              ))
            }
  
            <button type='button' onClick={() => removeQuestion(props.exerciseIndex, questionIndex)} className='bg-black rounded-full text-white w-6'>-</button>
          </div>
        ))
      }
    </div>
  )
}

export default QuestionAlt;