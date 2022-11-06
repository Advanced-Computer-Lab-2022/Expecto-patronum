import React, { useState } from 'react';
import Input from '../../Input/Input';

type Props = {
  subtitles: any,
  setSubtitles: any,
  subtitleIndex: number,
}

const ExerciseAlt = (props: Props) => {

  function setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.exerciseTitle = e.target.value;
    props.setSubtitles(values);
  }

  function setQuestion(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions[index].question = e.target.value;
    props.setSubtitles(values);
  }

  function setChoice(questionIndex: number, index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions[questionIndex].choices[index] = e.target.value;
    props.setSubtitles(values);
  }

  function addQuestion() {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions.push(
      {
        question: "", 
        choices: [""],
        answer: ""
      }
    );
    props.setSubtitles(values);
  }

  function removeQuestion(questionIndex: number) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions.splice(questionIndex, 1);
    props.setSubtitles(values);
  }

  function addChoice(questionIndex: number) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions[questionIndex].choices.push("");
    props.setSubtitles(values);
  }

  function removeChoice(questionIndex: number, childIndex: number) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions[questionIndex].choices.splice(childIndex, 1);
    props.setSubtitles(values);
  }

  function setCorrectAnswer(e: React.ChangeEvent<HTMLInputElement>, questionIndex: number) {
    const values = [...props.subtitles];
    values[props.subtitleIndex].exercise.questions[questionIndex].answer = e.target.value;
    props.setSubtitles(values);
  }

  return (
    <div> 
      {
          <div>
            <input className='border-2 border-black rounded-lg m-2' value={props.subtitles[props.subtitleIndex].exercise.title} onChange={e => setTitle(e)} />
            {
              props.subtitles[props.subtitleIndex].exercise.questions.map((q: any, questionIndex: number) => (
                <div className='flex justify-center' key={questionIndex}>
                  <Input value={q.question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(questionIndex, e)} placeholder='Enter Question' />
                  <button type='button' onClick={() => addChoice(questionIndex)} className='bg-navlink-bg rounded-full text-white w-6'>+</button>
      
                  {
                    q.choices.map((c: any, childIndex: number) => (
                      <div key={childIndex}>
                        <Input placeholder='Enter Choice' value={c} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoice(questionIndex, childIndex, e)} />
                        <button type='button' onClick={() => removeChoice(questionIndex, childIndex)} className='bg-red-600 rounded-full text-white w-6'>-</button>
                      </div>
                    ))
                  }
                  <input className='bg-lime-600 border-2 border-black rounded-lg m-2' value={q.answer} onChange={e => setCorrectAnswer(e, questionIndex)} />
                  <button type='button' onClick={() => removeQuestion(questionIndex)} className='bg-black rounded-full text-white w-6'>-</button>
                </div>
              ))
            }
            <button type='button' onClick={addQuestion} className='bg-black rounded-full text-white w-6'>+</button>
          </div>
      }      
      <br />
      <button>Check</button>
    </div>
  )
}

export default ExerciseAlt;