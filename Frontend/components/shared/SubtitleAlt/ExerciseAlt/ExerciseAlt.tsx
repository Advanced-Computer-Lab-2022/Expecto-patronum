import React, { useRef, useState } from 'react';
import Input from '../../Input/Input';

type Props = {
  subtitles: any,
  setSubtitles: any,
  subtitleIndex: number,
}

const ExerciseAlt = (props: Props) => {

  const messageRef = useRef<any>();

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

    if(values[props.subtitleIndex].exercise.questions[questionIndex].choices.length === 3) {
      const message = document.getElementById("message-" + questionIndex);
      if(message != undefined) {
        message.classList.remove("hidden");
        message.innerHTML = "A question can have a maximum of 4 choices.";
        setTimeout(() => { message.classList.add("hidden") }, 3000);
      }
      return;
    }
    values[props.subtitleIndex].exercise.questions[questionIndex].choices.push("");
    props.setSubtitles(values);
  }

  function removeChoice(questionIndex: number, childIndex: number) {
    const values = [...props.subtitles];
    if(values[props.subtitleIndex].exercise.questions[questionIndex].choices.length === 1) {
      const message = document.getElementById("message-" + questionIndex);
      if(message != undefined) {
        message.classList.remove("hidden");
        message.innerHTML = "A question cannot have less than 2 choices.";
        setTimeout(() => { message.classList.add("hidden") }, 3000);
      }
      return;
    }
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
            <Input placeholder='Exercise Title' value={props.subtitles[props.subtitleIndex].exercise.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e)} />
            <div className='pl-3'>
              {
                props.subtitles[props.subtitleIndex].exercise.questions.map((q: any, questionIndex: number) => (
                  <div key={questionIndex}>
                    <div>
                      <label className='relative top-14 right-5'>{questionIndex + 1})</label>
                      <Input placeholder='Enter Question' value={q.question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(questionIndex, e)} />
                      <button type='button' onClick={() => removeQuestion(questionIndex)} className='text-red-600 hover:text-red-500 text-xs relative bottom-1 left-6 h-0 whitespace-nowrap'>Remove Question</button>
                      <button type='button' onClick={() => addChoice(questionIndex)} className='hover:text-black text-navlink-bg text-xs relative bottom-1 left-12 h-0 whitespace-nowrap'>Add Choice</button>
                    </div>  
                    <div className='row pl-4'>
                      {
                        q.choices.map((c: any, childIndex: number) => (
                          <div className='col-6' key={childIndex}>
                            <Input placeholder='Enter Choice' value={c} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoice(questionIndex, childIndex, e)} />
                            <button type='button' onClick={() => removeChoice(questionIndex, childIndex)} className='text-red-600 hover:text-red-500 text-xs relative bottom-2 left-6 h-0 whitespace-nowrap'>Delete</button>
                          </div>
                        ))
                      }
                      <div className='col-6'>
                        <Input placeholder='Correct Answer' value={q.answer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorrectAnswer(e, questionIndex)} labelStyle='left-1.5' style='border-lime-500' />
                      </div>
                      <p id={"message-" + questionIndex} className='hidden text-center relative bottom-3 text-red-600'></p>
                    </div>
                  </div>
                ))
              }
            </div>
            <button type='button' onClick={addQuestion} className='hover:text-white text-navlink-bg text-xs mx-auto flex transition-all duration-200 hover:bg-navlink-bg border-navlink-bg border-px rounded-md p-2 whitespace-nowrap'>Add Question</button>
          </div>
      }      
    </div>
  )
}

export default ExerciseAlt;