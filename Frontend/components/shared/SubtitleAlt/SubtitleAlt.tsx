import React, { useState, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Input from '../Input/Input';
import ExerciseAlt from './ExerciseAlt/ExerciseAlt';

type Props = {
    subtitles: any,
    setSubtitles: any,
}

const SubtitleAlt = (props: Props) => {

    const newSubtitle = {
        header: "",
        contents: [
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            },
            {
                contentTitle: "",
                video: "",
                preview: false,
                duration: 0,
                description: "",
            }
        ],
        exercise: {
            exerciseTitle: "",
            questions: [
                {
                    question: "",
                    choices: [""],
                    answer: "",
                },
                {
                    question: "",
                    choices: [""],
                    answer: "",
                },
                {
                    question: "",
                    choices: [""],
                    answer: "",
                }
            ],
        },
        totalMinutes: 0,
    }

    function addNewSubtitle() {
        props.setSubtitles([...props.subtitles, newSubtitle]);
    }

    function setHeader(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].header = e.target.value;
        props.setSubtitles(values);
    }

    function setContentTitle(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].contentTitle = e.target.value;
        props.setSubtitles(values);
    }

    function setContentVideo(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].video = e.target.value;
        props.setSubtitles(values);
    }

    function setContentPreview(e: any, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].preview = e.target.checked;
        props.setSubtitles(values);
    }

    function setContentDuration(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].duration = e.target.value;
        props.setSubtitles(values);
    }

    function setContentDescription(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents[contentIndex].description = e.target.value;
        props.setSubtitles(values);
    }

    function addNewContent(subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].contents.push({
            contentTitle: "",
            video: "",
            preview: false,
            duration: 0,
            description: "",
        });
        props.setSubtitles(values);
    }

    function removeContent(subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        if(values[subtitleIndex].contents.length === 4) {
            const message = document.getElementById("content-" + contentIndex + "-message-" + subtitleIndex);
            if(message != undefined) {
                message.classList.remove("hidden");
                message.innerHTML = "A subtitle can have at least 4 course contents.";
                setTimeout(() => {
                    message.classList.add("hidden");
                  }, 3000);
            }
            return;
        }
        console.log(values[subtitleIndex].contents.splice(contentIndex, 1));
        props.setSubtitles(values);
    }

    function removeSubtitle(subtitleIndex: number) {
        const values = [...props.subtitles];
        if(values.length === 3) {
            const message = document.getElementById("message-" + subtitleIndex);
            if(message != undefined) {
                message.classList.remove("hidden");
                message.innerHTML = "A course can have at least 3 subtitles.";
                setTimeout(() => {
                    message.classList.add("hidden");
                  }, 3000);
            }
            return;
        }
        values.splice(subtitleIndex, 1);
        props.setSubtitles(values);
    }

    function toggleAddExercise(subtitleIndex: number) {
        const exercise = document.getElementById("exercise-popup-" + subtitleIndex);
        if(exercise != undefined) {
            exercise.classList.toggle("hidden");
        }
    }

    function toggleSubtitle(e: any, subtitleIndex: number) {
        e.target.children[1].classList.toggle("rotate-180");
        const subtitle = document.getElementById('subtitle-' + subtitleIndex);
        if(subtitle != undefined) {
            subtitle.classList.toggle("max-h-10");
            subtitle.classList.toggle("max-h-full");
        }
    }

    function toggleContent(e: any, subtitleIndex: number, contentIndex: number) {
        e.target.children[1].classList.toggle("rotate-180");
        const content = document.getElementById('content-' + contentIndex +'-subtitle-' + subtitleIndex);
        if(content != undefined) {
            content.classList.toggle("max-h-10");
            content.classList.toggle("max-h-full");
        }
    }

  return (
    <div className='px-0'>
        {
            props.subtitles.map((subtitle: any, subtitleIndex: number) => (
                <div id={'subtitle-' + subtitleIndex} className='relative transition-all duration-300 overflow-hidden p-2 mx-3 sb-max:mx-6 bg-white max-h-full' key={subtitleIndex}>
                    <button type='button' onClick={(e) => toggleSubtitle(e, subtitleIndex)} className={((subtitleIndex % 2 === 0) ? 'bg-gray-300 ': 'bg-gray-200 ') + ' w-full h-8 relative z-20 text-left flex justify-between items-center rounded-md'}><span className='ml-3 pointer-events-none'><span className='rounded-full bg-black text-white px-1.25 font-bold'>{subtitleIndex + 1}</span><span className={(subtitle.header === "" ? 'opacity-40': '') + ' px-3 italic'}>{subtitle.header === "" ? "Subtitle " + (subtitleIndex + 1) + " Heading" : subtitle.header}</span></span><RiArrowDropDownLine className='pointer-events-none scale-200 transition-all duration-300 mr-5 rotate-180' /></button>
                    <div className='relative transition-all duration-1000 px-2 my-1 border-2 rounded-xl'>
                        <Input value={subtitle.header} placeholder="Header" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeader(e, subtitleIndex)} />
                        <button type='button' onClick={() => addNewContent(subtitleIndex)} className='hover:text-black text-navlink-bg text-xs relative bottom-1 left-6 h-0 whitespace-nowrap'>Add Content</button>
                        {
                            subtitle.contents.map((content: any, contentIndex: number) => (
                                <div id={'content-' + contentIndex +'-subtitle-' + subtitleIndex} key={contentIndex} className='ml-4 relative transition-all duration-300 overflow-hidden p-2 mx-3 sb-max:mx-6 bg-white max-h-10'>
                                    <button type='button' onClick={(e) => toggleContent(e, subtitleIndex, contentIndex)} className={((contentIndex % 2 === 0) ? 'bg-gray-300 ': 'bg-gray-200 ') + '  w-auto min-w-64 nv-max:min-w-min h-8 relative z-20 text-left flex justify-between items-center rounded-md'}><span className='ml-3 pointer-events-none'><span className='rounded-full bg-black text-white px-1.25 font-bold'>{contentIndex + 1}</span><span className={(content.contentTitle === "" ? 'opacity-40': '') + ' px-3'}>{content.contentTitle === "" ? "Content " + (contentIndex + 1) + " Title" : content.contentTitle}</span></span><RiArrowDropDownLine className='pointer-events-none scale-200 transition-all duration-300 mr-5' /></button>
                                    <div className='row mx-0'>
                                        <Input value={content.contentTitle} placeholder="Content Title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentTitle(e, subtitleIndex, contentIndex)} inputDivStyle="col-md-6" />
                                        <Input placeholder='Duration' value={content.duration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDuration(e, subtitleIndex, contentIndex)} inputDivStyle="col-md-6" />
                                    </div>
                                    <Input type="checkbox" placeholder='Allow Preview?' checked={content.preview} onChange={(e: any) => setContentPreview(e, subtitleIndex, contentIndex)} />
                                    <Input value={content.video} placeholder="Video URL" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentVideo(e, subtitleIndex, contentIndex)} inputDivStyle={content.preview ? "": "hidden"} />
                                    <Input type='textarea' value={content.description} placeholder="Content Description" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDescription(e, subtitleIndex, contentIndex)} />
                                    <button type='button' onClick={() => removeContent(subtitleIndex, contentIndex)} className='text-red-600 hover:text-red-500 text-xs relative bottom-2.5 left-4 h-0 whitespace-nowrap'>Remove Content</button>
                                    <p id={"content-" + contentIndex + "-message-" + subtitleIndex} className="hidden text-center relative bottom-3 text-red-600"></p>
                                </div>
                            ))
                        }
                        <button type='button' onClick={() => removeSubtitle(subtitleIndex)} className='text-red-600 hover:text-red-500 text-xs relative left-0 top-4 h-0 float-right whitespace-nowrap'>Remove Subtitle</button>
                        <p id={"message-" + subtitleIndex} className="hidden text-center relative bottom-3 pt-4 text-red-600"></p>
                        <button onClick={() => toggleAddExercise(subtitleIndex)} className='hover:text-white text-navlink-bg mb-2 text-xs mx-auto flex transition-all duration-200 hover:bg-navlink-bg border-navlink-bg border-px rounded-md p-2 whitespace-nowrap'>Toggle Exercise</button>
                        <div id={'exercise-popup-' + subtitleIndex} className='hidden'>
                            <p className='text-center text-xl py-2 border-b-px mb-2'>Subtitle's Exercise (Optional)</p>
                            <ExerciseAlt subtitleIndex={subtitleIndex} subtitles={props.subtitles} setSubtitles={props.setSubtitles} />
                        </div>
                    </div>
                </div>
            ))
        }
        <button type='button' onClick={addNewSubtitle} className='text-white hover:text-navlink-bg text-xs mx-auto flex transition-all duration-200 w-30 justify-center hover:bg-white bg-navlink-bg border-navlink-bg border-px rounded-md p-2 m-2 whitespace-nowrap'>Add Subtitle</button>
    </div>
  )
}

export default SubtitleAlt;