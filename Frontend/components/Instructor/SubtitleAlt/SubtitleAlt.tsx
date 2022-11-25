import React, { useState, useRef, useContext } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Input from '../../shared/Input/Input';
import ExerciseAlt from './ExerciseAlt/ExerciseAlt';
import { Subtitle } from '../../../pages/Instructor/AddNewCourse';
import { FiTrash } from 'react-icons/fi';
import { IoMdRemove } from 'react-icons/io';
import { VscError } from 'react-icons/vsc';
import { PopupMessageContext } from '../../../pages/_app';

type Props = {
    subtitles: any,
    setSubtitles: any,
}

const SubtitleAlt = (props: Props) => {

    const { viewPopupMessage } = useContext(PopupMessageContext);

    function addNewSubtitle() {
        props.setSubtitles([...props.subtitles, new Subtitle()]);
    }

    function setHeader(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].header = e.target.value;
        props.setSubtitles(values);
    }

    function setCourseSummary(e: React.ChangeEvent<HTMLInputElement>, subtitleIndex: number) {
        const values = [...props.subtitles];
        values[subtitleIndex].courseSummary = e.target.value;
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
        values[subtitleIndex].contents[contentIndex].duration = parseInt(e.target.value);
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

    function removeContent(e: any, subtitleIndex: number, contentIndex: number) {
        const values = [...props.subtitles];
        if(values[subtitleIndex].contents.length === 4) {
            viewPopupMessage(false, "A subtitle can have at least 4 course contents.");
            return;
        }
        console.log(values[subtitleIndex].contents.splice(contentIndex, 1));
        props.setSubtitles(values);
    }

    function removeSubtitle(e: any, subtitleIndex: number) {
        const values = [...props.subtitles];
        if(values.length === 3) {
            viewPopupMessage(false, "A course can have at least 3 subtitles.");
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
        e.target.children[0].classList.toggle("rotate-180");
        const subtitle = document.getElementById('subtitle-' + subtitleIndex);
        if(subtitle != undefined) {
            subtitle.classList.toggle("max-h-9");
            subtitle.classList.toggle("max-h-auto");
        }
    }

    function toggleContent(e: any, subtitleIndex: number, contentIndex: number) {
        e.target.children[1].classList.toggle("rotate-180");
        const content = document.getElementById('content-' + contentIndex +'-subtitle-' + subtitleIndex);
        if(content != undefined) {
            content.classList.toggle("max-h-10");
            content.classList.toggle("max-h-screen");
        }
    }

  return (
    <>
        {/* <div id='error-message-of-subtitles' style={{width: "20rem"}} className="fixed flex items-center text-left -right-[21rem] transition-all duration-500 top-20 rounded-md shadow-lg h-20 z-30 text-sm whitespace-nowrap border-2 border-gray-600 border-t-4 border-t-red-600 bg-slate-100">
            <VscError className='text-white bg-red-600 rounded-full shadow-md shadow-current scale-200' />
            <h1 className='text-3xl ml-6 mb-4 text-red-600'>Error...</h1>
            <p className='w-0 mt-4 text-xs text-black relative right-20'></p>
        </div> */}
        {
            props.subtitles.map((subtitle: any, subtitleIndex: number) => (
                <div id={'subtitle-' + subtitleIndex} className='transition-all duration-300 overflow-hidden pb-3 px-4 max-h-auto' key={subtitleIndex}>
                    <div className='flex items-center justify-center'>
                        <button type='button' onClick={(e) => toggleSubtitle(e, subtitleIndex)} className={((subtitleIndex % 2 === 0) ? 'bg-gray-300 ': 'bg-gray-200 ') + ' w-full h-8 relative z-20 text-left flex items-center rounded-md'}>
                            <RiArrowDropDownLine className='pointer-events-none scale-200 transition-all duration-300 mx-2 rotate-180' />
                            <span className='ml-3 pointer-events-none'><span className='rounded-full bg-black text-white px-1.25 py-0.5 font-bold'>{subtitleIndex + 1}</span>
                            <span className={(subtitle.header === "" ? 'opacity-40': '') + ' px-3 italic'}>{subtitle.header === "" ? "Subtitle " + (subtitleIndex + 1) + " Heading" : subtitle.header}</span></span>
                        </button>
                        <button type='button' onClick={(e) => removeSubtitle(e, subtitleIndex)} className='bg-calm-red hover:bg-canadian-red rounded-full p-2 text-white text-xs whitespace-nowrap shadow-md ml-4 mr-1 h-min hover:scale-110 transition-all duration-300'><FiTrash className='scale-135 pointer-events-none' /></button>
                    </div>
                    <div className='relative transition-all duration-1000 px-2 my-1 border-2 rounded-xl'>
                        <Input value={subtitle.header} placeholder="Header" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeader(e, subtitleIndex)} />
                        <Input value={subtitle.courseSummary} type='textarea' placeholder="Course Summary" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseSummary(e, subtitleIndex)} />
                        {
                            subtitle.contents.map((content: any, contentIndex: number) => (
                                <div id={'content-' + contentIndex +'-subtitle-' + subtitleIndex} key={contentIndex} className='ml-4 relative transition-all duration-300 overflow-hidden p-2 mx-3 sb-max:mx-6 max-h-10'>
                                    <div className='flex items-center'>
                                        <button type='button' onClick={(e) => toggleContent(e, subtitleIndex, contentIndex)} className={((contentIndex % 2 === 0) ? 'bg-gray-300 ': 'bg-gray-200 ') + '  w-auto min-w-[16rem] nv-max:min-w-min h-8 relative z-20 text-left flex justify-between items-center rounded-md'}>
                                            <span className='ml-3 pointer-events-none'><span className='rounded-full bg-black text-white px-1.25 py-0.5 font-bold'>{contentIndex + 1}</span>
                                            <span className={(content.contentTitle === "" ? 'opacity-40': '') + ' px-3'}>{content.contentTitle === "" ? "Content " + (contentIndex + 1) + " Title" : content.contentTitle}</span>
                                            </span><RiArrowDropDownLine className='pointer-events-none scale-200 transition-all duration-300 mr-5' />
                                        </button>
                                        <button type='button' onClick={(e) => removeContent(e, subtitleIndex, contentIndex)} className='bg-calm-red hover:bg-canadian-red rounded-full p-1.25 text-white text-xs whitespace-nowrap shadow-md ml-4 hover:scale-110 transition-all duration-300'><IoMdRemove className='pointer-events-none' /></button>
                                    </div>
                                    <div className='row mx-0'>
                                        <Input value={content.contentTitle} placeholder="Content Title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentTitle(e, subtitleIndex, contentIndex)} inputDivStyle="col-md-6" />
                                        <Input placeholder='Duration (minutes)' type='number' value={content.duration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDuration(e, subtitleIndex, contentIndex)} inputDivStyle="col-md-6" />
                                    </div>
                                    <Input type="checkbox" placeholder='Allow Preview?' checked={content.preview} onChange={(e: any) => setContentPreview(e, subtitleIndex, contentIndex)} />
                                    <Input value={content.video} placeholder="Video URL" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentVideo(e, subtitleIndex, contentIndex)} inputDivStyle={content.preview ? "": "hidden"} />
                                    <Input type='textarea' value={content.description} placeholder="Content Description" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentDescription(e, subtitleIndex, contentIndex)} />
                                    <p id={"content-" + contentIndex + "-message-" + subtitleIndex} className="hidden text-center relative bottom-3 text-red-600"></p>
                                </div>
                            ))
                        }
                        <button type='button' onClick={() => addNewContent(subtitleIndex)} className='text-white w-48 text-sm my-2 nv-max:ml-7 ml-14 hover:text-input transition-all duration-200 hover:bg-main bg-input border-input border-px rounded-md p-2 whitespace-nowrap'>Add Content</button>
                        <br />
                        <button type='button' onClick={() => toggleAddExercise(subtitleIndex)} className='hover:text-white text-input my-2 text-xs mx-auto flex transition-all duration-200 hover:bg-input border-input border-px rounded-md p-2 whitespace-nowrap'>Toggle Exercise</button>
                        <div id={'exercise-popup-' + subtitleIndex} className='hidden'>
                            <p className='text-center text-xl py-2 border-b-px mb-2'>Subtitle's Exercise (Optional)</p>
                            <ExerciseAlt subtitleIndex={subtitleIndex} subtitles={props.subtitles} setSubtitles={props.setSubtitles} />
                        </div>
                    </div>
                </div>
            ))
        }
        <div className='flex justify-center mt-2 mb-4'>
            <button type='button' onClick={addNewSubtitle} className='text-white w-48 h-12 hover:text-input transition-all duration-200 hover:bg-main bg-input border-input border-px rounded-md p-2 whitespace-nowrap'>Add Subtitle</button>
        </div>
    </>
  )
}

export default SubtitleAlt;