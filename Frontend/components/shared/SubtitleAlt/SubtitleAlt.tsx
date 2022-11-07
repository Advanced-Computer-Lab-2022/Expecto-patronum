import React, { useState, useRef } from 'react';
import { Ee } from 'react-flags-select';
import { IoMdArrowDropdown } from 'react-icons/io';
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
            }
        ],
        exercise: {
            exerciseTitle: "",
            questions: [
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
        console.log(values[subtitleIndex].contents.splice(contentIndex, 1));
        props.setSubtitles(values);
    }

    function removeSubtitle(subtitleIndex: number) {
        const values = [...props.subtitles];
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
        e.target.children[0].classList.toggle("rotate-negative-90");
        const subtitle = document.getElementById('subtitle-' + subtitleIndex);
        if(subtitle != undefined) {
            subtitle.classList.toggle("relative");
            subtitle.classList.toggle("absolute");
            if(subtitle.classList.contains("absolute")) {
                subtitle.style.bottom = subtitle.offsetHeight + 50 + "px";
            } else {
                subtitle.style.bottom = "initial";
            }
        }
    }

  return (
    <div className='divide-y divide-gray-200'>
        { // Add Subtitles
            props.subtitles.map((subtitle: any, subtitleIndex: number) => (
                <div key={subtitleIndex}>
                    <button type='button' onClick={(e) => toggleSubtitle(e, subtitleIndex)} className='bg-gray-300 w-full h-8 relative z-20 text-left flex items-center'><IoMdArrowDropdown className='pointer-events-none' /><span className='ml-3 pointer-events-none'>{subtitle.header}</span></button>
                    <div id={'subtitle-' + subtitleIndex} className='relative transition-all duration-1000 z-10'>
                        <Input value={subtitle.header} placeholder="Header" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeader(e, subtitleIndex)} />
                        <button type='button' onClick={() => removeSubtitle(subtitleIndex)} >Remove Subtitle</button>
                        <button type='button' onClick={() => addNewContent(subtitleIndex)}>Add Content</button>
                        { // Add relative subtitle's Content
                            subtitle.contents.map((content: any, contentIndex: number) => (
                                <div className='ml-4 my-3' key={contentIndex}>
                                    <div className='row mx-0'>
                                        <Input value={content.contentTitle} placeholder="Content Title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentTitle(e, subtitleIndex, contentIndex)} inputDivStyle="col-6" />
                                        <Input placeholder='Duration' value={content.duration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDuration(e, subtitleIndex, contentIndex)} inputDivStyle="col-6" />
                                    </div>
                                    <Input type="checkbox" placeholder='Allow Preview?' checked={content.preview} onChange={(e: any) => setContentPreview(e, subtitleIndex, contentIndex)} />
                                    <Input value={content.video} placeholder="Video" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentVideo(e, subtitleIndex, contentIndex)} inputDivStyle={content.preview ? "": "hidden"} />
                                    <Input type='textarea' value={content.description} placeholder="Content Description" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDescription(e, subtitleIndex, contentIndex)} />
                                    <button type='button' onClick={() => removeContent(subtitleIndex, contentIndex)}>Remove Content</button>
                                </div>
                            ))
                        }
                        <button onClick={() => toggleAddExercise(subtitleIndex)} className='hover:text-white text-navlink-bg mb-2 text-xs mx-auto flex transition-all duration-200 hover:bg-navlink-bg border-navlink-bg border-px rounded-md p-2 whitespace-nowrap'>Add Exercise</button>
                        <hr />
                        <div id={'exercise-popup-' + subtitleIndex} className='hidden'>
                            <button onClick={() => toggleAddExercise(subtitleIndex)}>X</button>
                            <p className='text-center text-xl pt-2'>Subtitle's Exercise (Optional)</p>
                            <ExerciseAlt subtitleIndex={subtitleIndex} subtitles={props.subtitles} setSubtitles={props.setSubtitles} />
                        </div>
                    </div>
                </div>
            ))
        }
        <button type='button' onClick={addNewSubtitle} >Add Subtitle</button>
        <button type='button' onClick={() => console.log(props.subtitles)}>Print all</button>
    </div>
  )
}

export default SubtitleAlt;