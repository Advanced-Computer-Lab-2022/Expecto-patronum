import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Input from "../../../shared/Input/Input";

type Props = {
  subtitles: any;
  setSubtitles: any;
  subtitleIndex: number;
};

const ExerciseAlt = (props: Props) => {

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
    values[props.subtitleIndex].exercise.questions.push({
      question: "",
      choices: [""],
      answer: "",
    });
    props.setSubtitles(values);
  }

  function removeQuestion(questionIndex: number) {
    const values = [...props.subtitles];
    if(values[props.subtitleIndex].exercise.questions.length === 3) {
      const message = document.getElementById("question-message-" + questionIndex + "-of-subtitle-" + props.subtitleIndex);
      if (message != undefined) {
        message.classList.remove("hidden");
        message.innerHTML = "An exercise can have at least 3 questions.";
        setTimeout(() => {
          message.classList.add("hidden");
        }, 3000);
      }
      return;
    }
    values[props.subtitleIndex].exercise.questions.splice(questionIndex, 1);
    props.setSubtitles(values);
  }

  function addChoice(questionIndex: number) {
    const values = [...props.subtitles];
    if(values[props.subtitleIndex].exercise.questions[questionIndex].choices.length === 3) {
      const message = document.getElementById("question-message-" + questionIndex + "-of-subtitle-" + props.subtitleIndex);
      if(message != undefined) {
        message.classList.remove("hidden");
        message.innerHTML = "A question can have a maximum of 4 choices.";
        setTimeout(() => {
          message.classList.add("hidden");
        }, 3000);
      }
      return;
    }
    values[props.subtitleIndex].exercise.questions[questionIndex].choices.push(
      ""
    );
    props.setSubtitles(values);
  }

  function removeChoice(questionIndex: number, childIndex: number) {
    const values = [...props.subtitles];
    if(values[props.subtitleIndex].exercise.questions[questionIndex].choices.length === 1) {
      const message = document.getElementById("question-message-" + questionIndex + "-of-subtitle-" + props.subtitleIndex);
      if (message != undefined) {
        message.classList.remove("hidden");
        message.innerHTML = "A question cannot have less than 2 choices.";
        setTimeout(() => {
          message.classList.add("hidden");
        }, 3000);
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

  function toggleQuestion(e: any, questionIndex: number) {
    e.target.children[1].classList.toggle("-rotate-90");
    const question = document.getElementById("question-" + questionIndex + "-of-subtitle-" + props.subtitleIndex);
    if(question != undefined) {
      question.classList.toggle("max-h-10");
      question.classList.toggle("max-h-full");
    }
  }

  return (
    <div className="px-2 my-1 border-2 border-gray-400 border-opacity-25 rounded-xl">
      {
        <div>
          {/* <Input placeholder='Exercise Title' value={props.subtitles[props.subtitleIndex].exercise.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e)} /> */}
          <div>
            {props.subtitles[props.subtitleIndex].exercise.questions.map((q: any, questionIndex: number) => (
                <div id={"question-" + questionIndex + "-of-subtitle-" + props.subtitleIndex} key={questionIndex} className="relative transition-all overflow-hidden px-2 my-2 sb-max:mx-6 max-h-10">
                  <button type="button" onClick={(e) => toggleQuestion(e, questionIndex)} className={(questionIndex % 2 === 0 ? "bg-gray-300 ": "bg-gray-200 ") + " w-full h-8 relative z-20 text-left flex items-center rounded-md"}>
                    <span className="rounded-md bg-black text-white ml-2 px-2">
                      <span className="bg-black h-3 w-3 block absolute bottom-2.5 left-7 rotate-45"></span>
                      {questionIndex + 1}
                    </span>
                    <RiArrowDropDownLine className="pointer-events-none scale-200 transition-all duration-200 ml-3 -rotate-90" />
                    <span className={(q.question === "" ? 'opacity-40': '') + ' ml-3 pointer-events-none'}>
                      {q.question === "" ? "Question " + (questionIndex + 1): q.question }
                    </span>
                  </button>
                  <div className="relative transition-all duration-1000 px-3">
                    <div>
                      <Input placeholder="Enter Question" value={q.question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(questionIndex, e)} inputDivStyle="col-12" />
                      <button type="button" onClick={() => removeQuestion(questionIndex)} className="text-red-600 hover:text-red-500 text-xs relative bottom-1 left-6 h-0 whitespace-nowrap">Remove Question</button>
                      <button type="button" onClick={() => addChoice(questionIndex)} className="hover:text-input text-navlink-bg text-xs relative bottom-1 left-12 h-0 whitespace-nowrap">Add Choice</button>
                    </div>
                    <div className="row pl-4">
                      {
                        q.choices.map((c: any, childIndex: number) => (
                          <div className="col-md-6" key={childIndex}>
                            <Input placeholder="Enter Choice" value={c} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChoice(questionIndex, childIndex, e)} />
                            <button type="button" onClick={() => removeChoice(questionIndex, childIndex)} className="text-red-600 hover:text-red-500 text-xs relative bottom-2 left-6 h-0 whitespace-nowrap">Delete</button>
                          </div>
                        ))
                      }
                      <div className="col-md-6 pb-3">
                        <label id={"hint-" + questionIndex} className="hidden absolute bg-gray-300 rounded-md px-2 bottom-22 right-12 text-sm"><span className="w-2 h-3 block absolute right-0 top-2.5 bg-gray-300 skew-x-12 skew-y-12 rotate-12"></span>Add the correct answer as choice in this box.</label>
                        <Input placeholder="Correct Answer" value={q.answer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorrectAnswer(e, questionIndex)} labelStyle="left-1.5" style="border-lime-500" />
                      </div>
                      <p id={"question-message-" + questionIndex + "-of-subtitle-" + props.subtitleIndex} className="hidden text-center relative bottom-0 text-red-600"></p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <button type="button" onClick={addQuestion} className="hover:text-main text-input text-xs mx-auto flex transition-all duration-200 hover:bg-input border-input border-px rounded-md p-2 m-2 whitespace-nowrap">Add Question</button>
        </div>
      }
    </div>
  );
};

export default ExerciseAlt;